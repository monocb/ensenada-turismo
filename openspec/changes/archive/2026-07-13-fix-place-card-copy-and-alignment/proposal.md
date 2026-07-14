## Why

En la sección `#recorrido`, la tarjeta de "Ensenada Centro" muestra el texto "ENSENADA" (sin "Centro"), inconsistente con su propio identificador (`data-place="ensenada-centro"`) y su descripción. Además, en desktop los 3 botones "VER HISTORIA" no quedan alineados entre sí porque el título "PUNTA LARA" ocupa dos líneas y empuja su botón más abajo que el de las otras dos tarjetas.

## What Changes

- La tarjeta `data-place="ensenada-centro"` pasa de mostrar "ENSENADA" a mostrar "ENSENADA CENTRO", tanto en el `<strong>` visible como en el atributo `data-place-title` (que alimenta el título del modal y el alt de la imagen vía `script.js`).
- En desktop (`min-width: 1021px`, donde `.place-accordion` es un grid de 3 columnas), el botón `.place-action` ("VER HISTORIA") de cada tarjeta se ancla al fondo de la tarjeta, quedando alineado entre las 3 sin importar cuántas líneas ocupe el título.
- No se toca el layout mobile (`max-width: 1020px`, 2 columnas imagen|texto) — el fix queda scopeado solo al breakpoint de escritorio.

## Capabilities

### New Capabilities
- `place-card-content-and-alignment`: las place-cards de `#recorrido` muestran el nombre completo de cada lugar y, en desktop, sus botones de acción quedan alineados entre sí sin importar la longitud del título.

### Modified Capabilities
(ninguna)

## Impact

- `index.html`: texto del `<strong>` y atributo `data-place-title` de la tarjeta "ensenada-centro".
- `styles.css`: nuevo override en `@media (min-width: 1021px)` para `.place-trigger`, `.place-summary-copy` y `.place-action`, agregado al final del archivo.
