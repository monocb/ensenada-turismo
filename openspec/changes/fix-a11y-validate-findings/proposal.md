## Why

`docs/pendientes/accesibilidad.md` listaba 3 hallazgos de `html-validate` (preset `html-validate:a11y`, no activo en el `.htmlvalidate.json` de CI — se descubrieron con una corrida manual puntual) sin confirmar si el patrón CSS/JS existente ya los mitigaba en la práctica:

1. **`aria-label-misuse`** (5 casos: `index.html:149,211,280,419` + 3 en `en-fotos/index.html:96,126,156`): `<div aria-label="...">` sin `role` — un `<div>` sin rol no expone `aria-label` de forma confiable a todos los lectores de pantalla.
2. **`hidden-focusable`**: verificado con Puppeteer (220 Tabs reales, Chrome real) que `.image-lightbox[aria-hidden="true"]` (`index.html:261,263,271`, `en-fotos/index.html:171,172,179`) **no** es alcanzable por teclado en reposo — `display: none` ya lo saca del orden de tabulación, es un falso positivo de análisis estático. Pero la misma verificación encontró que **`.place-modal[aria-hidden="true"]`** (`index.html:355`, el modal "Ver historia" de los place-cards) **sí** es un problema real: usa `opacity: 0` + `pointer-events: none` en vez de `display: none`, así que su botón "Cerrar" queda alcanzable por Tab estando invisible — un tab-stop fantasma para usuarios de teclado. Este caso no estaba en el doc original (se sumó una funcionalidad después del relevamiento).
3. **`unique-landmark`**: `<nav class="main-nav">` (`index.html:78`) sin nombre accesible — el doc decía "impacto bajo, es el único `<nav>` de la página", pero en realidad `index.html` tiene 4 `<nav>` (`.main-nav`, `.social-strip-links`, `.footer-links`, `.footer-social-links`), y los otros 3 sí tienen `aria-label` — el `.main-nav` sin nombre es ambiguo en la navegación por landmarks.

## What Changes

- Agregar `role="group"` a los 5 `<div aria-label="...">` sin rol (4 en `index.html`, 3 en `en-fotos/index.html`).
- Agregar `aria-label="Navegación principal"` a `.main-nav` en ambas páginas.
- Corregir el foco fantasma de `.place-modal`: agregar el atributo `inert` en el HTML inicial (junto a `aria-hidden="true"`) y alternarlo en `script.js` (`openPlaceModal`/`closePlaceModal`), igual que se alterna `aria-hidden`.
- Agregar `inert` también a `.image-lightbox` (ambas páginas) por consistencia y como refuerzo — aunque `display: none` ya lo protege, no depender solo de una propiedad CSS implícita para una garantía de accesibilidad.
- Habilitar el preset `html-validate:a11y` en `.htmlvalidate.json` (además de `recommended`) y sacar `aria-label-misuse`/`hidden-focusable`/`unique-landmark` de la lista de reglas desactivadas — para que la CI detecte una regresión futura de estos 3 problemas. Verificado que el resto de los hallazgos que introduce el preset `a11y` ya están cubiertos por las reglas ya desactivadas (`void-style`, `prefer-native-element`, `attribute-allowed-values`, `empty-heading`), sin sorpresas nuevas.

## Capabilities

### New Capabilities
- `aria-semantics-and-focus`: los contenedores con `aria-label` tienen un rol que lo soporta, los landmarks duplicados tienen nombres únicos, y ningún elemento interactivo es alcanzable por teclado mientras está oculto con `aria-hidden`.

## Impact

- Archivos modificados: `index.html`, `en-fotos/index.html`, `script.js`, `.htmlvalidate.json`, `docs/pendientes/accesibilidad.md`.
- No afecta CSS ni el comportamiento visual — cambios de semántica ARIA + un atributo `inert` alternado por JS.
- Riesgo: bajo. `inert` es un atributo HTML estándar (sin polyfill necesario, soportado en todos los navegadores evergreen), y ya se verificó con Puppeteer que el patrón de apertura/cierre existente (`classList`/`aria-hidden`) es el lugar correcto para alternarlo.
