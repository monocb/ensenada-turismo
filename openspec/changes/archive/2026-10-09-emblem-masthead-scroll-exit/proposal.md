## Why

La portada abre hoy con una **pantalla de carga**: una capa que tapa el sitio, pinta el emblema y se va sola a los pocos segundos. Arrastra todos los problemas de ese formato, y los fuimos descubriendo de a uno.

Primero, que el gesto pasaba demasiado rápido para mirarlo. Después, que al hacerlo más lento la espera se volvía larga —cerca de seis segundos— y encima cruzaba el umbral de WCAG 2.2.2, que obliga a agregar un control para saltearla. Y en el medio, el problema de fondo: **cuando alguien mira una pantalla de carga está tratando de llegar a otro lado**. No importa a qué velocidad la pongas; la atención está en otra parte. La animación compite con el apuro de quien entra, y el apuro gana siempre.

Hay una salida que no es ninguna de las dos: que el emblema **no tape nada**. Que sea la primera pantalla de la página, que se pinte ahí mientras alguien la mira si quiere mirarla, y que se vaya cuando esa persona decida seguir, con el scroll.

Eso le devuelve el control del ritmo a quien visita. Un cierre manejado con el scroll **no puede ir ni muy rápido ni muy lento**: va exactamente a la velocidad a la que esa persona está bajando.

## What Changes

**El emblema deja de ser una capa y pasa a ser la primera pantalla**

- Se retira la pantalla de carga: la capa que tapaba el sitio, el recuerdo de si ya se vio en esta sesión, la contención del scroll mientras duraba y el respaldo por tiempo.
- En su lugar, la portada arranca con una pantalla del emblema sobre el fondo institucional. Es contenido de la página, no una capa encima: quien llega ya está en el sitio y puede bajar cuando quiera.
- El emblema se pinta solo al llegar, con la pincelada letra por letra, al ritmo más pausado que ya habíamos acordado.

**El cierre lo maneja el scroll**

- Al bajar, el emblema crece hacia el espectador y se desvanece, descubriendo debajo la portada con sus fotos.
- El avance del movimiento **sigue al scroll**: no es una animación que se dispara y corre sola, es el recorrido de quien baja. Si frena, el movimiento frena; si vuelve a subir, vuelve.
- El lettering chico del encabezado aparece cuando el grande se va: el logotipo no se duplica en pantalla, se pasa de uno al otro.

**Lo que esto saca de encima**

- No hay espera antes de ver el sitio, así que no hace falta un control para saltearla.
- No hay movimiento automático de más de cinco segundos, así que no aplica el requisito de WCAG 2.2.2 que nos obligaba a ese control.
- No hay que decidir cada cuánto se muestra: es parte de la página y está siempre.

## Capabilities

### Modified Capabilities

- `emblem-intro-animation`: la capacidad está escrita sobre una pantalla de carga que se muestra una vez por sesión, contiene el scroll y se desmonta sola. Pasa a describir un emblema que es parte de la página y que se va con el scroll. Cambian casi todos sus requisitos y se retiran los que sólo existían por ser una capa.
- `brand-identity-system`: el requisito del trazo de costa pide respetar la secuencia del manual. Suma que el gesto sea el de una mano que escribe y no el de una cortina que destapa, que es la diferencia entre cumplir la letra del manual y cumplir su intención.
- `scroll-motion-system`: el vocabulario de entradas al scrollear cubre cosas que **entran** al aparecer. Suma el caso contrario, un elemento que **se va** al avanzar el scroll, con la misma exigencia de siempre: que el contenido se vea sin JavaScript y sin movimiento.

## Impact

**Código afectado**

- `index.html` — la capa de la entrada se reemplaza por la pantalla del emblema con el lettering de la demo; se retira el sprite incrustado que queda sin uso.
- `assets/css/home.css` — la pincelada y su ritmo, la pantalla del emblema, el cierre, y la baja de todo lo que era la capa.
- `assets/css/base.css` — la aparición del lettering del encabezado cuando el emblema se va.
- `script.js` — se retira `setupIntro()` entero y se agrega el seguimiento del scroll para el cierre.

**La restricción que condiciona el porte de la demo**

La demo declara los tiempos de sus dieciséis pinceladas con **atributos `style` en línea**. La `Content-Security-Policy` del sitio es `style-src 'self'` sin `'unsafe-inline'`: el navegador los va a ignorar, y el resultado no sería una animación distinta sino **ninguna animación** — el emblema entero apareciendo de golpe. Los tiempos tienen que mudarse a reglas de CSS.

**Riesgo principal**

Un elemento que se va con el scroll puede dejar la página en un estado raro: tapando el contenido si el seguimiento no corre, o desapareciendo antes de tiempo. El criterio de aceptación es que **bajar siempre funcione**, con JavaScript, sin JavaScript, y con movimiento reducido; en el peor caso el emblema se va de pantalla como se iría cualquier sección, scrolleando.

**Fuera de alcance, a propósito**

- El dibujo, el orden y la dirección de los trazos: la demo es la referencia aprobada.
- El encabezado, el pie y el 404, que siguen con su logotipo como máscara y no se animan.
