## Context

La sección Fragata hoy es dos bloques: `.fragata-hero` (imagen única + `.fragata-hero-copy` con solo el `<h2>`, superpuesto arriba a la izquierda) y `.fragata-reel-block` (tarjeta navy separada debajo, con header de texto + botones prev/next, el carrete `.fragata-reel` de 8 `<figure>` scrolleable con círculos numerados y captions ocultos, y el link de crédito `.fragata-cta`). El carrete usa `overflow-x:auto` + `scroll-snap`, controlado por JS (`moveReel()`, `data-reel-prev`/`data-reel-next`) y cada foto abre un lightbox agrupado.

El hero principal del sitio (`#inicio`) ya resuelve exactamente el problema de "8 fotos rotando como fondo, sin interacción" con un mecanismo 100% CSS: `.hero-gallery` (contenedor `position:absolute; inset:0`) con 8 `<img class="hero-image hero-slide">`, cada una con `animation: heroPhotoFade 48s infinite` y un `animation-delay` escalonado en incrementos de 6s por `nth-child` (0s, 6s, 12s...42s) — exactamente 8 pasos para 8 imágenes, sin JS. `@keyframes heroPhotoFade` sube a opacity 1 entre 4%-14% del ciclo y baja a 0 el resto, así que en todo momento hay como máximo una imagen visible.

`.fragata-hero` ya tiene `position:relative`, overlay oscuro (`::after`) para legibilidad de texto, y `.fragata-hero-copy` posicionado absoluto arriba a la izquierda — la base estructural para superponer texto sobre imágenes de fondo ya existe, solo hay que reemplazar la imagen única por la galería rotativa y sumarle el párrafo + CTA que hoy viven en el bloque separado.

`.carousel-control` (compartida entre la sección Cultura, ya eliminada en un cambio anterior de esta sesión, y los botones prev/next de Fragata) queda huérfana en todo el sitio una vez que se eliminan los botones de Fragata — confirmado por grep, sin otro uso en ninguna página.

## Goals / Non-Goals

**Goals:**
- Reusar el mecanismo de slideshow del hero tal cual (misma `@keyframes`, mismo patrón de `animation-delay`), no inventar uno nuevo.
- `.fragata-hero-copy` pasa a alojar título + párrafo + CTA (antes solo título) — reusar sus reglas existentes (`h2`, `p:not(.eyebrow)`) que ya estaban pensadas para esto.
- Dejar `styles.css`/`script.js` sin código muerto: `.carousel-control` y todo lo exclusivo de `.fragata-reel-block` se elimina, no se comenta ni se oculta.

**Non-Goals:**
- No se rediseña el estilo visual de `.fragata-cta` (el borde lateral de color existente) — se reposiciona tal cual, no se le pide un rediseño.
- No se toca el hero principal (`#inicio`) — solo se reutiliza su patrón, no se modifica su código.
- No se generan nuevas variantes de imagen — las 8 fotos ya tienen `srcset` 480w/900w/1400w de un cambio anterior (`add-srcset-fragata-cultura`).

## Decisions

