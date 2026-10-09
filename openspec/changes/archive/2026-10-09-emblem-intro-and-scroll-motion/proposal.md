## Why

El Manual de Identidad v3.0 dedica una sección entera, **I — Animación del emblema**, a cómo tiene que entrar la marca en movimiento: *"La misma mano escribe «Ensenada» y, sin levantar el pincel, dibuja la costa de la ensenada"*, en cuatro tiempos — 01 empieza el trazo, 02 se completa la palabra, 03 el trazo sigue de largo, 04 dibuja la costa. El sitio aplicó la paleta, la tipografía y el logotipo del manual, pero **esa animación nunca se implementó**: el emblema aparece quieto.

Y el movimiento que sí tiene la home es un solo gesto repetido: cada sección entra con el mismo desvanecido de 22 píxeles hacia arriba. Un reveal idéntico para seis secciones distintas no es un sistema de movimiento, es un reflejo. No distingue una grilla de cuatro tiles de una superficie bañada a pantalla completa.

El dueño pidió que la entrada se vea "digna de una página premium" y que al scrollear las cosas aparezcan con movimientos fluidos y desde distintos lados.

## What Changes

**Entrada del emblema**

- La home abre con el emblema solo sobre el fondo azul de marca: se revela la palabra de izquierda a derecha y el trazo sigue de largo dibujando la línea de costa amarilla, siguiendo los cuatro tiempos del manual.
- Terminado el trazo, el emblema escala hacia el espectador y se desvanece: la sensación es entrar a través del logo. Debajo queda la portada con sus fotos, el encabezado con el lettering ya en su lugar y las dos navegaciones.
- La entrada se ve **una vez por sesión**. Quien vuelve o navega entre páginas entra directo.
- La entrada es **CSS, no JavaScript**: se desmonta sola aunque el JavaScript no corra. El JavaScript sólo decide si corresponde mostrarla.

**Portada**

- El emblema grande deja la portada: el logotipo pasa a vivir en el encabezado, que es donde aterriza después del zoom. Repetirlo en el centro le quitaría sentido al gesto de atravesarlo.
- La frase "Tiene algo que solo tiene Ensenada." baja respecto de su posición actual y pasa a ser lo primero que se lee sobre las fotos.
- Se retira el botón "Conocé los tres territorios".
- En su lugar entra una invitación a seguir bajando construida con la **ola del río** (`i-ola`), el único motivo de agua que el manual define y que la home todavía no usaba. El manual lo empareja con el celeste en su sección de patrones. La ola deriva despacio hacia abajo: el movimiento del agua es la invitación, sin flecha genérica.

**Sistema de movimiento al scrollear**

- El reveal único se reemplaza por un sistema de entradas declaradas por elemento: desde la izquierda, desde la derecha, desde abajo o por escala, con retardos escalonados dentro de un mismo grupo.
- Cada sección recibe la entrada que le corresponde a su composición, no la misma para todas: los tiles del bento entran escalonados, cada territorio entra con su foto y su texto desde lados opuestos, la historia y el video entran enfrentados, la fragata por escala lenta.
- Todo el contenido SHALL seguir siendo visible sin JavaScript y sin animación: las entradas mejoran un estado ya visible, nunca lo condicionan.

## Capabilities

### New Capabilities

- `emblem-intro-animation`: la entrada de la marca en la portada, su secuencia, su frecuencia y su comportamiento cuando no hay JavaScript o la persona pidió movimiento reducido.
- `scroll-motion-system`: cómo entra el contenido al scrollear — entradas declaradas por elemento, variadas según lo que revelan, y siempre sobre contenido que ya es visible.

### Modified Capabilities

- `brand-identity-system`: el requisito del trazo de costa pedía que acompañara al lettering y que, al animarse, respetara la secuencia del manual. Pasa a exigir que esa animación exista en la portada, no sólo que la respete si existe.
- `home-cta-visual-treatment`: el requisito describe `.social-strip`, una franja de redes debajo del hero que el rediseño de marca ya había retirado y que hoy no existe en el sitio. Se reformula sobre lo que sí existe: cómo la portada invita a seguir, con qué legibilidad sobre las ocho fotos que se van alternando de fondo.

## Impact

**Código afectado**

- `index.html` — bloque de la entrada, portada sin emblema ni botón, invitación con la ola, atributos de entrada en los elementos que se revelan.
- `assets/css/base.css` — el sistema de entradas al scrollear, que es compartido.
- `assets/css/home.css` — la entrada del emblema y la portada nueva.
- `script.js` — decidir si la entrada corresponde, bloquear el scroll mientras dura, y aplicar las entradas declaradas al observar cada elemento.

**Restricciones que condicionan el diseño**

- La `Content-Security-Policy` del sitio es `script-src 'self'`: **no hay scripts en línea**. No se puede marcar el documento antes del primer pintado, así que la entrada arranca transparente y se vuelve visible recién después del umbral en que el JavaScript diferido ya decidió. Bajar la CSP para ganar unos milisegundos no es un intercambio aceptable.
- Los tres SVG de marca son **un único `<path>` relleno, sin `stroke` y sin letras separadas**. La técnica habitual de dibujar un trazo (`stroke-dasharray`) no aplica, y no existen trazos por letra para escalonar. El trazo se consigue con un revelado progresivo de izquierda a derecha con el borde inclinado, que es lo que el manual describe como secuencia y lo que el ojo lee como una mano escribiendo.

**Riesgo principal**

Una animación de entrada puede dejar la página en blanco si algo falla. El criterio de aceptación es que el contenido esté siempre presente y alcanzable: sin JavaScript, con JavaScript roto, con movimiento reducido activado y para un rastreador que no ejecuta nada.

**Fuera de alcance, a propósito**

- El encabezado, que no cambia.
- `en-fotos/` y `404.html`, que no llevan entrada de marca. El sistema de entradas al scrollear sí queda disponible para ellas por vivir en la capa compartida.
