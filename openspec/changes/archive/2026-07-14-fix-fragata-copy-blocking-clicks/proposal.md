## Why

Tras el fix anterior (`fix-fragata-mobile-tap-to-open`), las fotos de Fragata ya abren el lightbox en mobile, pero el cliente reporta que solo funciona si toca muy cerca del borde izquierdo de la foto — en cualquier otro punto del área de la foto no responde. La caja del panel de texto (`.fragata-hero-copy`) intercepta los clicks/taps en toda su superficie rectangular (incluidas las zonas visualmente "vacías" entre el título y el texto), y en mobile esa caja ocupa casi todo el ancho disponible, dejando solo un margen angosto genuinamente libre para tocar la foto de atrás.

## What Changes

- `.fragata-hero-copy` pasa a `pointer-events: none` — su caja deja de interceptar clicks/taps en toda su superficie, dejándolos pasar a la galería de fotos de atrás en cualquier punto.
- `.fragata-cta` (el único link real dentro de ese panel, el crédito a Puerto La Plata) pasa a `pointer-events: auto` explícito, para seguir siendo clickeable pese a que su contenedor padre ya no captura eventos.

## Capabilities

### Modified Capabilities
- `fragata-background-gallery`: se agrega el requirement de que el panel de texto no debe bloquear los clicks/taps sobre las fotos de fondo en ningún punto de su superficie.

## Impact

- `styles.css`: dos declaraciones (`.fragata-hero-copy { pointer-events: none; }`, `.fragata-cta { pointer-events: auto; }`).
- `openspec/specs/fragata-background-gallery/spec.md` (modificada).
