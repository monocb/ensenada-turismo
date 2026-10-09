## 1. La invitación cambia de pantalla

- [x] 1.1 Sacar la ola y "Seguí el río" de la portada de fotos
- [x] 1.2 Ponerlas en la pantalla del emblema, debajo del trazo
- [x] 1.3 Partirlas en dos elementos: el de afuera para la opacidad que maneja el scroll, el de adentro para la entrada animada
- [x] 1.4 Apagarlas con el scroll, más rápido que el emblema

## 2. La entrada de la navegación

- [x] 2.1 Declarar la espera en la hoja de la portada, que es la única que la necesita
- [x] 2.2 Arrancar un segundo después de que la costa termina de trazarse
- [x] 2.3 Entrar escalonados de izquierda a derecha, con la curva del sistema y un desplazamiento corto
- [x] 2.4 Usar relleno hacia atrás y no hacia adelante, para que al terminar cada elemento vuelva a su opacidad propia

## 3. Las tres excepciones

- [x] 3.1 Si el foco entra al encabezado, la navegación aparece en el acto
- [x] 3.2 En anchos de teléfono no hay espera: la navegación vive detrás del botón del menú
- [x] 3.3 Con movimiento reducido no hay espera

## 4. La composición de la pantalla del emblema

- [x] 4.1 Declarar las dos filas en vez de dejarlas automáticas, para que el emblema se centre y la invitación quede abajo

## 5. Verificación

- [x] 5.1 Nada aparece antes de que el trazo termine, medido en el navegador
- [x] 5.2 Los seis enlaces entran escalonados y no todos juntos, verificando los retardos declarados
- [x] 5.3 El foco en el encabezado trae la navegación en el acto
- [x] 5.4 En teléfono, abrir el menú antes de la aparición muestra los seis enlaces
- [x] 5.5 Con movimiento reducido todo está desde el primer momento
- [x] 5.6 La invitación se apaga al bajar y no queda colgada
- [x] 5.7 El emblema queda centrado y la invitación abajo
- [x] 5.8 El resto del emblema sigue intacto: sin huecos, una máscara por letra, los tiempos aplicados
- [x] 5.9 `html-validate`, `stylelint` y `linkinator` en verde; consola limpia; sin desborde
- [x] 5.10 Bajar llega al contenido con JavaScript, sin JavaScript y con movimiento reducido
- [x] 5.11 `graphify update .`
