## Why

La sección "Cultura, música y encuentros" (carrusel `#cultura`) se saca del home por decisión de contenido del cliente. Al sacarla, la tarjeta "CULTURA" del grid de 4 tarjetas de la sección de marca (`#marca`) queda apuntando a un ancla que ya no existe, así que se reemplaza por una tarjeta "Fragata" que enlaza a la sección Fragata ARA Libertad ya existente en el home.

## What Changes

- **BREAKING**: se elimina la sección `<section class="culture" id="cultura">` completa de `index.html` (carrusel de 6 fotos: Eventos con convocatoria, Música en vivo, Encuentros, Ambiente local, Artistas locales, Escenarios abiertos).
- Se eliminan los links de navegación "Cultura" (`href="/#cultura"`) del nav principal y footer de `index.html`, `en-fotos/index.html` y `404.html`. No hace falta agregar un link "Fragata" nuevo — ya existe en esos mismos menús.
- En la sección de marca (`#marca`, grid de 4 tarjetas), se reemplaza la tarjeta `brand-line-cultura` ("CULTURA") por una tarjeta `brand-line-fragata` ("FRAGATA") que enlaza a `/#fragata`, reutilizando la imagen `assets/fragata/fragata-01-portada.webp` ya existente.
- Se elimina el CSS huérfano específico de la sección carrusel (`.culture`, `.culture-carousel`, `.culture-slide`, `.carousel-shell`, `.section-heading` y sus variantes responsive) y se agrega el estilo del modificador `.brand-line-fragata`. Las reglas compartidas con otras secciones (`.carousel-control`, usada también por el carrete de Fragata) se mantienen intactas.
- Se elimina el JS huérfano del carrusel genérico (`[data-carousel]`, `[data-carousel-prev]`, `[data-carousel-next]`, `moveCarousel()`) en `script.js`, y se quita `.culture-slide` de los selectores de reveal-on-scroll/lazy-loading que ya no aplican.
- Se eliminan los 24 archivos de imagen `assets/cultura-*.{jpg,webp}` (originales + variantes `-480w`/`-900w`/`-1400w`), sin uso una vez sacada la sección y la tarjeta de marca.

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
- `mobile-hero-layout`: se elimina el requirement "La sección Cultura muestra sus fotos correctamente" (el carrusel que verificaba ya no existe).
- `responsive-hero-images`: el requirement "Las imágenes de Fragata y Cultura sirven la resolución apropiada según su ancho renderizado" pasa a cubrir solo Fragata (se quita el scenario "Carrusel de Cultura en desktop").

## Impact

- `index.html`: eliminación de sección, 5 links de nav/footer, reemplazo de una tarjeta de marca.
- `en-fotos/index.html`, `404.html`: eliminación de links de nav/footer.
- `styles.css`: eliminación de reglas huérfanas (`.culture*`, `.carousel-shell`, `.section-heading`), nueva regla `.brand-line-fragata`.
- `script.js`: eliminación de lógica de carrusel genérico y de `.culture-slide` en selectores compartidos.
- `assets/`: baja de 24 archivos de imagen `cultura-*`.
- `openspec/specs/mobile-hero-layout/spec.md`, `openspec/specs/responsive-hero-images/spec.md`: requirements/scenarios actualizados para reflejar que la sección Cultura ya no existe.
