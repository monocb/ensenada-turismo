## Context

El sitio tiene tres páginas y un solo `script.js`. Después del rediseño de la portada tenía **dos sistemas de CSS**: la portada sobre `assets/css/home.css` (1332 líneas, escrita de cero, sin `!important`) y las otras dos sobre `styles.css` (6827 líneas, cuatro bloques `:root`, llena de `!important`). El encabezado existía duplicado y distinto en los dos.

La restricción de fondo es la del repo: HTML/CSS/JS estático plano, sin build, sin dependencias, sin `package.json`. No hay preprocesador ni bundler: no hay forma de compartir código entre hojas más allá de que el navegador cargue más de un `<link>`.

Y una restricción de verificación: no hay tests de regresión visual. Todo lo que se afirme acá tiene que poder medirse en un navegador real.

## Goals / Non-Goals

**Goals:**

- Que el encabezado y el pie existan **una sola vez** y las tres páginas los compartan, para que un arreglo valga para las tres.
- Que los tokens del manual se declaren una sola vez.
- Que los cuatro defectos del encabezado queden corregidos y, sobre todo, que la clase de error que los produjo quede documentada: son fallas silenciosas que ningún linter ve.
- Que las tres páginas se vean como el mismo sitio.

**Non-Goals:**

- Borrar `styles.css`. Es una decisión del dueño después de revisar.
- Rediseñar el contenido editorial de la página de fotos.
- Agregar un preprocesador o cualquier forma de build para evitar la duplicación. Se resuelve con un `<link>` más.

## Decisions

### Capa compartida en un archivo aparte, no `@import` ni duplicación

Tres opciones: duplicar el encabezado en cada hoja; importarlo con `@import` desde cada hoja de página; o cargar dos `<link>`.

`@import` queda descartado porque encadena las descargas: el navegador descubre la segunda hoja recién después de descargar y parsear la primera. Duplicar queda descartado porque es exactamente el problema que se está resolviendo. Dos `<link>` cuesta una petición más, que sobre HTTP/2 se sirve en paralelo, y mantiene cada hoja legible por separado.

### El CSS se adapta a los nombres de clase del JS, no al revés

Dos de los cuatro defectos del encabezado son el mismo error: el CSS esperaba `is-abierto` / `is-compacto` y `script.js` escribe `is-open` / `is-scrolled`. Se podría haber cambiado el JS, pero el JS es **uno solo para las tres páginas** y esos nombres ya los usaba la hoja histórica. Cambiarlos habría roto lo que todavía funcionaba.

La regla que queda: **el JS es la fuente de verdad de los nombres de estado**. Está escrita en `docs/tecnico/convenciones-css.md` y en `CLAUDE.md`, porque es un error que no deja rastro — ni error de consola, ni hallazgo de `stylelint`, ni de `html-validate`. La hoja simplemente no se aplica.

### El menú de teléfono se engancha al encabezado, no a una navegación

El encabezado partido tiene **dos** `<nav>`, uno a cada lado del lettering. `script.js` marca `is-open` en el `<nav>` con `[data-menu]` y también en el encabezado. Enganchar el panel abierto al `<nav>` mostraba sólo tres de los seis enlaces.

Se engancha a `.enc.is-open` y las dos navegaciones se ubican por `grid-template-areas`. Alternativa descartada: juntar los seis enlaces en un solo `<nav>` y partirlo con CSS, que habría roto el orden de foco — el lettering quedaría antes o después de todo el bloque, no en el medio como se lee.

El mismo razonamiento vale para el cierre del menú: los enlaces que lo cierran pasan de ser los del `<nav>` con `[data-menu]` a ser **todos los del encabezado**. Si no, los tres de la derecha navegaban dejando el menú abierto y el `body` bloqueado.

### El `<span>` con máscara necesita `display: block` explícito

El lettering se pinta como `mask-image` sobre un `<span>` vacío, para no incrustar 17 KB de SVG en cada página. Un `<span>` es `inline`, y en `inline` ni `width` ni `aspect-ratio` aplican: la caja colapsa a 0×0 **sin ningún error**.

