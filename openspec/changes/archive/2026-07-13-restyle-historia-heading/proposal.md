## Why

El cliente pidió aplicar a la sección Historia (`.heritage`, `#historia`) el mismo rediseño de encabezado que ya se hizo en `#recorrido`: sacar la palabra "ENSENADA" del eyebrow y usar la palabra restante ("HISTORIA") como el nuevo título grande de la sección, en su color de marca, con una barra corta arriba en vez de subrayado completo.

## What Changes

- Se elimina el `<p class="eyebrow">ENSENADA HISTORIA</p>` de la sección `.heritage` — ya no aparece "ENSENADA" ahí.
- El `<h2>` pasa de mostrar "Fuerte Barragán" a mostrar "HISTORIA", en color `var(--brand-doc)` (`#173f78`, "Azul Documento Historia" — el color ya asignado a la línea de contenido Historia en el sistema de marca, el mismo que usa `.brand-line-historia`), agrandado con los mismos valores ya usados para el `<h2>` de `#recorrido` (`clamp(44px, 7.5vw, 88px)`, peso 900, mayúsculas), y con una barra corta decorativa arriba (mismo patrón `::before` que `.route-copy h2`), alineada a la izquierda (no centrada, porque `.heritage` es un layout a la izquierda, no centrado como `.route-copy`).
- "Fuerte Barragán" pasa de `<h2>` a un nuevo `<p class="heritage-subtitle">`, como subtítulo debajo del nuevo título "HISTORIA" y antes del párrafo de descripción existente.
- Se elimina la regla CSS ahora huérfana `.heritage .eyebrow { color: var(--gold); }`.
- No se toca `.heritage::before` (ícono decorativo de fondo, distinto y fuera de alcance), ni el layout de `.heritage`/`.heritage-copy`/`.video-panel`, ni las ~15 declaraciones dispersas de `.heritage h2` ya existentes en `styles.css` — se agrega un único override final con `!important`, mismo enfoque que con `.route-copy h2`.

## Capabilities

### New Capabilities
- `historia-heading-treatment`: el heading de la sección Historia muestra "HISTORIA" en su color de marca, agrandado, con una barra corta arriba, y "Fuerte Barragán" como subtítulo.

### Modified Capabilities
- `eyebrow-color-consistency`: se elimina el requirement "Todos los eyebrows del home renderizan en el color dorado de marca" (específico del eyebrow de `.heritage`, que deja de existir). El requirement sobre el eyebrow de `404.html` no se toca.

## Impact

- `index.html`: eliminación del `<p class="eyebrow">` de `.heritage`, cambio de texto del `<h2>`, nuevo `<p class="heritage-subtitle">`.
- `styles.css`: nuevo override para `.heritage h2`/`.heritage h2::before`/`.heritage-subtitle` al final del archivo; eliminación de la regla `.heritage .eyebrow`.
- `openspec/specs/eyebrow-color-consistency/spec.md`: requirement removido (solo la parte de `.heritage`).
