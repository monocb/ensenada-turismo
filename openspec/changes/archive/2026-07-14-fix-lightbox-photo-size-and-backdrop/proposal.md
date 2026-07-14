## Why

El cliente mandó una captura de "En Fotos" donde las fotos del carrete abren "chicas" en el lightbox comparadas con las de la sección Fragata. Es un bug real del lightbox compartido, no percepción: los carretes de en-fotos abren la variante de baja resolución del `srcset` (pensada para el thumbnail chico de la grilla) en vez del archivo completo.

## What Changes

- `renderLightboxImage()` deja de usar únicamente `image.currentSrc || image.src` (que para los carretes de en-fotos resuelve a la variante `-480w`/`-900w` del `srcset`, un archivo genuinamente chico) y en su lugar prioriza un origen de resolución completa cuando está disponible.
- Los `<img>` generados dinámicamente en `setupPhotoReelSection()` (los 3 carretes de `en-fotos/index.html`) suman un atributo nuevo, `data-lightbox-src`, apuntando al archivo base sin sufijo de resolución — el mismo que ya usa `src` antes de que `srcset` lo pise. Este atributo es solo para mostrar la foto ampliada; no activa el botón de descarga (eso sigue exclusivo de `data-download`, que en-fotos no tiene).

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
- `lightbox-image-download`: se agrega un requirement sobre el comportamiento general del lightbox compartido — la foto ampliada SHALL mostrarse a resolución completa sin importar de qué galería provenga.

## Impact

- `script.js`: `setupPhotoReelSection()` (nuevo atributo `data-lightbox-src` en cada `<img>` generada), `renderLightboxImage()` (nuevo orden de resolución de la fuente a mostrar).
- `openspec/specs/lightbox-image-download/spec.md`: 1 requirement nuevo.
