## 1. Copy y tamaño del título

- [x] 1.1 En `index.html`, cambiar el texto del `<p>` dentro de `.fragata-hero-copy` a "Patria, río e industria, uno de los grandes símbolos de la Argentina. Soberanía, trabajo y orgullo nacional."
- [x] 1.2 En `styles.css`, cambiar `.fragata-hero-copy h2 { font-size: clamp(40px, 6.8vw, 86px); ... }` a `clamp(34px, 5.8vw, 70px)`.

## 2. HTML — restaurar interactividad en las 8 fotos de fondo

- [x] 2.1 En `index.html`, en cada uno de los 8 `<img class="fragata-hero-image fragata-hero-slide">`, agregar `alt`, `data-lightbox-title`, `data-lightbox-location="Ensenada"`, `data-lightbox-description`, `tabindex="0"`, `role="button"` con los valores especificados en el proposal (uno por imagen, mismo orden 01/03/05/06/07/08/09/10).
- [x] 2.2 En cada una de esas 8 imágenes, agregar `data-lightbox-download="assets/fragata/{archivo-base}.webp"` apuntando al archivo sin sufijo de resolución (el mismo que ya usa `src`).
- [x] 2.3 En `.fragata-gallery`, quitar `aria-hidden="true"` y agregar `role="group" aria-label="Fotos de la Fragata ARA Libertad en Ensenada"`.

## 3. CSS — pointer-events sincronizado con la rotación

- [x] 3.1 Agregar `@keyframes fragataSlideInteractive` con `pointer-events: none/auto` en los mismos puntos porcentuales que `heroPhotoFade` (`0% none`, `4%,14% auto`, `20%,100% none`), sin modificar `@keyframes heroPhotoFade`.
- [x] 3.2 Cambiar `.fragata-gallery .fragata-hero-slide { opacity:0; animation: heroPhotoFade 48s infinite; }` a `animation: heroPhotoFade 48s infinite, fragataSlideInteractive 48s infinite;`, agregando `pointer-events: none;` como valor base. Confirmar que el `animation-delay` único por `nth-child` ya existente se aplica a ambas animaciones (comportamiento estándar de CSS, no requiere duplicar los 8 valores).
- [x] 3.3 Agregar `cursor: pointer` a `.fragata-hero-slide` para dar la señal visual de que es clickeable cuando está visible.

## 4. CSS — botón de descarga del lightbox

- [x] 4.1 Agregar `.lightbox-download` con el mismo patrón visual circular que `.lightbox-close`/`.lightbox-nav` (posición, tamaño, `border-radius:999px`, fondo/borde translúcido), oculto por defecto (`display:none` o `hidden` attribute).
- [x] 4.2 Agregar `.lightbox-download::before { content: "\2193"; }` (↓) siguiendo el mismo patrón de ícono vía glyph que ya usan `.lightbox-nav`/`.lightbox-close` (ocultar cualquier `svg`/`i` interno, mostrar el pseudo-elemento).
- [x] 4.3 Agregar una clase `.is-visible` (o usar el atributo `hidden`) para el estado mostrado, controlado desde `renderLightboxImage()`.

## 5. JavaScript — wiring de click/teclado y descarga

- [x] 5.1 En `script.js`, agregar un `forEach` sobre las 8 `.fragata-hero-slide` (mismo patrón que `placeGalleryImages`/`photoExhibitImages`) con `click` y `keydown` (Enter/Espacio) que llaman a `openLightbox(image, galería de las 8 imágenes)`.
- [x] 5.2 Confirmar que `.fragata-hero-slide` NO se agrega a `revealTargets` ni a `motionPhotos` (mismo razonamiento del cambio anterior: evitar animaciones compitiendo con la rotación/interactividad).
- [x] 5.3 En `renderLightboxImage()`, leer `image.dataset.lightboxDownload` de la imagen activa; si existe, setear `href` + `download` en el nuevo botón/link de descarga y mostrarlo; si no existe, ocultarlo.
- [x] 5.4 Agregar la referencia al nuevo botón (`document.querySelector("[data-lightbox-download]")` o similar) junto a las demás referencias del lightbox al inicio del archivo.

## 6. Markup del lightbox (2 páginas)

- [x] 6.1 En `index.html`, agregar `<a class="lightbox-download" data-lightbox-download download>` dentro de `<div class="image-lightbox" data-lightbox>`, hermano de `lightbox-close`/`lightbox-prev`/`lightbox-next`.
- [x] 6.2 Agregar el mismo botón al lightbox de `en-fotos/index.html`, por consistencia de markup (no se activará ahí hasta que alguna imagen de esa página sume `data-lightbox-download`).

## 9. Eliminar el caption del lightbox (sitewide)

- [x] 9.1 En `index.html` y `en-fotos/index.html`, eliminar el `<div class="lightbox-caption" data-lightbox-caption>...</div>` completo del markup del `.image-lightbox`.
- [x] 9.2 En `index.html`, eliminar `data-lightbox-title`, `data-lightbox-location`, `data-lightbox-description` de las 8 `<img class="fragata-hero-slide">` (mantener `alt`, `data-download`, `tabindex`, `role`).
- [x] 9.3 En `styles.css`, eliminar `.lightbox-caption` y sus reglas hijas (`strong`/`span`/`p`), incluidas variantes responsive y reglas `[hidden]` específicas de ese selector.
- [x] 9.4 En `script.js`, eliminar `lightboxTitle`/`lightboxLocation`/`lightboxDescription` y el bloque de `renderLightboxImage()` que las poblaba junto con el toggle de `caption.hidden`.
- [x] 9.5 Confirmar con `node --check script.js` y balance de llaves en `styles.css`.

## 7. Verificación

- [x] 7.1 Servir el sitio en local (`npx serve .`) y verificar visualmente: bajada corta, título más chico, fotos de fondo siguen rotando solas, click sobre la foto visible abre el lightbox con esa misma foto (probar en distintos momentos del ciclo de 48s), prev/next del lightbox recorre las 8, botón de descarga visible y funcional para fotos de Fragata. Confirmado por el usuario, incluyendo que el lightbox ya no muestra caption en ninguna galería.
- [x] 7.2 Verificar que el botón de descarga NO aparece al abrir el lightbox desde una place-card u otra galería sin `data-download`.
- [x] 7.3 Verificar navegación por teclado: Tab llega a las fotos de Fragata, Enter/Espacio abre el lightbox, foco visible.
- [x] 7.4 Confirmar con `node --check script.js` y balance de llaves en `styles.css`.
- [x] 7.5 Confirmar que el archivo descargado corresponde a la versión de resolución completa (no una variante `-480w`/`-900w`/`-1400w`).

## 8. OpenSpec

- [x] 8.1 Ejecutar `/opsx:sync` para aplicar la nueva spec `lightbox-image-download` y los MODIFIED de `fragata-background-gallery`/`keyboard-accessible-galleries` a `openspec/specs/`.
- [x] 8.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
