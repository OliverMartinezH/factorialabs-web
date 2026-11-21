# FactoriaLabs — Progress Log

> **History:** Ver [[history]]
> **Rules:** Ver [[AGENTS]]
> **Project map:** Ver [[Proyecto FactoriaLabs]]

---

## 1. Project Status

* **Project:** FactoriaLabs (Angular 22 SSG + GitHub Pages)
* **Current Phase:** Fase 2 — Conversión
* **Last milestone:** Sitio publicado en GitHub Pages con SEO (21/11/2026)

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
- [ ] **2.1.** Crear planilla y Web App de Apps Script
- [ ] **2.2.** Pegar el endpoint `/exec` en `core/config.ts`
- [ ] **2.3.** Reemplazar email y WhatsApp placeholder
- [ ] **2.4.** Verificar un envío real de punta a punta

### Fase 3: Contenido y marca
- [x] **3.1.** Sección de alcance (web, escritorio, móvil) sin destino impuesto
- [x] **3.2.** Ciclo completo y soporte en el copy
- [x] **3.3.** Nota de desarrollo asistido por IA
- [x] **3.4.** Favicon propio y `og:image` 1200×630
- [ ] **3.5.** Publicar el caso 001 con nombre cuando el cliente autorice

### Fase 4: Dominio
- [ ] **4.1.** Dominio propio `factorialabs.cl` con `CNAME`
- [ ] **4.2.** Ajustar `baseHref`, canonical y sitemap al dominio

---

## 3. Recent Iterations

* 21/11/2026 — Sección de alcance, ciclo completo con soporte, nota de IA, favicon y `og:image`.
* 21/11/2026 — Gobernanza inicializada con okk-init.
* 21/11/2026 — Build estático, SEO con cinco términos objetivo y deploy en Pages.
* 21/11/2026 — Eliminado el backend .NET y la base de datos por simplicidad.
* 20/11/2026 — Portada propia en Angular con panel de paridad.

---

## 4. Next Immediate Step

> [!tip] Siguiente paso
> Crear la planilla `Leads` y la Web App de Apps Script, y pegar la URL `/exec` en
> `src/FactoriaLabs.Web/src/app/core/config.ts` (`formEndpoint`). Mientras esté vacío, el
> formulario cae a `mailto:` y no registra nada.
