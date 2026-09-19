## ADDED Requirements

### Requirement: El juego vive embebido en la sección del evento

El juego SHALL publicarse dentro de la sección `#luna-taruma` de `index.html`, sin crear rutas, páginas ni archivos HTML nuevos, y SHALL quedar encerrado entre las marcas `LUNA-TARUMA:INICIO/FIN` en cada archivo que lo contenga.

#### Scenario: No se agregan rutas al sitio

- **WHEN** se listan las páginas del sitio tras publicar el juego
- **THEN** siguen siendo `index.html`, `en-fotos/index.html` y `404.html`, sin rutas nuevas

#### Scenario: El juego se retira con el resto del bloque

- **WHEN** se ejecuta el procedimiento de baja del bloque Luna Tarumá
- **THEN** el juego se retira junto con él y no quedan reglas CSS, handlers de JS ni markup huérfanos

### Requirement: Recorrido de diez preguntas con corrección inmediata

El juego SHALL presentar diez preguntas de opción múltiple sobre la Luna, el río y la Selva Marginal, una por vez, y al responder SHALL marcar la opción elegida como correcta o incorrecta, revelar la correcta cuando el acierto falló, y mostrar un dato de contexto antes de habilitar el avance.

#### Scenario: Respuesta correcta

- **WHEN** la persona elige la opción correcta
- **THEN** esa opción se marca como acertada, el puntaje sube en uno y aparece el dato de contexto junto al botón de avanzar

#### Scenario: Respuesta incorrecta

- **WHEN** la persona elige una opción incorrecta
- **THEN** esa opción se marca como errada, se señala cuál era la correcta, el puntaje no cambia y aparece igualmente el dato de contexto

#### Scenario: No se puede responder dos veces

- **WHEN** la persona ya respondió una pregunta
- **THEN** las opciones quedan deshabilitadas y un segundo clic no altera el puntaje

#### Scenario: La última pregunta lleva al resultado

- **WHEN** la persona responde la décima pregunta y avanza
- **THEN** se muestra la pantalla de resultado en lugar de una pregunta nueva

### Requirement: La escena florece con el progreso

La escena SHALL representar el avance con un tarumá que abre una flor por cada acierto y una Luna que sube y se llena a medida que crece el puntaje, de modo que diez aciertos dejen el árbol florecido y la Luna llena.

#### Scenario: Cada acierto abre una flor

- **WHEN** la persona acumula N respuestas correctas
- **THEN** la escena muestra N flores abiertas y la Luna en la posición y fase correspondientes a N

#### Scenario: Diez de diez deja Luna llena

- **WHEN** la persona responde las diez preguntas correctamente
- **THEN** el árbol queda con sus diez flores y la Luna se ve llena, sin sombra sobre el disco

### Requirement: Resultado en cuatro niveles que invita a las noches

Al terminar, el juego SHALL mostrar un resultado acorde al puntaje en cuatro niveles (Semilla, Brote, En flor, Luna Tarumá), el puntaje obtenido sobre el total, y los datos de las dos noches del evento.

#### Scenario: El nivel corresponde al puntaje

- **WHEN** termina la partida
- **THEN** el título del resultado es el nivel que corresponde al puntaje obtenido y el texto acompaña con una invitación a las noches del evento

#### Scenario: Los datos del evento están en el resultado

- **WHEN** se lee la pantalla de resultado
- **THEN** figuran las dos fechas con su horario y fase lunar, el lugar y que la entrada es libre y gratuita

### Requirement: Compartir y volver a jugar

El juego SHALL ofrecer compartir el resultado y volver a jugar. Compartir SHALL usar la hoja nativa del sistema cuando está disponible y SHALL caer en copiar el texto al portapapeles cuando no lo está, informando a la persona que se copió.

#### Scenario: Compartir donde hay hoja nativa

- **WHEN** la persona toca compartir en un dispositivo que soporta la hoja nativa
- **THEN** se abre la hoja del sistema con el texto del resultado y el sitio del evento

#### Scenario: Compartir donde no hay hoja nativa

- **WHEN** la persona toca compartir en un navegador sin hoja nativa
- **THEN** el texto se copia al portapapeles y el botón informa que se copió

#### Scenario: Volver a jugar reinicia todo

