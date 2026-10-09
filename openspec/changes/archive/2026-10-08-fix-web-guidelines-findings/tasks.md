## 1. Preparar el terreno

- [x] 1.1 Capturar la home completa en escritorio y teléfono como referencia, para comparar al final
- [x] 1.2 Buscar en `styles.css` y `script.js` selectores que dependan del orden del DOM de las secciones (hermano adyacente, `:nth-child`, `querySelectorAll` posicional) y anotar los que haya que ajustar

## 2. Orden de foco

- [x] 2.1 Reordenar las secciones de `index.html` para que el orden del documento sea el visual: inicio, marca, recorrido, historia, fragata, redes
- [x] 2.2 Retirar `order: 20` de `.fragata-section` y `order: 21` de `.redes-section`
- [x] 2.3 Ajustar los selectores que hayan quedado colgados del orden anterior
- [x] 2.4 Comparar capturas contra la referencia y confirmar que no cambió nada visualmente

## 3. Enlace de salto al contenido

- [x] 3.1 Agregar el enlace de salto como primer elemento enfocable en las tres páginas, apuntando al contenido principal
- [x] 3.2 Estilarlo para que esté oculto hasta recibir foco, y sea legible y bien contrastado cuando aparece
- [x] 3.3 Verificar que al activarlo el foco queda efectivamente en el contenido principal

## 4. Controles reales

- [x] 4.1 Convertir las ocho imágenes con `role="button"` en `<button>` con la imagen adentro, con nombre accesible que describa la acción y distinga cada foto
- [x] 4.2 Mover los handlers de `script.js` de la imagen al botón y eliminar el `keydown` manual de Enter y Espacio, que el botón ya resuelve
- [x] 4.3 Neutralizar los estilos nativos del botón para que la foto conserve tamaño, proporción y recorte
- [x] 4.4 Resolver el overlay del modal de lugares para que no sea un `div` con handler de click

## 5. Anuncio del visor

- [x] 5.1 Agregar al lightbox una región `aria-live="polite"` que diga qué foto es y cuántas hay
- [x] 5.2 Actualizarla al abrir y al navegar con las flechas
- [x] 5.3 Reservar el espacio de la imagen del lightbox para que no salte al cargar

## 6. Foco visible

- [x] 6.1 Dar indicador de foco propio a las dos reglas que hoy hacen `outline: none` dentro de `:focus-visible`, distinto del tratamiento de hover

## 7. Cromo nativo y toque

- [x] 7.1 Declarar `color-scheme` en el bloque `:root` base
- [x] 7.2 Extender `touch-action: manipulation` y el color de resaltado táctil a todos los controles interactivos con una regla común
- [x] 7.3 Contener el scroll de los diálogos para que no se encadene con el de la página

## 8. Movimiento y red

- [x] 8.1 Agregar al carrusel de la Fragata un control de pausa visible y alcanzable por teclado, que sólo aparezca cuando el ciclado está activo
- [x] 8.2 No inyectar el control cuando está activa la preferencia de movimiento reducido
- [x] 8.3 Agregar `preconnect` a los dominios de YouTube

## 9. Verificación

- [x] 9.1 Tabular las tres páginas de punta a punta y confirmar que el foco avanza siempre hacia abajo, sin saltos
- [x] 9.2 Confirmar que el primer Tab de cada página llega al enlace de salto y que funciona
- [x] 9.3 Comprobar que cada foto ampliable se anuncia como acción y se distingue de sus vecinas
- [x] 9.4 Verificar que el lightbox anuncia la foto al navegar
- [x] 9.5 Correr `html-validate`, `stylelint` y `linkinator`, y confirmar consola limpia en las tres páginas
- [x] 9.6 Comparar capturas finales contra la referencia, en escritorio y teléfono
- [x] 9.7 Verificar el control de pausa: pausa, reanuda, y no aparece con movimiento reducido

## 10. Cierre

- [x] 10.1 Actualizar `docs/pendientes/accesibilidad.md` con estos hallazgos y su resolución
- [x] 10.2 Ejecutar `graphify update .`