- **Reusar `@keyframes heroPhotoFade` literalmente, no crear `fragataPhotoFade`.** Es una curva de animación pura (fade in/out), no está atada a ningún selector específico — reutilizarla evita duplicar 15 líneas de keyframes idénticos. Los nombres de clase (`.fragata-gallery`, `.fragata-hero-slide`) sí son propios de la sección, solo la animación se comparte.
- **8 imágenes, 8 delays, mismo patrón de incremento de 6s (0/6/12/18/24/30/36/42s).** Calza exacto con las 8 fotos existentes del carrete — no hace falta recalcular nada, es el mismo número de slides que ya tiene el hero.
- **La imagen de portada actual (`fragata-01-portada`) pasa a ser el primer slide de la galería (`nth-child(1)`, `animation-delay:0s`), igual que hoy es la única imagen visible.** Mantiene la primera impresión visual idéntica al estado actual; las otras 7 aparecen después, rotando.
- **`.fragata-hero-copy` reusa sus reglas `h2`/`p:not(.eyebrow)` existentes para el nuevo párrafo, sin crear una clase nueva.** Esas reglas ya estaban dimensionadas para texto sobre esta imagen (max-width, color blanco, tamaño) — solo hacía falta que existiera un `<p>` real ahí, que hasta ahora no había.
- **`.fragata-cta` se mueve de posición en el DOM, no se reestiliza.** Ya tiene contraste adecuado (texto blanco, fondo semitransparente) pensado para ir sobre un fondo oscuro — la nueva ubicación (dentro de `.fragata-hero-copy`, sobre el overlay oscuro de la imagen) es visualmente equivalente a su contexto anterior (dentro de la tarjeta navy).
- **Eliminar `.carousel-control` por completo (no solo las reglas de Fragata) tras confirmar por grep que no queda ningún otro uso en el sitio.** Es la misma lógica que ya se aplicó al limpiar la sección Cultura — código muerto sin scope válido no se conserva "por si acaso".
- **Limpieza de `script.js`: eliminar `reel`/`reelPrev`/`reelNext`/`moveReel()` enteros, no dejarlos con `?.` como no-op.** Esas variables y esa función no tienen ningún otro consumidor (confirmado por grep) — dejarlas sería código muerto silencioso, el mismo criterio que se usó al limpiar el carrusel de Cultura al inicio de esta sesión.
- **`revealTargets`/`motionPhotos`: sacar `.fragata-reel figure`/`.fragata-reel img` de esas listas compartidas, sin agregar `.fragata-hero-slide` a ninguna de las dos.** El parallax de scroll (`motionPhotos`) y el fade-in por scroll (`revealTargets`) tendrían sentido en fotos estáticas, pero aplicados sobre imágenes que ya tienen su propia animación de opacidad en loop (`heroPhotoFade`) generarían dos animaciones compitiendo sobre el mismo elemento — el hero principal tampoco aplica estos efectos a `.hero-slide` por la misma razón (confirmado: `.hero-image`/`.hero-slide` no están en `revealTargets`, y sí está `.hero-image` en `motionPhotos` pero es el ÚNICO caso, y el hero no tiene reveal-on-scroll porque está siempre visible al cargar — la sección Fragata si tiene reveal via `main > section:not(.hero)`, que se aplica al `<section>` completo, no a las imágenes individuales, así que no hace falta replicar nada ahí).

## Risks / Trade-offs

- [Riesgo: `.carousel-control` tiene ~15 declaraciones dispersas en `styles.css`, algunas combinadas con `.lightbox-nav`/`.lightbox-close` que SÍ siguen en uso] → Mitigación: eliminar solo la porción `.carousel-control` de cada selector combinado, dejando `.lightbox-nav`/`.lightbox-close`/`.video-modal-close` intactos — mismo enfoque quirúrgico ya usado en cambios anteriores de esta sesión.
- [Riesgo: perder la posibilidad de ver las 8 fotos ampliadas (lightbox) es una regresión funcional real, no solo estética] → Mitigación: decisión explícita del cliente, confirmada por pregunta directa antes de proponer este cambio.
- [Riesgo: `.fragata-hero-copy` ahora tiene más contenido (h2+p+cta en vez de solo h2) dentro de un contenedor con `max-width:650px` y posición absoluta — podría desbordar la altura de `.fragata-hero` (`clamp(420px,58vw,680px)`) en viewports angostos] → Mitigación: verificación visual en mobile/tablet/desktop como parte de las tareas; si desborda, ajustar `top`/`max-width`/tamaños de fuente del párrafo (ya fluidos vía `clamp()`) antes de cerrar el cambio.

## Migration Plan

Cambio de contenido/estructura estático sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify. Sin rollback especial más allá de revertir el commit si algo se ve mal en producción.
