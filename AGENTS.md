# AGENTS.md — Reglas para el agente en FactoriaLabs

> **Contexto funcional:** Ver [[Proyecto FactoriaLabs]]
> **Estado actual:** Ver [[progress]]
> **Historial de decisiones:** Ver [[history]]

---

## 1. Contexto del proyecto

Sitio corporativo de FactoriaLabs. El código vive en `src/FactoriaLabs.Web/` (Angular 22) y se
publica como sitio estático en GitHub Pages desde `main`. El detalle funcional está en
[[Proyecto FactoriaLabs]]; este archivo define cómo se trabaja el código.

**Este repo no usa .NET.** Los proyectos de clientes sí (`.NET 11 + SQL Server`); acá el sitio es
estático por decisión explícita de simplicidad.

## 2. Principios arquitectónicos

* **Simplicity First (KISS):** un solo artefacto estático, sin servidor propio.
* **Una sección con valor de búsqueda es una ruta propia.** No se navega con anclas: cada bloque
  relevante (`/metodo`, `/stack`, `/preguntas`, `/contacto`) tiene su URL, su `title` y su JSON-LD.
* **Sin backend:** el contacto ocurre en el navegador o en Google Apps Script.
* **No inventar datos:** sin testimonios, métricas, precios ni plazos.
* **Testing:** todo cambio de lógica lleva test antes de cerrar la tarea.

## 3. Stack

* **Runtime:** Node 26 LTS (solo build)
* **Frontend:** Angular 22 con prerender (SSG) + TypeScript 6.0
* **Estilos:** SCSS propio, tokens documentados en `DESIGN.md`; sin framework CSS
* **Datos:** ninguna base de datos
* **Leads:** Google Apps Script → Google Sheets + correo
* **Testing:** Vitest
* **Deploy:** GitHub Actions → GitHub Pages

## 4. Reglas obligatorias

* No agregar backend ni base de datos sin aprobación explícita del usuario.
* No commitear secretos: `.env`, `data/`, URLs privadas.
* El endpoint de Apps Script vive en `src/app/core/config.ts`; nunca hardcodear credenciales.
* Toda afirmación comercial nueva debe ser verdadera y comprobable.
* **Antispam del formulario:** sin blocklist, sin cuarentena y sin correo de confirmación al
  visitante. Solo campo trampa, marca de tiempo y dedupe por email. El aviso va únicamente al
  correo del negocio.
* El copy mantiene los términos objetivo de SEO: software legacy, software legado, modernización,
  migración de datos, aplicación heredada.

## 5. Testing Guidelines

* Framework: **Vitest**
* Naming: `describe('caso')` + `it('rechaza …')`
* Todo cambio de lógica lleva test antes de cerrar la tarea.
* El build debe prerenderizar sin errores (`npm run build`).

## 6. Convenciones de código

* TypeScript estricto, componentes standalone y signals para estado.
* Español para el copy y el lenguaje del negocio; inglés para identificadores de código.
* SCSS: tokens globales en `styles.scss`, estilos por componente.
* Commits: `feat:`, `fix:`, `chore:`, `docs:`.

## 7. Git

| Setting | Value |
|---------|-------|
| Auto-commit on session end | No |
| Pull before commit | Yes |

* `main` publica: cada push dispara el deploy a Pages.
* Trabajo en `feature/<slug>`; merge a `main` solo con CI verde.

## 8. Reglas de modificación del proyecto

*Contexto funcional → [[Proyecto FactoriaLabs]]; estado → [[progress]]; historial → [[history]].
Los archivos de gobernanza solo se actualizan después de la aprobación del usuario.*

* **Planes:** el detalle vive en `docs/planes/<slug>.md`, se guarda con `okk actualiza bitacora` y
  se enlaza desde [[progress]]. La última decisión explícita manda sobre el plan.

### Mapa de enrutamiento

| Tipo de decisión | Archivo | Sección |
|---|---|---|
| Stack, tooling, deploy | `AGENTS.md` | Stack |
| Regla de trabajo, commits | `AGENTS.md` | Git / Reglas obligatorias |
| Funcionalidad del sitio, actores | `Proyecto FactoriaLabs.md` | Módulos / Actores |
| Regla de negocio, límites comerciales | `Proyecto FactoriaLabs.md` | Reglas de negocio / Restricciones |
| Estado, fase, siguiente paso | `progress.md` | Project Status |
| Cierre de fase | `history.md` | — |
| Plan detallado de implementación | `docs/planes/<slug>.md` | — |
