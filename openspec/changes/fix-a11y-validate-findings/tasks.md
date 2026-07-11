## 1. aria-label-misuse

- [x] 1.1 Agregar `role="group"` a `.brand-line-grid`, `.fragata-reel`, `.place-accordion`, `.video-panel` en `index.html`
- [x] 1.2 Agregar `role="group"` a los 3 `.photos-reel-controls` en `en-fotos/index.html`

## 2. unique-landmark

- [x] 2.1 Agregar `aria-label="Navegación principal"` a `.main-nav` en `index.html` y `en-fotos/index.html`

## 3. hidden-focusable

- [x] 3.1 Agregar `inert` al HTML inicial de `.place-modal` (junto a `aria-hidden="true"`) en `index.html`
- [x] 3.2 Alternar `inert` en `openPlaceModal`/`closePlaceModal` (`script.js`), junto con `aria-hidden`
- [x] 3.3 Agregar `inert` al HTML inicial de `.image-lightbox` (junto a `aria-hidden="true"`) en `index.html` y `en-fotos/index.html`
- [x] 3.4 Alternar `inert` en `openLightbox`/`closeLightbox` (`script.js`), junto con `aria-hidden`

## 4. Verificación

- [x] 4.1 Correr `html-validate -p a11y,recommended` sobre las 3 páginas y confirmar que los 3 hallazgos desaparecen
- [x] 4.2 Verificar con Puppeteer (teclado real, igual que la investigación) que ningún control del lightbox/modal recibe foco estando cerrado
- [x] 4.3 Verificar en el navegador que abrir/cerrar el lightbox y el modal "Ver historia" sigue funcionando igual (clic y teclado)

## 5. Configuración y documentación

- [x] 5.1 Actualizar `.htmlvalidate.json`: extender `html-validate:a11y` además de `recommended`, sacar `aria-label-misuse`/`hidden-focusable`/`unique-landmark` de las reglas desactivadas
- [x] 5.2 Confirmar que `npx html-validate --config .htmlvalidate.json index.html en-fotos/index.html 404.html` (el comando exacto de CI) pasa limpio
- [x] 5.3 Actualizar `docs/pendientes/accesibilidad.md`

## 6. Deploy

- [ ] 6.1 Commit + push a `main` (confirmar con el usuario antes)
- [ ] 6.2 Verificar en producción
- [ ] 6.3 Archivar el change y sincronizar la spec `aria-semantics-and-focus`
