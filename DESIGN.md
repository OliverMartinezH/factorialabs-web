# Design

Sistema visual de la portada de FactoriaLabs. Registra lo construido, no lo planeado.

## World

**Hoja de checklist de bodega.** El sitio se lee como una hoja de conteo: papel cuadriculado,
reglas trazadas, casillas que se marcan y lápiz rojo para lo que falta. Traduce el mecanismo del
producto —modernizar por fases verificables, sin apagar nada hasta que cuadre— a un artefacto que el
dueño de una PyME usa a diario.

Rechaza de forma explícita los dos polos del rubro: el sitio oscuro con acentos neón y tarjetas de
servicios, y su opuesto de agencia en crema con serif editorial.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f2efe6` | Fondo |
| `--paper-deep` | `#e7e2d4` | Superficies: tablero, hover de filas |
| `--ink` | `#1a1e1a` | Texto y líneas fuertes |
| `--ink-soft` | `#586057` | Texto secundario (contraste ≈ 6:1 sobre paper) |
| `--rule` | `#c6c0ae` | Reglas y bordes |
| `--rule-soft` | `#d8d3c3` | Reglas internas de tablas |
| `--red` | `#ab3427` | Pendiente / error / foco |
| `--green` | `#2c5a43` | Verificado |
| `--max` | `1160px` | Ancho de contenido |
| `--gutter` | `clamp(1.25rem, 4vw, 3.5rem)` | Margen lateral |

Fondo: cuadrícula de 32 px con líneas `rgba(26,30,26,.045)` en ambos ejes, como papel de conteo.

## Tipografía

- **Display:** Barlow Semi Condensed 700, `line-height .98`, `letter-spacing -.02em`.
- **Texto:** Barlow 400/500/600, base `clamp(1rem, .62rem + 1.2vw, 1.125rem)`.
- **Datos y códigos:** Azeret Mono 400/500, `font-variant-numeric: tabular-nums`.

La mono solo aparece en folios, etiquetas de estado, números de fase y valores de stack.

## Estructura

- Contenedor máximo 1160 px con `--gutter` a los lados.
- Secciones en dos columnas: riel de 170 px con etiqueta mono + cuerpo. Bajo 900 px el riel pasa a
  fila horizontal sobre el cuerpo.
- Cada sección abre con una regla de 1 px (`--rule`). La sección de contacto usa 2 px de tinta.
- Espaciado vertical: `clamp(2.75rem, 5vw, 4rem)` por sección; siempre más aire sobre un título que
  bajo él.

## Componentes

| Componente | Regla |
|---|---|
| `.board` | Panel de diagnóstico: borde de tinta, sombra `6px 8px 0 rgba(26,30,26,.07)`, rotación `-.4deg` solo en escritorio |
| `.checklist` | Filas `1.25rem / 1fr / auto`; casilla de 1.1 rem; borde punteado entre filas |
| `.ledger` | Tabla origen → destino con número mono, flecha y estado a la derecha |
| `.phases` | Lista numerada `2.25rem / 1fr / 15rem`, con columna de verificación |
| `.specs` | Definiciones `130px / 1fr` con etiqueta mono en mayúsculas |
| `.limits` | Ítems con casilla roja vacía dibujada en `::before`, nunca un ícono de librería |
| Formulario | Solo línea inferior de 1 px; foco y error cambian el borde a rojo |

Sin tarjetas anidadas, sin grillas de icono + título + texto, sin degradados de texto, sin
glassmorphism decorativo.

## Movimiento

Un solo momento orquestado: el tablero entra con `board-in` (700 ms, `cubic-bezier(.16,1,.3,1)`) y
las casillas verificadas se estampan con `stamp` (420 ms, escala `1.35 → .96 → 1`). Todo se anula
bajo `prefers-reduced-motion: reduce`.

## Estados y superficies del navegador

- Selección de texto: fondo tinta, texto papel.
- Foco: `outline: 2px solid var(--red)`, `offset: 3px`.
- Scrollbar: `scrollbar-color: var(--rule) transparent`, delgada.
- Formulario: `idle / sending / sent / error`, anunciados por `role="status" aria-live="polite"`.
- Errores por campo con `aria-invalid` y mensaje propio; nunca solo color.

## Responsive

| Corte | Cambio |
|---|---|
| ≤ 900 px | Hero a una columna, tablero sin rotación, secciones a una columna |
| ≤ 640 px | Nav secundaria oculta, tabla se vuelve bloques, especificaciones apiladas |

## Reglas

1. Ningún dato comercial inventado: sin precios, plazos, clientes ni métricas.
2. El rojo significa pendiente o error; el verde, verificado. No se usan para decorar.
3. Cada sección demuestra un hecho verificable del método o del stack.
