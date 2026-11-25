# FactoriaLabs — Progress Log

> **History:** Ver [[history]]
> **Rules:** Ver [[AGENTS]]
> **Project map:** Ver [[Proyecto FactoriaLabs]]

---

## 1. Project Status

* **Project:** FactoriaLabs (Angular 22 SSG + GitHub Pages)
* **Current Phase:** Fase 3 — Contenido y marca
* **Last milestone:** Formulario verificado en producción: fila en la planilla y correo recibido (25/11/2026)

---

## 2. Implementation Checklist

### Fase 0: Base técnica
- [x] **0.1.** Estructura del proyecto, CI y Docker de vista previa
- [x] **0.2.** Portada con sistema visual propio (panel de instrumentación)
- [x] **0.3.** Build estático con prerender

### Fase 1: Publicación y SEO
- [x] **1.1.** Deploy automático a GitHub Pages (repo público)
- [x] **1.2.** SEO: título, H1, FAQ con JSON-LD, sitemap y robots

### Fase 2: Conversión
- [x] **2.1.** Crear planilla y Web App de Apps Script
- [x] **2.2.** Pegar el endpoint `/exec` en `core/config.ts`
- [x] **2.3.** Reemplazar el correo placeholder por el real
- [x] **2.4.** Verificar un envío de punta a punta
- [ ] **2.5.** Definir WhatsApp (opcional)

### Fase 3: Contenido y marca
- [x] **3.1.** Sección de alcance (web, escritorio, móvil) sin destino impuesto
- [x] **3.2.** Ciclo completo y soporte en el copy
- [x] **3.3.** Nota de desarrollo asistido por IA
- [x] **3.4.** Favicon propio y `og:image` 1200×630
- [x] **3.5.** Página `/stack/` con arquitectura, evaluación por legado y entrega
- [x] **3.6.** Páginas `/metodo/`, `/preguntas/` y `/contacto/` con SEO propio
- [ ] **3.7.** Publicar el caso 001 con nombre cuando el cliente autorice

### Fase 4: Dominio
- [ ] **4.1.** Dominio propio `factorialabs.cl` con `CNAME`
- [ ] **4.2.** Ajustar `baseHref`, canonical y sitemap al dominio

---

## 3. Recent Iterations

* 25/11/2026 — Formulario verificado de punta a punta: fila en `Leads` (11:47) y correo de aviso recibido.
* 25/11/2026 — Correo público actualizado a `oliver.martinez@gmail.com`.
* 21/11/2026 — Sección de alcance, ciclo completo con soporte, nota de IA, favicon y `og:image`.
* 21/11/2026 — Gobernanza inicializada con okk-init.
* 21/11/2026 — Build estático, SEO con cinco términos objetivo y deploy en Pages.
* 21/11/2026 — Eliminado el backend .NET y la base de datos por simplicidad.
* 20/11/2026 — Portada propia en Angular con panel de paridad.

---

## 4. Next Immediate Step

> [!tip] Siguiente paso
> Ajustar el `TO` del script de Apps Script a `oliver.martinez@gmail.com` y publicar nueva
> versión, para que llegue el aviso por correo. Después: definir WhatsApp y borrar las filas de
> prueba de la planilla.
