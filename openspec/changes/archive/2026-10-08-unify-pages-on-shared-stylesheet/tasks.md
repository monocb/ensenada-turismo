## 1. Medir el encabezado antes de propagarlo

- [x] 1.1 Comparar los nombres de clase de estado que escribe `script.js` contra los que esperan las reglas de la hoja de la portada, y anotar cada desfasaje
- [x] 1.2 Medir en navegador el encabezado de la portada: caja del lettering, centrado respecto de la ventana en 390/768/1024/1440, condensado al scrollear, y apertura del menú en ancho de teléfono
- [x] 1.3 Dejar registrado lo encontrado: cuatro defectos, con la medición de cada uno

## 2. Partir la hoja de la portada

- [x] 2.1 Extraer a `assets/css/base.css` los tokens, la base tipográfica, el enlace de salto, el encabezado, el pie, el visor de fotos, la ficha de territorio y el reveal
- [x] 2.2 Dejar en `assets/css/home.css` sólo las secciones de la portada, con sus media queries y su bloque de movimiento reducido
- [x] 2.3 Comparar el conjunto de selectores de la hoja original contra el de las dos resultantes y confirmar que la única diferencia son los selectores reemplazados a propósito
- [x] 2.4 Enganchar `index.html` a las dos hojas, en orden

## 3. Corregir los cuatro defectos del encabezado

- [x] 3.1 Dar `display: block` al lettering del encabezado y confirmar por medición que deja de ser una caja de 0×0
- [x] 3.2 Reescribir las reglas de estado contra los nombres que escribe el JavaScript, no contra los inventados en la hoja
- [x] 3.3 Enganchar el menú de teléfono al estado del encabezado para que expongan los enlaces las dos navegaciones, y ubicarlas con áreas de grilla
- [x] 3.4 Unificar el espaciado del menú abierto para que los enlaces se lean como una sola lista, y centrar el grupo de la derecha, que traía la alineación del encabezado de escritorio
- [x] 3.5 Fijar el lettering a la columna del medio en anchos de teléfono y tablet
- [x] 3.6 Cerrar el menú desde todos los enlaces del encabezado, no sólo desde los de la primera navegación
- [x] 3.7 Volver a medir los cuatro puntos y confirmar que quedan corregidos

## 4. Migrar la página de fotos

- [x] 4.1 Escribir `assets/css/en-fotos.css` sobre el sistema nuevo: portada de la página y carretes
- [x] 4.2 Reemplazar el encabezado y el pie de `en-fotos/index.html` por los del sistema, con la página actual señalada
- [x] 4.3 Asignar a cada carrete el acento del territorio que retrata, tomado de la paleta del manual
- [x] 4.4 Centrar el título de cada carrete y llevar el carrete de borde a borde, para que no quede una franja muerta del lado izquierdo

## 5. Migrar la página de error

- [x] 5.1 Escribir `assets/css/error.css`
- [x] 5.2 Reescribir `404.html` sobre el sistema nuevo, con el pie compartido y el código de error como dato en vez de volantillo decorativo
- [x] 5.3 Aplicar `display: block` explícito al lettering de la página

## 6. La calesita

- [x] 6.1 Sacar la barra de scroll horizontal del carrete y el ajuste por tarjeta, que peleaba con el avance continuo
- [x] 6.2 Hacer que el carrete avance solo, con un acumulador propio en vez de sumar sobre `scrollLeft`, que redondea a píxel entero
- [x] 6.3 Dar la vuelta moviendo la primera tarjeta al final, sin duplicar fotos
- [x] 6.4 Frenar el avance con el puntero encima, con el foco adentro, durante un lapso después de tocarlo, y mientras haya una foto abierta en el visor
- [x] 6.5 Hacer que la flecha de atrás funcione desde el principio del carrete, trayendo la tarjeta anterior
- [x] 6.6 Correr un solo bucle de animación para los tres carretes, que no gaste en los que no están a la vista, y no arrancarlo con movimiento reducido
- [x] 6.7 Verificar en navegador: avance, pausa por mouse, pausa por toque, pausa con el visor abierto, vuelta completa sin fotos duplicadas y flechas en los dos sentidos

## 7. Movimiento reducido en los scrolls programáticos

- [x] 7.1 Hacer que los dos `scrollTo`/`scrollBy` con desplazamiento suave consulten la preferencia de movimiento reducido

## 8. CI y documentación

- [x] 8.1 Ampliar el paso de validación de CSS para que cubra las hojas que el sitio carga
- [x] 8.2 Actualizar `CLAUDE.md`: mapa de carpetas y el aviso sobre el CSS, con los tres modos de falla silenciosa
- [x] 8.3 Reescribir `docs/tecnico/convenciones-css.md` sobre las cuatro hojas vivas
- [x] 8.4 Actualizar el mapa de archivos, el índice técnico y la ubicación de los tokens en la documentación de marca
- [x] 8.5 Registrar en `docs/pendientes/accesibilidad.md` los defectos encontrados y su corrección, sin reescribir las notas fechadas anteriores
- [x] 8.6 Corregir el spec de tipografía del 404, que seguía nombrando la tipografía anterior al manual

## 9. Verificación final

- [x] 9.1 `html-validate`, `stylelint` sobre todas las hojas y `linkinator` en verde
- [x] 9.2 Las tres páginas sin errores de consola, sin elementos colapsados y sin desborde horizontal de 360 a 1920px
- [x] 9.3 Contraste WCAG AA en todos los pares de texto de las páginas migradas, medido sobre el color resuelto
- [x] 9.4 Orden de foco sin retrocesos en las tres páginas
- [x] 9.5 Visor de fotos, ficha de territorio y carretes funcionando después de la migración
- [x] 9.6 `graphify update .`
