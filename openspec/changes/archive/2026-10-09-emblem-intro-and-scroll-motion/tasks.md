## 1. Entrada del emblema

- [x] 1.1 Agregar el bloque de la entrada a `index.html`, decorativo para tecnologías de asistencia y con el contenido de la página presente debajo desde el primer momento
- [x] 1.2 Animar el revelado de la palabra de izquierda a derecha con el borde inclinado, y el de la costa arrancando antes de que la palabra termine
- [x] 1.3 Encadenar el zoom de salida y la aparición de la portada desde un estado levemente ampliado
- [x] 1.4 Hacer que la entrada arranque transparente, para que una visita repetida no alcance a verla antes de que el script la saque
- [x] 1.5 Hacer que la entrada se desmonte sola por CSS, terminando invisible y sin capturar el puntero
- [x] 1.6 Saltar la entrada si ya se vio en esta sesión, guardándolo en el navegador con tolerancia a que el almacenamiento falle
- [x] 1.7 No mostrar la entrada con movimiento reducido
- [x] 1.8 Contener el scroll mientras dura la entrada y devolverlo al terminar

## 2. Portada

- [x] 2.1 Retirar el emblema grande de la portada, conservando el `<h1>` con el nombre de la marca para lectores de pantalla y buscadores
- [x] 2.2 Bajar la frase y pasarla a ser lo primero que se lee sobre las fotos
- [x] 2.3 Retirar el botón "Conocé los tres territorios"
- [x] 2.4 Agregar la invitación a seguir con el ícono `i-ola`, con deriva vertical lenta y su alternativa sin movimiento

## 3. Sistema de entradas al scrollear

- [x] 3.1 Definir el vocabulario de entradas en la capa compartida: izquierda, derecha, abajo y escala, cada una animando sólo transformación y opacidad
- [x] 3.2 Leer la entrada declarada en el marcado en vez de aplicar la misma a todo lo observado
- [x] 3.3 Calcular el escalonado dentro del grupo de hermanos, no sobre la lista global de observados
- [x] 3.4 Asignar a cada sección de la home la entrada que corresponde a su composición
- [x] 3.5 Mantener el contenido visible por defecto: la entrada sólo se aplica con JavaScript y con movimiento permitido
- [x] 3.6 Dar alternativa sin movimiento a cada entrada

## 4. Verificación

- [x] 4.1 La entrada se desmonta sola con JavaScript deshabilitado y deja la portada usable
- [x] 4.2 Una segunda carga en la misma sesión no muestra ni un destello de la entrada, medido y no supuesto
- [x] 4.3 Con movimiento reducido no hay entrada ni desplazamientos, y nada queda oculto
- [x] 4.4 Revisar el cuadro intermedio del zoom para descartar que la máscara se vea borrosa
- [x] 4.5 Contraste de la frase y de la invitación sobre las ocho fotos del ciclo, medido sobre píxeles reales
- [x] 4.5.1 Recalibrar el velo de la portada para la composición nueva: estaba graduado para el texto en el centro y con el texto abajo la frase daba 2.51:1 y la ola 2.65:1, las dos por debajo del mínimo
- [x] 4.5.2 Recortar las secciones con entradas laterales: los elementos que esperan corridos 52px agregaban 18px de scroll horizontal a toda la página
- [x] 4.6 Ninguna entrada anima propiedades de maquetado
- [x] 4.7 `html-validate`, `stylelint` y `linkinator` en verde; consola limpia; sin desborde horizontal de 360 a 1920px
- [x] 4.8 Orden de foco sin retrocesos y el resto de la página funcionando
- [x] 4.9 `graphify update .`
