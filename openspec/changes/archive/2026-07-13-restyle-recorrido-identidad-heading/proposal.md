## Why

El cliente pidió sacar el título grande y negro "Tres formas de vivir Ensenada" de la sección `#recorrido` y, en su lugar, agrandar la palabra "IDENTIDAD" del eyebrow ("ENSENADA IDENTIDAD") para que funcione como el nuevo título de la sección, en el mismo color naranja y tipografía del eyebrow.

## What Changes

- El `<h2>` de `.route-copy` (sección `#recorrido`) pasa de mostrar "Tres formas de vivir Ensenada" a mostrar únicamente "IDENTIDAD".
- El `<h2>` se re-estiliza: pasa de negro (`var(--brand-night)`) a naranja `#b8440b` (el mismo color que ya usa `.route-copy .eyebrow`), mismo peso 900, `font-size: clamp(44px, 7.5vw, 88px)`, `letter-spacing: -0.01em` (el `0.14em` del eyebrow es ilegible a ese tamaño), `line-height: ~0.92`. Se agrega como override final en `styles.css`, sin reescribir las ~10 reglas `.route-copy h2` ya existentes en el archivo (siguiendo la convención del repo de parches puntuales, no reorganizaciones).
- El `<p class="eyebrow">` pasa de "ENSENADA IDENTIDAD" a solo "ENSENADA" — sin cambios de estilo (12px, naranja, peso 900, línea de 34×2px vía `.eyebrow::before`).
- **Decisión de diseño (vía skill impeccable):** el `<h2>` se mantiene como elemento (no se elimina) porque es el único heading semántico de la sección — `<section class="route-section" id="recorrido">` no tiene `aria-labelledby` ni otro heading. Borrarlo sin reemplazo dejaba la sección sin encabezado accesible. Mantenerlo y re-estilizarlo cumple el pedido visual del cliente sin introducir una regresión de accesibilidad.
- Ajuste de precisión de documentación: `openspec/specs/place-card-visual-consistency/spec.md` menciona la sección por su nombre viejo ("Tres formas de vivir Ensenada") en la prosa de un `WHEN` — se actualiza la referencia para que seguir siendo legible, sin cambiar el requirement ni el scenario en sí (el comportamiento que testea, el `border-radius` de las place-cards, no cambia).

## Capabilities

### New Capabilities
- `recorrido-heading-treatment`: el heading de la sección `#recorrido` muestra "IDENTIDAD" con el tratamiento visual del eyebrow (color naranja, tipografía), agrandado, y el eyebrow que lo precede muestra solo "ENSENADA".

### Modified Capabilities
(ninguna — el ajuste en `place-card-visual-consistency/spec.md` es de prosa descriptiva, no cambia el requirement ni comportamiento testeado)

## Impact

- `index.html`: texto del `<h2>` y del `<p class="eyebrow">` dentro de `.route-copy` (sección `#recorrido`).
- `styles.css`: un bloque de override nuevo al final del archivo para el nuevo estilo del `<h2>`.
- `openspec/specs/place-card-visual-consistency/spec.md`: referencia de texto actualizada (sin cambio de requirement).
