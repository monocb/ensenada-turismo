## Why

El cliente pidió simplificar la sección Fragata: acortar el copy y convertir el carrete de 8 fotos (hoy una franja horizontal scrollable con botones, círculos numerados y clic-para-ampliar) en un fondo rotativo puro, sin controles, al estilo del hero principal del sitio — priorizando una lectura más limpia por sobre la interacción de galería.

## What Changes

- El `.feature-kicker` pasa de "ENSENADA IDENTIDAD / Patrimonio naval argentino" a solo "PATRIMONIO ARGENTINO".
- El `<h2 id="fragata-title">` se mantiene igual: "Fragata ARA Libertad en Ensenada".
- El primer párrafo se acorta (quita "La Fragata ARA Libertad es"): "Un encuentro entre patria, río e industria naval. Más que una embarcación: es uno de los grandes símbolos de la Argentina en el mundo. En Ensenada, su presencia une soberanía, formación, trabajo portuario y orgullo nacional."
- **BREAKING**: se elimina el segundo párrafo ("Este carrete reúne imágenes elegidas..."), ya no aplica.
- **BREAKING**: se elimina por completo el carrete visible de 8 fotos (`.fragata-reel-block`): botones prev/next, círculos numerados, captions y el clic-para-ampliar (lightbox) de esas 8 fotos. Confirmado con el cliente: se acepta perder esa interacción a cambio de un fondo puramente ambiental.
- Las mismas 8 fotos pasan a ser un **fondo rotativo** de la sección Fragata, reutilizando el mecanismo 100% CSS (`@keyframes heroPhotoFade`, sin JS) que ya usa el hero principal del sitio (`#inicio`) — mismo patrón, misma animación, sin duplicar código de animación.
- El link de crédito `.fragata-cta` ("Gracias al Puerto La Plata...") se conserva con el mismo texto/href, reposicionado dentro de `.fragata-hero-copy` junto al título y el párrafo.
- Limpieza de CSS/JS huérfano: `.carousel-control` queda sin ningún uso en todo el sitio una vez que se sacan los botones prev/next de Fragata (su otro uso, en la sección Cultura, ya se eliminó en un cambio anterior de esta sesión) — se elimina junto con `.fragata-reel-header`, `.fragata-reel`, `.reel-actions`, `.fragata-reel figure` y variantes. En `script.js` se eliminan `reel`/`reelPrev`/`reelNext`, `moveReel()` y el binding de lightbox de las 8 fotos del carrete.

## Capabilities

### New Capabilities
- `fragata-background-gallery`: la sección Fragata muestra el copy actualizado y un fondo rotativo de 8 fotos (sin controles, sin lightbox), reutilizando el mecanismo de slideshow del hero.

### Modified Capabilities
- `responsive-hero-images`: el requirement sobre imágenes de Fragata deja de mencionar `.fragata-reel` (ya no existe) y pasa a cubrir las 8 imágenes de la galería de fondo bajo el mismo criterio de `sizes` que la imagen de portada.
- `aria-semantics-and-focus`: el scenario que testea `.fragata-reel` (`role="group"` + `aria-label`) se reemplaza por un ejemplo equivalente que sigue existiendo en el sitio (`.video-panel` de la sección Historia) — el requirement en sí (todo `div[aria-label]` necesita un `role` que lo soporte) no cambia.

### Removed Capabilities
- `keyboard-accessible-galleries`: todo el requirement ("Las fotos del carrete de la Fragata son operables por teclado") queda obsoleto — las fotos del carrete ya no son interactivas ni clickeables.

## Impact

- `index.html`: reescritura de la sección `#fragata` — copy actualizado, `.fragata-reel-block` eliminado, nueva galería de fondo dentro de `.fragata-hero`.
- `styles.css`: ~70 puntos dispersos que tocan `.fragata-hero`/`.fragata-reel-block`/`.carousel-control` — limpieza de lo exclusivo a lo eliminado, ajuste de lo compartido, nuevo bloque para `.fragata-gallery`/`.fragata-hero-slide`.
- `script.js`: eliminación de `reel`/`reelPrev`/`reelNext`/`moveReel()` y el binding de lightbox de las 8 fotos; ajuste de `revealTargets`/`motionPhotos` para sacar referencias a `.fragata-reel`.
- `openspec/specs/responsive-hero-images/spec.md`, `openspec/specs/aria-semantics-and-focus/spec.md`, `openspec/specs/keyboard-accessible-galleries/spec.md`: requirements actualizados/removidos.
- No se tocan los assets `assets/fragata/*.webp` — se siguen usando, ahora como fondo.
