# Bug: portada mobile con problemas de responsive

**Verificado y corregido (2026-07-10).** La imagen de fondo del hero (reportada originalmente como mal posicionada) está bien posicionada y no se reprodujo ningún problema. Sin embargo, se encontró y corrigió un bug real y distinto en la misma sección: el `<h1>ENSENADA</h1>` quedaba **cortado/ilegible** en todo el rango de anchos mobile comunes (320–430px), por una regla `white-space: nowrap` combinada con un `font-size` demasiado grande en el último bloque `@media (max-width: 760px)` de `styles.css` (línea 7874). Medido con canvas, el texto renderizado excedía el contenedor disponible por entre 111px y 139px en los 6 anchos probados.

Corregido ajustando `font-size: clamp(58px, 22vw, 96px)` a `clamp(46px, 14vw, 68px)` en `styles.css:7877` — verificado sin overflow en 320/360/375/390/414/430px. Ver `openspec/changes/archive/2026-07-10-verify-fix-mobile-bugs/` para el detalle completo (medición, decisión de diseño y verificación).

Reportado originalmente en una auditoría previa del sitio en vivo: la imagen de fondo (barcos/portada) del hero quedaba mal posicionada en celular.
