## Context

`.place-accordion` es un CSS grid de 3 columnas (`repeat(3, minmax(0,1fr))`) sin `align-items` explícito, así que por default (`stretch`) las 3 `.place-card` de una fila ya tienen la misma altura total (la del contenido más alto — hoy, "Punta Lara" con título a 2 líneas). El problema no es la altura de la tarjeta (ya es igual entre las 3), sino que dentro de cada tarjeta, `.place-trigger` (`display:grid`, sin `grid-template-rows` explícito) y `.place-summary-copy` (`display:grid !important; align-content:start !important`) no reparten ese espacio extra hacia el final — el contenido (título + descripción + botón) queda apilado arriba, dejando el excedente de alto como hueco en blanco debajo del botón en las tarjetas más cortas, en vez de empujar el botón al fondo.

En mobile (`max-width: 1020px`), `.place-accordion` pasa a una columna (una tarjeta por fila), y `.place-trigger` cambia a un grid de 2 columnas (imagen | texto) vía un override existente en ese mismo media query — ahí no hay comparación entre tarjetas de una fila, así que este problema no aplica y no hace falta tocar nada.

## Goals / Non-Goals

**Goals:**
- "ENSENADA CENTRO" en la tarjeta correspondiente, sincronizado entre el texto visible y `data-place-title` (modal + alt).
- Los 3 botones "VER HISTORIA" alineados al fondo de sus tarjetas en desktop, sin importar el largo del título.

**Non-Goals:**
- No se toca el layout ni las reglas de `.place-trigger`/`.place-summary-copy` en mobile (`max-width: 1020px`).
- No se reescriben las reglas base existentes de `.place-trigger`/`.place-summary-copy`/`.place-action` — solo se agrega un override adicional scopeado a desktop.

## Decisions

- **`grid-template-rows: auto 1fr` en `.place-trigger`, scopeado a `@media (min-width: 1021px)`.** Fuerza a que la fila de `.place-summary-copy` (segunda fila del grid, después de `.place-media`) ocupe todo el alto sobrante de la tarjeta — sin esto, un row `auto` se ajusta solo al contenido y no reclama el espacio extra que sí existe a nivel de `.place-card` (por el stretch entre las 3 tarjetas del grid `.place-accordion`). Alternativa descartada: depender del comportamiento por default de `align-content` en grids con tracks `auto` — es ambiguo entre navegadores/specs y no es una base confiable para un fix de alineación.
- **`.place-summary-copy` pasa a `display:flex !important; flex-direction:column !important`, scopeado al mismo breakpoint.** Con la fila ya estirada a `1fr` por el punto anterior, flexbox permite usar `margin-top:auto` en el último hijo para empujarlo al final — un patrón estándar y predecible, más simple que lograr el mismo resultado con grid puro.
- **`.place-action { margin-top: auto !important }` en el mismo breakpoint.** Con `.place-summary-copy` como flex-column ya estirado, esto ancla el botón al fondo exacto de la tarjeta. Sobrescribe el `margin-top: 6px !important` existente — mismo selector, mismo `!important`, gana por orden de aparición (se agrega después en el archivo).
- **Scopear todo a `@media (min-width: 1021px)` en vez de tocar las reglas base.** El mismo breakpoint (1020px) ya es el punto de corte donde `.place-trigger` cambia de layout para mobile; aplicar el fix solo arriba de ese corte evita cualquier interacción con el grid de 2 columnas (imagen|texto) que ya existe para mobile.
- **Sincronizar `data-place-title` junto con el texto visible.** `script.js` (líneas 359, 364-365) usa ese atributo para el título del modal y el alt de la imagen ampliada — dejarlo desincronizado (visible "ENSENADA CENTRO" pero modal "ENSENADA") sería un bug de consistencia nuevo.

## Risks / Trade-offs

- [Riesgo: `grid-template-rows: auto 1fr` en `.place-trigger` podría alterar el alto de `.place-media` si el navegador reinterpreta el primer track] → Mitigación: `.place-media` ya tiene `height: clamp(...) !important` fijo en su propia regla, así que el track `auto` para esa fila simplemente adopta esa altura fija; no hay ambigüedad.
- [Riesgo: cambiar `.place-summary-copy` a flex podría afectar el `gap`/orden de sus hijos (`strong`, `em`, `.place-action`)] → Mitigación: flexbox respeta el orden de documento igual que grid con `align-content:start`, y `gap:14px` (ya declarado en la regla base) funciona igual en ambos modelos de layout.
