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
│  ├─ src/app/            portada, secciones y formulario
│  ├─ src/index.html      meta, Open Graph y JSON-LD
│  ├─ public/             robots.txt, sitemap.xml, favicon
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
  const d = JSON.parse(e.postData.contents);

  SpreadsheetApp.openById(SHEET_ID).getSheetByName('Leads')
    .appendRow([new Date(), d.name, d.email, d.company, d.currentSystem, d.message, d.source]);

  MailApp.sendEmail({
    to: TO,
    replyTo: d.email,
    subject: `Nuevo contacto: ${d.company || d.name}`,
    htmlBody: `<b>${d.name}</b> — ${d.email}<br>
               Empresa: ${d.company || '—'}<br>
               Sistema actual: ${d.currentSystem || '—'}<p>${d.message}</p>`,
  });

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

### Límites conocidos

- `mode: 'no-cors'` (Apps Script no expone CORS): el sitio no puede leer la respuesta. Si el script
  falla, el visitante igual ve "enviado". Conviene revisar la planilla al comienzo.
- Cuota de correo: 100 destinatarios/día con Gmail personal, 1.500/día con Workspace.
- El endpoint es público: usar un campo trampa y filtrar duplicados en el script.

## SEO

- `<title>` y `<h1>` con los términos: **software legacy**, **modernización**, **migración de
  datos**, **aplicación heredada**, **software legado**.
- Sección de preguntas frecuentes con datos estructurados `FAQPage` y `Organization`.
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
