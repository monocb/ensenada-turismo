## Why

El emblema ya se pinta como primera pantalla, pero todo lo demás está ahí desde el primer instante: la navegación del encabezado y la invitación a bajar compiten con el gesto mientras el pincel todavía está escribiendo.

Y la invitación está en el lugar equivocado. Vive encima de las fotos, en la segunda pantalla, donde ya no hace falta: quien llegó hasta ahí **ya bajó**. La pantalla que necesita decir "seguí" es la del emblema, que hoy no dice nada.

## What Changes

**La navegación y la invitación entran cuando el emblema termina**

- Los seis enlaces del encabezado de la portada entran **un segundo después de que la línea de costa queda trazada**, escalonados de izquierda a derecha con la curva del sistema. Primero se escribe la marca, después aparece el resto.
- La invitación a seguir bajando —la ola y "Seguí el río"— **se muda de las fotos a la pantalla del emblema** y entra en ese mismo momento.
- Se retira de la portada de fotos, donde quedaba la frase sola.

**Lo que no se negocia**

- Si el foco entra al encabezado antes de tiempo, la navegación aparece en el acto: un enlace invisible pero enfocable es una trampa.
- En anchos de teléfono la navegación no espera, porque vive escondida detrás del botón del menú: dejarla esperando significaría abrir el menú y no ver nada.
- Con movimiento reducido no hay espera: todo está desde el primer momento.

## Capabilities

### Modified Capabilities

- `consistent-site-chrome`: la capacidad da por sentado que la navegación del encabezado está disponible apenas carga la página. Pasa a admitir que en la portada entre después del emblema, con dos condiciones que la hacen aceptable: que el foco la traiga en el acto y que en teléfono no espere.
- `emblem-intro-animation`: suma que la pantalla del emblema invite a seguir bajando, y que esa invitación y la navegación entren juntas cuando el trazo termina.
- `home-cta-visual-treatment`: el requisito de legibilidad sobre las fotos habla de "la frase y la invitación". La invitación deja de estar sobre las fotos, así que el requisito pasa a cubrir lo que realmente queda ahí.

## Impact

**Código afectado**

- `index.html` — la invitación se muda de la portada a la pantalla del emblema, partida en dos elementos.
- `assets/css/home.css` — la aparición escalonada, los estilos de la invitación en su lugar nuevo, y la composición de la pantalla del emblema.
- `script.js` — la invitación se apaga con el scroll, como el emblema.

**Un detalle que obliga a partir la invitación en dos**

Una animación con relleno le gana a la opacidad que el JavaScript escribe. Como la invitación necesita las dos cosas —una entrada animada y un apagado manejado por el scroll— cada una va en su elemento: el de afuera lo maneja el scroll, el de adentro hace la entrada.

**Riesgo principal**

Esconder la navegación cinco segundos es un costo real de usabilidad, no un efecto gratis. Se acota con las tres excepciones de arriba, y el criterio de aceptación es que ninguna de ellas falle.

**Fuera de alcance, a propósito**

- Que el puntero sobre el encabezado adelante la aparición. El mouse suele quedar apoyado arriba al cargar, así que anularía el efecto casi siempre; el teclado sí la adelanta, porque ahí la intención es inequívoca.
