## 1. Aplicar el fix

- [x] 1.1 Agregar `tabindex="0"` y `role="button"` a las `<img>` dentro de `.fragata-reel` en `index.html` (8 imágenes, no 9 — recuento corregido al inspeccionar el HTML directamente)
- [x] 1.2 Extender el listener en `script.js` (`reel?.querySelectorAll("img").forEach(...)`) para manejar `keydown` con `Enter`/`Espacio`, además del `click` existente

## 2. Verificación

- [x] 2.1 Navegar el carrete de la Fragata solo con teclado (Tab real hasta una foto, Enter y también Espacio en otra) y confirmar que el lightbox abre en ambos casos
- [x] 2.2 Confirmar que el anillo de foco dorado se ve correctamente al tabular sobre cada imagen (confirmado por estilo computado: matchea `:focus-visible`, `outline: 3px solid rgb(255,207,47)`, offset 4px)
- [x] 2.3 Confirmar que Escape cierra el lightbox y las flechas siguen navegando entre fotos (comportamiento ya existente, no debe romperse)
- [x] 2.4 Confirmar que el clic con mouse sigue funcionando igual que antes (no regresión)

## 3. Deploy

- [x] 3.1 Commit + push a `main`
- [x] 3.2 Verificar en producción (`ensenadaturismo.com`) que la navegación por teclado funciona
