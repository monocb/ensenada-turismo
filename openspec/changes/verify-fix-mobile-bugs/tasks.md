## 1. Corregir el bug confirmado (hero h1 recortado)

- [x] 1.1 En `styles.css:7877`, cambiar `font-size: clamp(58px, 22vw, 96px) !important;` por `font-size: clamp(46px, 14vw, 68px) !important;`
- [x] 1.2 Verificar con Chrome headless (320/375/414/430px) que el ancho renderizado del texto ya no excede el contenedor
- [x] 1.3 Tomar screenshots del hero en 375px y 414px para confirmar visualmente que el texto se ve completo y proporcionado

## 2. Actualizar documentación de los 4 bugs con el estado verificado

- [x] 2.1 Actualizar `docs/pendientes/bug-menu-hamburguesa.md`: marcar como verificado/no reproducible (ícono de 3 líneas, `aria-expanded` funcional)
- [x] 2.2 Actualizar `docs/pendientes/bug-seccion-cultura.md`: marcar como verificado/no reproducible (las 6 fotos cargan correctamente en el carrusel)
- [x] 2.3 Actualizar `docs/pendientes/bug-renglon-amarillo.md`: marcar como verificado/no reproducible (sin overflow horizontal detectado en toda la página)
- [x] 2.4 Actualizar `docs/pendientes/bug-portada-mobile.md`: reemplazar la descripción original (imagen de fondo mal posicionada, no reproducible) por el hallazgo real verificado (recorte del `<h1>` del hero) y su corrección

## 3. Deploy y validación en producción

- [ ] 3.1 Commit + push a `main`
- [ ] 3.2 Verificar en producción (`ensenadaturismo.com`) en 320/375/414/430px que el hero ya no recorta el texto
