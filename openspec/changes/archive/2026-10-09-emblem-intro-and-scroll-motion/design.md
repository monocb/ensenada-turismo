## Context

El manual ya especifica la animación del emblema en cuatro tiempos; lo que falta es implementarla. Las restricciones no son de diseño sino del sitio:

- **`Content-Security-Policy: script-src 'self'`**. No hay scripts en línea, así que no se puede marcar el `<html>` antes del primer pintado. Cualquier decisión que dependa de JavaScript ocurre, como pronto, cuando corre `script.js` diferido — después de parsear el HTML y potencialmente después de un primer pintado.
- **Los SVG de marca son un único `<path>` relleno**, sin `stroke` y sin letras separadas. No hay trazo que dibujar con `stroke-dasharray` ni letras que escalonar.
- **Sin build y sin dependencias.** No hay librería de animación: es CSS y `requestAnimationFrame`.
- La portada ya tiene movimiento propio: ocho fotos que se alternan en un ciclo de 56 segundos. La entrada no puede pelearse con eso.

## Goals / Non-Goals

**Goals:**

- Que la marca entre como el manual dice que entra.
- Que el contenido esté siempre ahí: sin JavaScript, con JavaScript roto, con movimiento reducido, y para un rastreador que no ejecuta nada.
- Que el movimiento al scrollear sea un sistema con vocabulario, no un efecto repetido.

**Non-Goals:**

- Bajar la CSP para ganar milisegundos.
- Redibujar los SVG de marca para poder animarlos como trazo.
- Llevar la entrada de marca a `en-fotos/` y `404.html`.

## Decisions

### La entrada es CSS y se desmonta sola; el JavaScript sólo decide si corresponde

El modo de falla que importa evitar es la página en blanco. Si la entrada dependiera de JavaScript para irse, cualquier error la dejaría tapando el sitio para siempre.

Entonces la secuencia completa —revelado, espera, zoom, salida— es una animación CSS con `animation-fill-mode: forwards` que termina en invisible y sin capturar el puntero. **Sin JavaScript la entrada igual se muestra y se va sola.** El JavaScript aporta sólo dos cosas, las dos opcionales: saltarla si ya se vio en esta sesión, y bloquear el scroll mientras dura.

Alternativa descartada: montar la entrada desde JavaScript. Es la que más control da y la que peor falla.

### La entrada arranca transparente para que no parpadee en la segunda visita

Sin script en línea, en una visita repetida el navegador puede pintar la entrada antes de que `script.js` la saque. Para que eso no se vea, la animación **empieza en `opacity: 0`** y tarda unos 120 ms en hacerse visible. Un script diferido corre muy por debajo de ese umbral, así que la saca antes de que exista para el ojo.

Alternativa descartada: `'unsafe-inline'` o un hash en la CSP. Debilitar una cabecera de seguridad por un parpadeo de un cuadro no es un intercambio aceptable, y el repo tiene un spec que fija esas cabeceras.

### El trazo se consigue recortando, no dibujando

Con un `<path>` relleno no hay `stroke` que animar. El revelado se hace con `clip-path: polygon(...)` animado de izquierda a derecha, **con el borde inclinado** en vez de vertical: un corte recto se lee mecánico, uno inclinado se lee como la punta de un pincel.

La palabra se revela primero y la costa arranca antes de que la palabra termine, para que se lea como un solo gesto que "sigue de largo", que es literalmente lo que dice el manual.

Alternativa descartada: componer una máscara doble (`mask-image` del logo más un degradado, con `mask-composite`). Daría un borde suave en vez de inclinado, pero el elemento ya usa `mask` para su forma y la composición de máscaras suma riesgo de compatibilidad para una diferencia que a esa velocidad casi no se percibe.

### El zoom entrega el logotipo al encabezado

El emblema escala y se desvanece; debajo, la portada aparece desde un estado levemente ampliado que se asienta. Las dos cosas a la vez producen la sensación de atravesar el logo en vez de verlo irse.

