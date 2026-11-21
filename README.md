# FactoriaLabs

Sitio web corporativo de **FactoriaLabs** — modernización de software legacy, aplicaciones
heredadas y migración de datos.

Sitio **100% estático** (Angular 22 con prerender), publicado en GitHub Pages. El formulario de
contacto envía los leads a Google Sheets mediante una Web App de Apps Script, que además avisa por
correo.

**En vivo:** https://olivermartinezh.github.io/factorialabs-web/

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | Angular 22 + prerender (SSG) |
| Lenguaje | TypeScript 6.0 |
| Formulario | Google Apps Script → Google Sheets + correo |
| Testing | Vitest |
| Deploy | GitHub Actions → GitHub Pages |
| Local | Docker (nginx) o `ng serve` |

## Estructura

```
.
├─ src/FactoriaLabs.Web/
│  ├─ src/app/
│  │  ├─ home/            portada
│  │  ├─ stack/           página /stack
│  │  ├─ contact/         formulario
│  │  ├─ shared/          header y footer
│  │  └─ core/            configuración, SEO
│  ├─ public/             robots.txt, sitemap.xml, favicon, og-image
│  ├─ Dockerfile          vista previa local con nginx
│  └─ nginx.conf
├─ docker/docker-compose.yml
└─ .github/workflows/
   ├─ ci.yml              tests + build
   └─ deploy-pages.yml    publicación
```

## Desarrollo

```bash
cd src/FactoriaLabs.Web
npm ci
npm start        # http://localhost:4200
npm test
npm run build    # dist/FactoriaLabs.Web/browser
```

Vista previa del build real (como se sirve en Pages):

```bash
cd docker
.\up.ps1         # http://localhost:4200
```

## Formulario de contacto

El sitio es estático: no hay backend que guarde leads. El formulario hace `POST` a una Web App de
Google Apps Script, que agrega la fila a una planilla y envía el aviso por correo.

### Configurar (una sola vez)

1. Crear una planilla en Google Sheets con una hoja llamada `Leads`.
2. Extensiones → **Apps Script** → pegar:

```js
const SHEET_ID = 'ID_DE_TU_PLANILLA';
const TO = 'hola@factorialabs.cl';

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (error) { return ok(); }

  // 1) Campo trampa: si viene relleno, es un bot.
  if (d.website) return ok();

  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Leads');

  // 2) Duplicado reciente: mismo email en las últimas 20 filas.
  const last = sheet.getLastRow();
  if (last > 1) {
    const rows = Math.min(20, last - 1);
    const emails = sheet.getRange(last - rows + 1, 3, rows, 1).getValues().flat();
    if (emails.some((v) => String(v).toLowerCase() === String(d.email).toLowerCase())) return ok();
  }

  // 3) Registrar el lead.
  sheet.appendRow([
    new Date(),
    d.name,
    d.email,
    d.company || '',
    d.currentSystem || '',
    d.message,
  ]);

  // 4) Aviso por correo. Se omite si el envío fue demasiado rápido.
  if (Number(d.elapsed || 0) >= 2000) {
    MailApp.sendEmail({
      to: TO,
      replyTo: d.email,
      subject: `Nuevo contacto: ${d.company || d.name}`,
      htmlBody: `<b>${d.name}</b> — ${d.email}<br>
                 Empresa: ${d.company || '—'}<br>
                 Sistema actual: ${d.currentSystem || '—'}<p>${d.message}</p>`,
    });
  }

  return ok();
}

function ok() {
  return ContentService.createTextOutput('ok');
}
```

3. Implementar → *Nueva implementación* → **Aplicación web**.
   Ejecutar como: **yo**. Quién tiene acceso: **cualquiera**.
4. Copiar la URL que termina en `/exec` y pegarla en
   `src/FactoriaLabs.Web/src/app/core/config.ts`:

```ts
export const CONTACT = {
  email: 'hola@factorialabs.cl',   // ← correo real
  whatsapp: '',                    // ← ej. '56912345678'
  formEndpoint: 'https://script.google.com/macros/s/…/exec',
};
```

Sin `formEndpoint` el formulario abre el correo del visitante (`mailto:`).

### Antispam y privacidad

- **Campo trampa:** si un bot lo rellena, el lead se descarta sin dejar rastro.
- **Duplicados:** el mismo email no se registra dos veces en las últimas 20 filas.
- **Sin correo de confirmación al visitante:** evita que el script funcione como relay de spam.
- **Sin blocklist:** si el spam aparece, se agrega después.
- La planilla queda **privada** en tu cuenta. El repo solo contiene la URL del endpoint, que es
  pública por naturaleza: el navegador del visitante tiene que poder llamarla.

### Límites conocidos

- `mode: 'no-cors'` (Apps Script no expone CORS): el sitio no puede leer la respuesta. Si el script
  falla, el visitante igual ve "enviado". Conviene revisar la planilla al comienzo.
- Cuota de correo: 100 destinatarios/día con Gmail personal, 1.500/día con Workspace.
- Apps Script no entrega la IP del visitante: cualquier filtrado se basa en el contenido, no en el
  origen.

## SEO

- `<title>` y `<h1>` con los términos: **software legacy**, **modernización**, **migración de
  datos**, **aplicación heredada**, **software legado**.
- Dos páginas prerenderizadas: `/` (negocio) y `/stack/` (arquitectura), cada una con su title,
  canonical y JSON-LD.
- `robots.txt` y `sitemap.xml` en `public/`.

## Despliegue

Cada push a `main` ejecuta `deploy-pages.yml`: instala, testea, construye con
`baseHref: /factorialabs-web/` y publica el contenido de `dist/FactoriaLabs.Web/browser`.

Para dominio propio: agregar `CNAME` en `public/` y ajustar `baseHref` a `/`, la URL canónica y el
`sitemap.xml`.

## Convenciones

- Ramas: `main` protegida, trabajo en `feature/<slug>`.
- Commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Nada de secretos en el repo.