- **WHEN** la persona elige volver a jugar
- **THEN** el puntaje vuelve a cero, la escena vuelve a su estado inicial sin flores y con la Luna baja, y se muestra la primera pregunta

### Requirement: Los datos del evento coinciden con el resto del sitio

Los datos del evento que aparezcan en el juego SHALL coincidir con los del bloque Luna Tarumá: fechas, horario, fase lunar, lugar y gratuidad.

#### Scenario: Horario consistente

- **WHEN** se comparan los horarios que muestra el juego con los de la agenda de la sección
- **THEN** son los mismos en las dos noches, sin discrepancias

### Requirement: El juego no contamina el alcance global de la página

Los estilos, los identificadores y las variables de JavaScript del juego SHALL quedar contenidos: los estilos SHALL aplicarse solo dentro del contenedor del juego y no SHALL alcanzar selectores de elemento globales ni los bloques `:root` del sitio; los `id` del documento y del SVG SHALL ser únicos en la página; y el JavaScript SHALL no agregar nombres nuevos al alcance global compartido de `script.js`.

#### Scenario: Ningún estilo se derrama fuera del juego

- **WHEN** el juego está publicado en la home
- **THEN** ninguna otra sección de la página cambia de aspecto respecto de antes de publicarlo

#### Scenario: La paleta no toca los bloques `:root`

- **WHEN** se inspecciona el CSS del juego
- **THEN** sus variables de color están declaradas en scope local, siguiendo el precedente del bloque del evento, y no redefinen variables existentes del sitio

#### Scenario: Identificadores únicos

- **WHEN** se valida el HTML de la página con el juego presente
- **THEN** no hay `id` duplicados, ni en el documento ni entre las definiciones del SVG

#### Scenario: Sin globales nuevos

- **WHEN** se inspecciona el alcance global tras cargar la página
- **THEN** el juego no agregó nombres al alcance global compartido por el resto de `script.js`

### Requirement: El juego es operable por teclado y anunciado a lectores de pantalla

El juego SHALL ser jugable de punta a punta con teclado, con foco visible en cada control, y los cambios de pantalla y de estado SHALL ser perceptibles para un lector de pantalla.

#### Scenario: Partida completa con teclado

- **WHEN** alguien juega usando solo teclado
- **THEN** puede empezar, elegir opción, leer el dato, avanzar, llegar al resultado y volver a jugar, con el foco siempre visible

#### Scenario: El cambio de pregunta se anuncia

- **WHEN** aparece una pregunta nueva o el resultado de la respuesta
- **THEN** un lector de pantalla lo anuncia sin que la persona tenga que buscarlo manualmente

#### Scenario: La escena no confunde al lector de pantalla

- **WHEN** un lector de pantalla recorre el juego
- **THEN** la escena decorativa no se lee elemento por elemento y el puntaje es comprensible como texto

### Requirement: La jerarquía de encabezados de la página se mantiene

Los encabezados del juego SHALL integrarse a la jerarquía de `index.html` sin saltos de nivel ni encabezados de nivel 1 adicionales.

#### Scenario: Sin salto de nivel ni `h1` extra

- **WHEN** se recorren los encabezados de `index.html` con el juego presente
- **THEN** la página conserva un solo `h1`, el juego aporta un `h3` como parte de la sección y sus encabezados internos descienden sin saltos

### Requirement: El juego respeta la preferencia de movimiento reducido

Con `prefers-reduced-motion: reduce` activo, el juego SHALL presentar los mismos estados sin animarlos.

#### Scenario: Movimiento reducido

- **WHEN** la persona tiene activada la preferencia de movimiento reducido
- **THEN** las flores, la Luna, la barra de progreso y el llamado a empezar aparecen en su estado final sin transición ni animación, y el juego sigue siendo jugable

### Requirement: El juego no agrega dependencias ni cargas de red nuevas

La integración SHALL mantener el stack estático sin build ni dependencias, SHALL no incorporar familias tipográficas adicionales a las que ya carga la página, y SHALL no sumar archivos a `assets/`.

#### Scenario: Sin tipografía nueva

- **WHEN** se inspeccionan las cargas de la home con el juego presente
- **THEN** no hay pedidos a familias tipográficas que la página no cargara antes

#### Scenario: Sin archivos nuevos de imagen

- **WHEN** se revisa `assets/` tras publicar el juego
- **THEN** no se agregaron archivos: la escena del juego es SVG en línea
