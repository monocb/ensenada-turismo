## Context

`styles.css` (~6.6k líneas) acumula parches fechados superpuestos sobre las mismas secciones a lo largo de muchos cambios anteriores. El patrón recurrente detectado en esta auditoría: una regla mobile bien pensada, escrita en una pasada anterior, queda "muerta" porque una regla posterior en el archivo (a veces con `!important`, a veces solo por especificidad igual + orden posterior) apunta al mismo selector y gana en la cascada — sin que nadie lo note porque el resultado visual "parece" responsive hasta que se prueba en el dispositivo/ancho exacto donde la regla muerta era la única que realmente arreglaba algo.

Dos investigaciones en paralelo (una enfocada en Fragata, otra un barrido general del resto del sitio) leyeron el CSS real línea por línea, no solo grep por nombre de selector, para encontrar exactamente qué regla gana en cada caso.

## Goals / Non-Goals

**Goals:**
- Fragata ya no recorta texto en viewports de 375-430px (el bug reportado).
- El `<h1>` del hero deja de depender de que el texto "justo entre" en una línea sin ningún respaldo visual.
- La caja de foto de la ruleta de Historia no domina la pantalla en mobile.
- El ícono del menú se ve coherente (X) cuando el menú está abierto.

**Non-Goals:**
- No se reorganiza ni consolida `styles.css` — se seleccionaron ediciones puntuales en las líneas exactas identificadas, siguiendo el patrón ya establecido en el proyecto de parches puntuales fechados (CLAUDE.md pide explícitamente evitar reorganizaciones amplias).
- No se toca el CSS muerto de `<details>/<summary>` de place-cards (deuda técnica real, pero sin efecto en el render actual — limpieza aparte).
- No se toca `.route-section`/`.place-accordion` — confirmado sano.

## Decisions

- **Eliminar, no comentar, las reglas muertas del hero h1.** Cinco bloques de media query (≤390px, ≤430px ×2, ≤370px) nunca se aplican hoy por orden de cascada. Dejarlos ahí (aunque inertes) es exactamente el tipo de ruido que hizo que este bug fuera difícil de diagnosticar en primer lugar — se eliminan siguiendo la convención del proyecto de no dejar código muerto.
- **Sacar `white-space: nowrap` en vez de agrandar el contenedor o achicar más la fuente.** La fuente actual (`clamp(46px, 14vw, 68px)` en la regla ganadora) ya está bien calibrada — el problema no es el tamaño, es que no hay ningún plan B si por cualquier motivo (fuente, dispositivo no probado) no entra en una línea. Permitir el wrap a una segunda línea es un cambio mínimo y no reduce la legibilidad en el caso normal (donde ya entra en una línea, nada cambia visualmente).
- **`.fragata-hero-copy`: eliminar `left`/`right` en vez de convertir el elemento a `position:absolute`.** Convertirlo a `absolute` cambiaría cómo participa en el flujo del layout (afecta la altura de `.fragata-hero`, que hoy depende de sus hijos en flujo normal) — un cambio de mayor alcance para resolver algo que en realidad no necesitaba ningún offset. `margin-left` (ya presente en la regla base) y `max-width: 650px` ya resuelven el espaciado sin necesidad de `left`/`right`.
- **`.timeline-stage`: `clamp()` en vez de un valor fijo más chico.** Un segundo valor fijo (ej. `320px`) tendría el mismo problema de raíz que el actual `600px` — no se adapta entre los distintos anchos de iPhone (320-430px). Un `clamp(240px, 64vw, 380px)` escala con el viewport real.
- **Ícono del menú: reactivar `::after` solo en el estado `.is-open`, no en general.** El `::after` está desactivado (`content:none !important`) en la regla base porque el ícono en reposo son 3 líneas dibujadas con `box-shadow` sobre un solo `::before` — agregar una segunda barra permanente rompería ese diseño. Activarla condicionalmente solo bajo `.site-header.is-open` mantiene el ícono de reposo intacto y solo agrega la segunda diagonal de la X cuando corresponde.

## Risks / Trade-offs

- [Riesgo: permitir wrap en el `<h1>` del hero podría, en un dispositivo hipotético aún más angosto que 320px, hacer que el título pase a 2 líneas visualmente — un cambio de layout que hoy no existe] → Aceptado: es preferible a perder letras invisiblemente; 2 líneas en un dispositivo extremadamente angosto es un fallback razonable, no un bug.
- [Riesgo: el nuevo valor de `.timeline-stage` (`clamp(240px, 64vw, 380px)`) es una estimación sin poder verificar visualmente en un navegador real esta sesión] → Se pide confirmación visual al usuario antes de cerrar el cambio; ajustable si no queda proporcionado.

## Migration Plan

Cambio de CSS puntual sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify.
