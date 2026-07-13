## 1. Rama y preparación

- [x] 1.1 Crear rama `harden-lightbox-gallery-accessibility` desde `main`
- [x] 1.2 Leer `getPlaceModalFocusable`/`openPlaceModal`/`closePlaceModal`/`trapPlaceModalFocus` en `script.js` (líneas 319-388) como referencia exacta a replicar

## 2. Semántica de diálogo en el HTML

- [x] 2.1 Agregar `role="dialog"` y `aria-modal="true"` a `.image-lightbox` en `index.html`
- [x] 2.2 Agregar los mismos atributos a `.image-lightbox` en `en-fotos/index.html`

## 3. Foco atrapado y restaurado en script.js

- [x] 3.1 Agregar `let lastLightboxTrigger = null;` junto a `lastPlaceTrigger`
- [x] 3.2 Agregar `getLightboxFocusable()` (mismo shape que `getPlaceModalFocusable()`, apuntando a `lightbox`)
- [x] 3.3 Extender `openLightbox()`: guardar `document.activeElement` en `lastLightboxTrigger`, y mover el foco al primer elemento enfocable del lightbox (o a `lightboxClose`) tras renderizar
- [x] 3.4 Extender `closeLightbox()`: devolver el foco a `lastLightboxTrigger` si sigue siendo válido, y limpiarlo
- [x] 3.5 Agregar `trapLightboxFocus(event)` (mismo shape que `trapPlaceModalFocus`) y registrar el listener `keydown` en `lightbox`

## 4. aria-label único por foto

- [x] 4.1 En la función que genera las cards de galería (`script.js:209`), cambiar `button.setAttribute("aria-label", ...)` para incluir el número de foto (`Ampliar foto ${number} de ${title}`)

## 5. Verificación y entrega

- [x] 5.1 Validar `script.js` no tiene errores de sintaxis (`node --check script.js`) — OK
- [x] 5.2 Validar HTML de `index.html` y `en-fotos/index.html` con `html-validate` — OK
- [ ] 5.3 Pushear la rama y abrir PR contra `main`; confirmar Deploy Preview de Netlify
- [ ] 5.4 Verificar manualmente en la Deploy Preview: abrir el lightbox con teclado en ambas páginas, confirmar Tab/Shift+Tab atrapados, Escape cierra y devuelve el foco
- [ ] 5.5 Con aprobación del usuario: mergear el PR y archivar el change (`/opsx:archive`)
