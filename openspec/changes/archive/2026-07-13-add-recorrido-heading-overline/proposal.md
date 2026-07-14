## Why

Segunda iteración sobre el encabezado de `#recorrido`: el cliente pidió sacar la palabra "ENSENADA" del todo y mover la línea naranja que la acompañaba a una posición nueva — como una barra corta y centrada arriba de "IDENTIDAD", no un subrayado que abarque todo el ancho de la palabra.

## What Changes

- Se elimina por completo el `<p class="eyebrow">ENSENADA</p>` de la sección `#recorrido` — la palabra "ENSENADA" ya no aparece ahí.
- La línea naranja de 34×2px que acompañaba a "ENSENADA" (vía `.eyebrow::before`) desaparece junto con ese `<p>`. En su lugar, se agrega una barra corta nueva (`.route-copy h2::before`), del mismo naranja `#b8440b` (heredado vía `currentColor` del `<h2>`), posicionada arriba de "IDENTIDAD", centrada horizontalmente, con un ancho fluido corto que nunca abarca el ancho completo de la palabra.
- No se toca la regla compartida `.eyebrow::before`/`.feature-kicker::before` — la siguen usando otras secciones del sitio (Historia, Fragata, 404).

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
- `recorrido-heading-treatment`: el requirement ya no incluye el texto "ENSENADA" del eyebrow (se elimina esa parte); se agrega el requisito de la barra corta centrada arriba del `<h2>`.

## Impact

- `index.html`: se elimina el `<p class="eyebrow">` de la sección `#recorrido`.
- `styles.css`: nuevo override `.route-copy h2::before` agregado junto al bloque de `.route-copy h2` ya existente (mismo patrón de parche fechado al final del archivo).