Por eso **el emblema grande sale de la portada**: si después del zoom el mismo logo sigue ahí en el centro, el gesto de atravesarlo no significa nada. El logotipo aterriza donde ya vive, en el encabezado.

Eso deja la portada sin su `<h1>` visible. El `<h1>` se mantiene con el nombre de la marca accesible sólo para lectores de pantalla y buscadores, igual que hacía el emblema, y la frase pasa a ser lo primero que se lee.

Riesgo asumido: escalar un elemento pintado con `mask` puede rasterizar borroso a mitad de la animación. Se mitiga desvaneciéndolo antes de que la escala llegue a un punto donde se note, y se verifica mirando el cuadro intermedio, no asumiéndolo.

### La invitación a scrollear es la ola, y es movimiento, no flecha

De los catorce íconos de pincel del manual, la home ya usa once. Quedan `i-ola`, `i-pez`, `i-llama` y `i-caleta`. La ola es la que el manual empareja explícitamente con el celeste en su sección de patrones ("Ondas del río") y la única que comunica dirección sin ser un símbolo de interfaz: el agua que baja ya dice "seguí".

Una flecha o un glifo de mouse habrían funcionado, pero son vocabulario de interfaz genérico en una página cuyo principio es que todo trazo sea de pincel.

### Las entradas al scrollear se declaran en el HTML, no se reparten por índice

Hoy `script.js` le pone a cada elemento observado el mismo reveal y un retardo calculado por su posición en la lista. Eso produce el reflejo uniforme.

Pasa a leerse del marcado: cada elemento declara con qué entra, y el escalonado se calcula dentro de su grupo, no sobre una lista global. Así una grilla de cuatro tiles escalona sus cuatro tiles, y un territorio a pantalla completa entra de una pieza con su foto y su texto enfrentados.

El vocabulario es corto a propósito —izquierda, derecha, abajo, escala— porque un vocabulario largo vuelve a ser decoración.

### Las entradas mejoran algo que ya se ve

El contenido es visible por defecto. La entrada sólo se aplica cuando hay JavaScript y el movimiento está permitido, y la clase que la dispara se agrega al observar. Si el observador no existe, si la pestaña está oculta o si el render no ejecuta nada, el contenido está igual.

Esto no es teórico: es el modo en que una página con reveals se publica en blanco.

## Risks / Trade-offs

- **La entrada tapa el sitio si algo falla** → se va sola por CSS; no depende de JavaScript para desmontarse. Se verifica con el JavaScript deshabilitado.
- **Parpadeo de la entrada en la segunda visita** → arranca transparente y tarda más en hacerse visible que lo que tarda el script diferido en sacarla. Se verifica midiendo, no suponiendo.
- **El zoom puede verse borroso al escalar una máscara** → se desvanece antes del punto donde se notaría; se revisa el cuadro intermedio.
- **Perder el emblema de la portada debilita la marca en la primera pantalla** → el logotipo queda en el encabezado, visible en todo momento y en las tres páginas, y la entrada completa es un momento de marca más fuerte que un logo quieto. Es una decisión de composición reversible en una línea.
- **El movimiento automático de la entrada no se puede pausar** → dura poco más de dos segundos, se muestra una vez por sesión y no se muestra con movimiento reducido. Queda por debajo del umbral de cinco segundos de WCAG 2.2.2.
- **Más movimiento es más riesgo de marear** → todas las entradas tienen su alternativa con `prefers-reduced-motion`, y ninguna anima propiedades de maquetado.

## Migration Plan

Nada que migrar: es marcado, estilos y comportamiento. Volver atrás es sacar el bloque de la entrada y devolver el emblema y el botón a la portada.

## Open Questions

- ¿El emblema de la portada se da por retirado, o se quiere una versión chica en algún otro punto de la página?
