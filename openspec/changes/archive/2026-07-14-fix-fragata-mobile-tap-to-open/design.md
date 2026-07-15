## Context

Las 8 fotos de `.fragata-gallery` están apiladas con `position:absolute; inset:0`, cada una con `animation: heroPhotoFade 48s infinite, fragataSlideInteractive 48s infinite` y un `animation-delay` distinto (0,6,12,...,42s), de forma que en cualquier momento como mucho una tenga `opacity:1`. `fragataSlideInteractive` (styles.css) anima `pointer-events` entre `none` y `auto` en las mismas ventanas porcentuales que `heroPhotoFade` anima `opacity`, para que solo la foto visible responda al click.

Esto depende de que el navegador trate `pointer-events` como una propiedad animable/discreta dentro de una animación CSS — comportamiento soportado en Chrome/Firefox pero con soporte históricamente inconsistente en Safari/WebKit. Como todos los navegadores en iOS (Safari, Chrome-en-iOS, etc., todos usan WebKit por requisito de Apple) comparten este motor, el resultado es que en cualquier navegador de un iPhone las 8 fotos quedan efectivamente con `pointer-events: none` todo el tiempo — nunca abren el lightbox al tocarlas, exactamente el bug reportado por el cliente.

## Goals / Non-Goals

**Goals:**
- Las 8 fotos de Fragata son tocables/clickeables de forma confiable en cualquier navegador, incluido Safari/iOS.
- Se mantiene el mismo comportamiento visual y de timing que ya existía (rotación de 48s, cada foto visible+clickeable durante la misma ventana de ~4.8s dentro de su ciclo).
- Sin JavaScript adicional más allá de lo estrictamente necesario para reemplazar el mecanismo de `pointer-events`.

**Non-Goals:**
- No se toca `heroPhotoFade` ni el fade visual de opacidad — sigue siendo 100% CSS, no tiene el mismo problema de confiabilidad porque no es crítico para la interacción (un fade visual que se vea "raro" en algún navegador no es un bug funcional).
- No se toca el hero principal (`#inicio`), que no tiene ningún mecanismo de click sobre sus fotos de fondo — este bug es específico de Fragata.
- No se re-implementa el layout/CSS del lightbox en sí — ya se verificó que es responsive (sin anchos fijos en píxeles).

## Decisions

- **`setInterval` en JS replicando el mismo timing que ya definía la animación CSS, en vez de escuchar eventos de animación (`animationstart`/`animationiteration`) o usar `Element.getAnimations()`.** Un `setInterval` simple que calcula el tiempo transcurrido desde la carga de la página y lo compara contra la ventana 4%-14% de cada foto es la opción más simple y con mejor soporte — `getAnimations()` es una API más moderna con soporte menos universal, y escuchar `animationiteration` solo dispara al FINAL de cada iteración completa (48s), no permite saber en qué punto intermedio del ciclo está la animación en un momento dado.
- **Frecuencia del intervalo: 250ms.** Suficientemente frecuente para que la ventana de clickeable (4.8s) tenga margen de sobra para ser detectada sin lag perceptible, sin ser tan frecuente como para tener costo de performance notable en un `setInterval` que solo hace comparaciones aritméticas simples sobre 8 elementos.
- **Se remueve `fragataSlideInteractive` del `animation` shorthand en vez de dejarlo corriendo en paralelo al nuevo JS.** Si se dejaran ambos mecanismos activos, en los navegadores donde SÍ funciona la animación de `pointer-events` (Chrome/Firefox), la animación CSS tiene prioridad de cascada sobre un `style.pointerEvents` seteado por JS (las animaciones CSS pueden pisar hasta estilos inline para la propiedad que animan) — lo que anularía el control que el JS necesita tener. Sacar la animación CSS por completo evita ese conflicto y deja al JS como única fuente de verdad, consistente en todos los navegadores.
- **El JS respeta `prefers-reduced-motion` no tocando `pointer-events` en absoluto en ese caso.** La regla CSS existente para reduced-motion (`animation:none; pointer-events:none` + `:first-child { opacity:1; pointer-events:auto }`) es una asignación estática, no animada — funciona igual de bien en cualquier navegador sin el problema de este bug, así que no hace falta que el JS intervenga ahí.

## Risks / Trade-offs

- [Riesgo: el `setInterval` sigue corriendo en pestañas en background, consumiendo (mínimos) recursos] → Aceptado: el costo es trivial (8 comparaciones aritméticas cada 250ms), y los navegadores ya limitan/throttlean timers en pestañas inactivas de todos modos.
- [Riesgo: pequeño desfasaje entre el timing JS (basado en `performance.now()` desde la carga de la página) y el timing CSS real de `heroPhotoFade` (que arranca en el momento en que el navegador empieza a renderizar la animación, no exactamente en el mismo instante que se evalúa el JS)] → Aceptado: un desfasaje de milisegundos es imperceptible dado que la ventana de clickeable dura ~4.8 segundos; no se necesita sincronización exacta al frame.

## Migration Plan

Cambio de comportamiento de interacción sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify.
