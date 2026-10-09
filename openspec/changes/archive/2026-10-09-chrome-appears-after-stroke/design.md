## Context

La pantalla del emblema ya existe y se pinta sola; el cierre lo maneja el scroll. Falta que lo que rodea al emblema respete ese mismo tiempo en vez de estar desde el primer cuadro.

Lo que condiciona la solución:

- La entrada tiene que funcionar **sin JavaScript**: va en CSS.
- La navegación del encabezado vive en la capa compartida con `en-fotos/` y `404.html`, que no tienen emblema.
- En anchos de teléfono la navegación está oculta detrás del botón del menú.
- El trazo de la costa termina a 3988 ms.

## Goals / Non-Goals

**Goals:**

- Que el emblema se escriba sin competencia visual y que lo demás entre después.
- Que la pantalla del emblema diga cómo seguir.
- Que esconder la navegación no deje a nadie trabado.

**Non-Goals:**

- Tocar `en-fotos/` ni `404.html`.
- Cambiar el dibujo del emblema ni su cierre.

## Decisions

### La espera es CSS, con el reloj del propio emblema

La entrada es una animación con retardo, igual que las pinceladas: arranca cuando la hoja aplica, que es el mismo reloj con el que se pinta el emblema. Así el "un segundo después de la costa" se mantiene aunque la página tarde en cargar — se corre todo junto.

El valor sale de la cuenta: la costa termina a 3988 ms, la entrada arranca a 4988 ms.

### Escalonada de izquierda a derecha, no todos juntos

Seis enlaces apareciendo al mismo tiempo son un cambio de estado; apareciendo uno tras otro son un gesto. Cada enlace declara su orden y el retardo sale de ese número, setenta milisegundos por paso, con la curva de salida del sistema y un desplazamiento corto hacia arriba.

El orden es el de lectura y atraviesa las dos navegaciones del encabezado partido: los tres de la izquierda primero, después los tres de la derecha.

### La regla vive en la hoja de la portada

La navegación se declara en la capa compartida, pero esta espera es propia de la portada: las otras dos páginas tienen que mostrarla al instante. Como `home.css` lo carga solamente la portada y se aplica después de la capa compartida, alcanza con escribir la regla ahí. No hace falta ningún selector condicional.

### Tres excepciones, y las tres son obligatorias

Esconder la navegación tiene costo. Lo que lo vuelve aceptable:

- **El foco la trae en el acto.** Un enlace con opacidad cero sigue siendo enfocable: quien navega con teclado estaría tabulando sobre algo que no ve. Si el foco entra al encabezado, la animación se cancela.
- **En teléfono no espera.** Ahí la navegación está oculta detrás del botón; dejarla en opacidad cero significaría abrir el menú y encontrarlo vacío. Ya nos pasó una vez. La espera se declara sólo arriba del ancho donde el menú se despliega.
- **Con movimiento reducido no hay espera.** Todo visible desde el principio.

El puntero sobre el encabezado **no** la adelanta: el mouse suele quedar apoyado arriba al cargar y anularía el efecto casi siempre. El teclado sí, porque ahí la intención es inequívoca.

### La invitación se parte en dos elementos

Necesita dos cosas a la vez: entrar animada y apagarse con el scroll. Una animación con relleno le gana a la opacidad que el JavaScript escribe, así que no pueden convivir en el mismo elemento.

El de afuera lleva la opacidad que maneja el scroll; el de adentro, la animación de entrada. Y esa animación rellena **hacia atrás** y no hacia adelante: terminada la entrada, el elemento vuelve a su opacidad propia, que es la que el scroll controla. Con relleno hacia adelante quedaría clavada en uno y el scroll no podría apagarla.

### La pantalla del emblema declara sus dos filas

Con filas automáticas las dos se estiran a media pantalla cada una y el emblema termina en el tercio de arriba. Declarando una fila elástica y una ajustada, el emblema se centra en el espacio libre y la invitación queda abajo, que es hacia donde invita.

## Risks / Trade-offs

- **Cinco segundos sin navegación visible** → es el costo del gesto. Lo acotan las tres excepciones, y cada una es criterio de aceptación.
- **La invitación quedaría pegada después de que el emblema se fue** → se apaga con el scroll, más rápido que el emblema: ya cumplió apenas empezás a bajar.
- **La portada de fotos queda con la frase sola** → es lo pedido: la invitación no tiene sentido en la pantalla a la que se llega bajando.

## Migration Plan

Nada que migrar.

## Open Questions

- Ninguna.
