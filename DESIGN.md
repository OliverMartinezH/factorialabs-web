# Design

Sistema visual de la portada de FactoriaLabs. Registra lo construido, no lo planeado.

## World

**Panel de instrumentación en cutover.** La página se comporta como una consola que mide la
paridad entre el sistema viejo y el nuevo: dos columnas, tres cifras, una diferencia que llega a
cero. No promete resultados, los instrumenta.

Reemplaza el mundo anterior (hoja de checklist en papel). La barra de calidad son Linear y
Stripe/Cloudflare: negro, tipografía grande, precisión y datos animados, sin gradientes de texto ni
glass decorativo.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#07080a` | Fondo |
| `--bg-2` | `#0b0d11` | Alterno |
| `--panel` | `#101319` | Superficies, inputs, tarjetas |
| `--panel-2` | `#161a21` | Hover de superficies |
| `--line` | `#20252e` | Bordes |
| `--line-soft` | `#171b22` | Separadores internos |
| `--fg` | `#edeae3` | Texto principal (blanco cálido, no puro) |
| `--fg-dim` | `#9ba1aa` | Texto secundario (≈8:1 sobre bg) |
| `--fg-faint` | `#767d88` | Metadatos (≈5.4:1 sobre bg) |
| `--accent` | `#ffb020` | Ámbar: señal, estado, acción |
| `--ok` | `#6ee7a8` | Paridad verificada |
| `--bad` | `#e5484d` | Límite explícito y error |

Fondo global: dos `radial-gradient` de baja opacidad (ámbar arriba a la derecha, azul frío a la
izquierda) sobre el negro. Sin cuadrículas decorativas.

## Tipografía

- **Display y texto:** Archivo 400/500/600/700, `line-height .95` en titulares, `-.035em`.
- **Datos:** Azeret Mono 400/500, `tabular-nums`, para cifras, etiquetas y metadatos.
- Escala: `h1 clamp(2.6rem, 5.4vw, 4.55rem)`, `h2 clamp(1.9rem, 3.3vw, 2.75rem)`.

La mono solo aparece donde hay una medición, un código o una etiqueta de estado.

## Estructura

- Contenedor 1200 px, `--gutter` lateral.
- Secciones en dos columnas: riel de 170 px (etiqueta mono + chip de estado) y cuerpo. Bajo 980 px
  el riel pasa a fila horizontal.
- Separación entre secciones: `clamp(3.5rem, 7vw, 5.5rem)`, con regla de 1 px arriba.
- Hero a dos columnas (copy 1.05fr / panel 0.95fr), centrado verticalmente.

## Componentes

| Componente | Regla |
|---|---|
| `.panel` | Consola de paridad: borde `--line`, radio 12 px, gradiente vertical sutil, scanline ámbar de 5.5 s |
| `.metrics` | Filas `1fr auto auto 1rem`; el valor nuevo es brillante, el legacy atenuado; el check verde entra escalonado |
| `.ticker` | Banda de stack con marquee de 34 s y máscara de degradado en los bordes |
| `.migrate` | Diagrama de 3 fuentes que convergen en una tarjeta destino con borde ámbar y glow |
| `.phases` | Rejilla de 5 columnas con número mono, y verificación en verde al pie |
| `.specs` | Dos columnas de definiciones `105px / 1fr`, etiqueta mono en mayúsculas |
| `.limits` | Tres afirmaciones con casilla roja dibujada en `::before` |
| Formulario | Inputs sobre `--panel`, borde `--line`, foco ámbar con halo suave |

Sin tarjetas anidadas, sin grillas de icono + título + texto, sin degradado en texto, sin blur
decorativo.

## Movimiento

Un momento orquestado, todo desde un estado ya visible:

1. La scanline del panel recorre la consola cada 5.5 s.
2. Los checks de paridad entran a 0.9 s, 1.35 s y 1.8 s (`check-in`, 480 ms).
3. El ticker se desplaza de forma continua.
4. Hover: `translateY(-1px)` en botones y cambio de borde en tarjetas.

Nada de contenido oculto esperando scroll. Todo se anula bajo `prefers-reduced-motion: reduce`.

## Estados y superficies del navegador

- Selección: fondo ámbar, texto negro.
- Foco: `outline: 2px solid var(--accent)`, `offset: 3px`.
- Scrollbar: `#2a303a` sobre transparente, delgada.
- Formulario: `idle / sending / sent / error`, anunciado por `role="status" aria-live="polite"`.
- Errores con `aria-invalid` y mensaje bajo el campo; nunca solo color.

## Responsive

| Corte | Cambio |
|---|---|
| ≤ 980 px | Hero a una columna; panel limitado a 34 rem; secciones a una columna; fases a 2 columnas |
| ≤ 720 px | Nav secundaria oculta; diagrama de migración apilado con conector vertical; fases a 1 columna |

## Reglas

1. Ningún dato comercial inventado: sin precios, plazos, clientes ni métricas.
2. El ámbar señala lo que está en curso o requiere acción; el verde, paridad verificada; el rojo,
   límites y errores.
3. Cada sección demuestra un hecho verificable del método o del stack.
