## 1. HTML — sección y navegación

- [x] 1.1 Eliminar `<section class="culture" id="cultura">` completa de `index.html` (líneas ~372-409: heading, carrusel de 6 `<figure>`, botones prev/next).
- [x] 1.2 En `index.html`, reemplazar la tarjeta `<a class="brand-line brand-line-cultura" href="/#cultura">` (grid de marca, `#marca`) por una tarjeta `brand-line-fragata` que enlace a `/#fragata`, usando `assets/fragata/fragata-01-portada.webp` (con su `srcset` 480w/900w/1400w existente), título "FRAGATA" y una bajada acorde (ej. "Patrimonio naval en el río").
- [x] 1.3 Eliminar el link `<a href="/#cultura">Cultura</a>` del nav principal y del footer de `index.html` (2 ocurrencias).
- [x] 1.4 Eliminar el link `<a href="/#cultura">Cultura</a>` del nav principal y del footer de `en-fotos/index.html` (2 ocurrencias).
- [x] 1.5 Eliminar el link `<a href="/#cultura">Cultura</a>` del nav de `404.html` (1 ocurrencia).

## 2. CSS

- [x] 2.1 Eliminar todas las reglas `.culture`, `.culture::before`, `.culture::after`, `.culture-carousel`, `.culture-carousel::-webkit-scrollbar`, `.culture-slide` y sus variantes/pseudo-clases (incluidas las repetidas en bloques `@media` responsive) en `styles.css` — confirmar con `grep -n "\.culture"` que no queda ninguna.
- [x] 2.2 Eliminar las reglas `.carousel-shell` y `.section-heading` (y sus variantes en `@media`) — son exclusivas de la sección eliminada.
- [x] 2.3 Eliminar la regla `.culture .carousel-control` (override puntual) sin tocar la regla base `.carousel-control` ni `.fragata-reel-header .carousel-control` (siguen en uso por el carrete de Fragata).
- [x] 2.4 Eliminar la regla del modificador `.brand-line-cultura` y agregar `.brand-line-fragata` con `--line-color: var(--brand-blue)` y `--line-accent: var(--brand-yellow)`, siguiendo el mismo patrón que `.brand-line-fotos`/`.brand-line-historia`/`.brand-line-vivo`.

## 3. JavaScript

- [x] 3.1 En `script.js`, eliminar el bloque completo del carrusel genérico: declaraciones de `carousel`/`carouselPrev`/`carouselNext` (`[data-carousel]`, `[data-carousel-prev]`, `[data-carousel-next]`), la función `moveCarousel()` y sus listeners.
- [x] 3.2 Quitar `.culture-slide` de los dos selectores compartidos de reveal-on-scroll y lazy-loading en `script.js`, dejando el resto de la lista intacta.

## 4. Assets

- [x] 4.1 Confirmar con `grep -rn "cultura-"` sobre todo el repo que no queda ninguna referencia a `assets/cultura-*` fuera de lo ya eliminado.
- [x] 4.2 Borrar los 24 archivos `assets/cultura-{banda,cantante,encuentro,escenario,gastronomia,publico}.jpg` y sus variantes `-480w.webp`/`-900w.webp`/`-1400w.webp`.

## 5. Verificación

- [x] 5.1 Servir el sitio en local (`npx serve .`) y verificar `index.html`, `en-fotos/index.html`, `404.html` y todos los assets referenciados con `curl` (200 en todas las rutas). **Nota**: sin herramienta de navegador disponible en esta sesión para verificación visual — pendiente de confirmación visual del usuario.
- [x] 5.2 Confirmar que no hay recursos rotos: los 4 assets de `fragata-01-portada` usados en la tarjeta nueva responden 200, `node --check script.js` pasa sin errores, y no quedan referencias a `carousel`/`carouselPrev`/`carouselNext`/`data-carousel*` en el código.
- [x] 5.3 Correr `grep -rn "cultura\|culture" index.html en-fotos/index.html 404.html styles.css script.js` (case-insensitive) — únicas coincidencias remanentes son incidentales (palabra "cultura" en título/meta/tagline), no la sección eliminada.

## 6. OpenSpec

- [x] 6.1 Ejecutar `/opsx:sync` (o `openspec sync-specs`) para aplicar las specs delta de `mobile-hero-layout` y `responsive-hero-images` a `openspec/specs/`.
- [x] 6.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