El lettering de la portada y el del pie funcionaban de casualidad, porque son hijos de un contenedor grid y el navegador los blockifica. El del encabezado cuelga de un `<a>` en bloque y por eso no.

Queda como regla escrita, y el 404 la aplica explícitamente en su propio lettering.

### La calesita rota tarjetas en vez de duplicarlas

Para que un carrete gire sin fin hay dos caminos: duplicar el contenido y animar un `transform`, o mover tarjetas de punta a punta.

Duplicar es lo habitual, pero acá cada tarjeta es un `<button>` que abre el visor: duplicarlas pone el doble de botones en el orden de tabulación, el doble de fotos en la galería del visor, y obliga a marcar los clones `aria-hidden` — que un mouse igual puede clickear. Se descartó.

Se mueve la primera tarjeta al final cuando termina de salir por la izquierda, descontando su ancho del scroll. El salto es invisible, sigue habiendo **una sola copia de cada foto**, y ni el visor ni el teclado ven doble. La flecha de atrás hace lo simétrico, así el carrete gira para los dos lados.

### El avance se lleva en un acumulador propio, no en `scrollLeft`

A 24 píxeles por segundo y 60 cuadros por segundo toca mover 0,4 px por cuadro. `scrollLeft` redondea a píxel entero: `scrollLeft += 0.4` lee 0, escribe 0,4 y vuelve a quedar en 0. El carrete no se movía nada, sin error.

La posición se lleva en una variable de punto flotante y se escribe en `scrollLeft` cada cuadro. Mientras el carrete está frenado, la variable se resincroniza desde `scrollLeft`, así el avance retoma desde donde lo dejaron las flechas, el dedo o un scroll manual.

### Un solo bucle de animación para los tres carretes

Tres `requestAnimationFrame` independientes harían tres veces el mismo trabajo de agenda. Hay un bucle que recorre los carretes registrados y cada uno decide si le toca moverse: no se mueve si está frenado, si las fotos entran todas en pantalla, o si el carrete no está a la vista. Con movimiento reducido el bucle no arranca.

## Risks / Trade-offs

- **Partir una hoja de 1332 líneas puede perder reglas en silencio** → el criterio de aceptación no es leerla: se extrae el conjunto de selectores de la hoja original y el de las dos resultantes, y se comparan. La única diferencia admitida son los selectores que se reemplazan a propósito.
- **El encabezado pasa a ser un punto único de falla para las tres páginas** → es el objetivo, pero sube el costo de un error. Se mitiga midiendo el encabezado en las tres páginas y en todo el rango de anchos, no sólo en la portada: los cuatro defectos de este cambio aparecieron justamente por no haberlo hecho antes.
- **Ocultar la barra de scroll saca una pista de que el carrete se puede correr** → quedan las flechas, visibles y con área táctil de 52 px, además del arrastre y el deslizamiento; y el movimiento propio del carrete ya comunica que hay más fotos.
- **Mover tarjetas en el DOM mientras algo adentro tiene el foco lo haría saltar** → el carrete se frena cuando hay foco adentro, así que no rota mientras alguien lo recorre con el teclado.
- **El avance automático es movimiento no solicitado** → con `prefers-reduced-motion` no arranca, y se frena con el mouse, con el dedo y con el foco. Aun así WCAG 2.2.2 pide un mecanismo explícito de pausa: queda señalado como pendiente, no resuelto.
- **`styles.css` queda en el repo sin que nadie lo cargue** → es deliberado y está documentado en tres lugares. El riesgo real es que alguien lo parchee creyendo que está vivo; por eso `CLAUDE.md` lo dice en la primera línea de su sección de CSS.

## Migration Plan

Las cuatro hojas nuevas conviven con `styles.css` hasta que el dueño apruebe el rediseño. Volver atrás es cambiar los `<link>` de las tres páginas y revertir el HTML: no hay datos, ni build, ni estado que migrar.

## Open Questions

- ¿Se borra `styles.css`? Son 6827 líneas que ya no carga nadie y que el historial de git conserva.
- ¿Los carretes llevan un control explícito de pausa, al estilo del `.fragata-pausa` que ya existe, o alcanza con las pausas por intención?
