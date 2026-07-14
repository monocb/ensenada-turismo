## Context

Este es el mismo rediseño ya aplicado a `#recorrido` (`restyle-recorrido-identidad-heading` + `add-recorrido-heading-overline`, ambos archivados), llevado a la sección Historia. `.heritage h2` tiene ~15 declaraciones dispersas en `styles.css` (distintos breakpoints/layouts, algunas con `!important`), igual que le pasaba a `.route-copy h2` — se resuelve con la misma estrategia: un override final que gana la cascada, sin tocar las reglas viejas.

A diferencia de `#recorrido` (`.route-copy`, `text-align: center`), `.heritage` es un grid de 2 columnas alineado a la izquierda (texto | video) — la barra decorativa arriba del título no debe centrarse con `margin: 0 auto` como en `#recorrido`, sino quedar alineada a la izquierda (`margin: 0 0 16px`).

## Goals / Non-Goals

**Goals:**
- "HISTORIA" reemplaza visualmente al eyebrow + título anterior, en el color de marca ya asignado a esa línea de contenido (`var(--brand-doc)`).
- "Fuerte Barragán" se conserva, como subtítulo debajo del nuevo título.
- Mismos valores de tamaño/tracking que ya se validaron visualmente en `#recorrido`, para consistencia entre ambas secciones.

**Non-Goals:**
- No se toca `.heritage::before` (otro ícono decorativo de fondo) ni el layout de la sección.
- No se consolidan las ~15 declaraciones dispersas de `.heritage h2`.

## Decisions

- **Mantener el `<h2>` (ahora "HISTORIA") en vez de eliminarlo, igual que en `#recorrido`.** Es el único heading semántico de la sección — el mismo razonamiento de accesibilidad que ya se aplicó ahí.
- **Color `var(--brand-doc)` (`#173f78`) en vez de un valor nuevo.** Es el color ya documentado y usado en el sitio para la línea de contenido Historia (`.brand-line-historia { --line-color: var(--brand-doc); }`) — reutilizar el token existente en vez de inventar un azul nuevo mantiene la coherencia del sistema de colores por línea de contenido.
- **Mismos valores de `font-size`/`letter-spacing`/`line-height` que `#recorrido`.** Ya se validaron visualmente con el usuario en esa sección; reutilizarlos da consistencia entre las dos secciones que ahora comparten el mismo patrón de "título = palabra de eyebrow agrandada en su color".
- **Barra decorativa alineada a la izquierda (`margin: 0 0 16px`, no `0 auto`).** `.heritage` no está centrado (a diferencia de `.route-copy`), así que centrar la barra la desalinearía respecto al título y al resto del bloque de texto.
- **"Fuerte Barragán" como `<p class="heritage-subtitle">`, no como `<h3>`.** Mantiene la convención ya usada en el sitio de un solo heading por bloque de copy con texto de apoyo en `<p>` con clase propia (ej. `.identity-stamp` en `#marca`), en vez de introducir un segundo nivel de heading semántico.
- **Eliminar `.heritage .eyebrow { color: var(--gold); }`.** Es una regla exclusiva de ese eyebrow (no compartida), huérfana en cuanto se borra el `<p class="eyebrow">` — dejarla sería código muerto.

## Risks / Trade-offs

- [Riesgo: la barra decorativa reutiliza el nombre `::before` de `.heritage h2`, pero `.heritage` ya tiene su propio `::before` (ícono de fondo) — riesgo de confundir selectores al mantener el archivo] → Mitigación: son selectores distintos (`.heritage::before` vs. `.heritage h2::before`), sin colisión real; se deja un comentario fechado que aclara cuál es cuál.
