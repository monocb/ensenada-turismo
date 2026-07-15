## Why

El cliente reportó que las flechas de navegación del lightbox (anterior/siguiente) tapan parte de la foto ampliada — hoy están posicionadas a los costados, a la altura vertical del centro de la imagen. Pidió que pasen a estar debajo de la foto, con un diseño rectangular de esquinas redondeadas en vez de circular.

## What Changes

- `.lightbox-nav` (botones `.lightbox-prev`/`.lightbox-next`, componente compartido por todo el sitio) pasa de estar posicionado a los costados (`top:50%`, pegado a los bordes izquierdo/derecho) a estar debajo de la foto, como un par centrado horizontalmente con un pequeño espacio entre ambos.
- La forma pasa de circular (`border-radius:999px`, 52×52px) a rectangular con esquinas redondeadas (`border-radius:14px`, más ancho que alto).
- `.image-lightbox img` reduce su `max-height` de `92vh` a `78vh`, para garantizar que quede espacio debajo de la foto para las flechas sin superposición, incluso con fotos verticales/muy altas.
- No se tocan `.lightbox-close` ni `.lightbox-download` (siguen en las esquinas superiores) — el pedido es específicamente sobre las flechas de navegación.

## Capabilities

### New Capabilities
- `lightbox-nav-controls-layout`: dónde y cómo se posicionan las flechas de navegación del lightbox compartido, y su forma visual.

## Impact

- `styles.css`: reposicionamiento y cambio de forma de `.lightbox-nav`/`.lightbox-prev`/`.lightbox-next`, ajuste de `max-height` en `.image-lightbox img`.
- `openspec/specs/lightbox-nav-controls-layout/spec.md` (nueva).
