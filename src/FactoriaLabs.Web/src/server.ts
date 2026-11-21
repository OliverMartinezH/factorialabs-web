import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { validateContact } from './server/contact';
import { appendLead, leadsFilePath } from './server/leads-store';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

const angularApp = new AngularNodeAppEngine({
  // Protección SSRF de Angular: solo estos hosts pueden renderizar SSR.
  // En producción agrega el dominio del cliente en ALLOWED_HOSTS.
  allowedHosts: (process.env['ALLOWED_HOSTS'] ?? 'localhost,127.0.0.1')
    .split(',')
    .map((host) => host.trim())
    .filter(Boolean),
});

/* ---------- API ---------- */

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'factorialabs-web',
    version: process.env['APP_VERSION'] ?? 'dev',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/info', (_req, res) => {
  res.json({
    name: 'FactoriaLabs',
    version: process.env['APP_VERSION'] ?? 'dev',
    runtime: 'Angular SSR + Express',
  });
});

app.post('/api/contact', async (req, res) => {
  const result = validateContact(req.body);

  if (!result.ok) {
    res.status(400).json({ errors: result.errors });
    return;
  }

  const lead = { ...result.lead, receivedAt: new Date().toISOString() };

  try {
    await appendLead(lead);
    console.log(`Lead guardado: ${lead.email} (${lead.company ?? 'sin empresa'})`);
    res.status(201).json({ received: true });
  } catch (error) {
    console.error(`No se pudo guardar el lead en ${leadsFilePath()}`, error);
    res.status(500).json({ error: 'No se pudo guardar el mensaje.' });
  }
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'No encontrado' });
});

/* ---------- Sitio ---------- */

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`FactoriaLabs escuchando en http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
