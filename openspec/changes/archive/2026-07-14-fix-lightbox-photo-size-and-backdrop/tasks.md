## 1. JavaScript — resolución completa en el lightbox

- [x] 1.1 En `script.js`, en `setupPhotoReelSection()`, agregar `image.dataset.lightboxSrc = ${photoBase}.webp;` a cada `<img>` generada (el archivo base sin sufijo de resolución, el mismo que ya arma `photoBase`).
- [x] 1.2 En `renderLightboxImage()`, cambiar `lightboxImage.src = image.currentSrc || image.src;` a `lightboxImage.src = image.dataset.lightboxSrc || image.dataset.download || image.currentSrc || image.src;`.

## 2. Verificación

- [x] 2.1 Servir el sitio en local (`npx serve .`) y abrir fotos de los 3 carretes de `en-fotos/` — confirmar que se ven grandes (ocupando la mayor parte de la pantalla, como Fragata), no chicas. Confirmado por el usuario.
- [x] 2.2 Abrir una foto de Fragata y confirmar que se sigue viendo igual de grande que antes (sin regresión).
- [x] 2.3 Confirmar con `node --check script.js`.

## 3. OpenSpec

- [x] 3.1 Ejecutar `/opsx:sync` para aplicar el requirement ADDED de `lightbox-image-download` a `openspec/specs/`.
- [x] 3.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
