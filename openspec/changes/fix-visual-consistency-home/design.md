## Context

`index.html` usa un único `styles.css` (~7.9k líneas, 4 bloques `:root` separados) sin build ni preprocesador. Dos reglas puntuales de ese archivo violan convenciones de marca ya documentadas (`DESIGN.md`, `reference/brand.md` del skill impeccable), detectadas por `/impeccable critique`+`audit` el 2026-07-12. Además, `DESIGN.md` describe el radio de las place-cards como una deriva sin resolver, cuando en realidad ya se resolvió a propósito en el change archivado `2026-07-10-unify-place-card-radius` — es la documentación la que quedó desactualizada, no el CSS.

## Goals / Non-Goals

**Goals:**
- Eliminar el único patrón de glassmorphism confirmado en producción (`.social-strip`).
- Corregir el bug de especificidad CSS que le quita el color dorado al eyebrow de Historia.
- Dejar `DESIGN.md` en sintonía con el estado real del código (radio de card ya resuelto).

**Non-Goals:**
- No se reconcilian todos los valores de `border-radius` del archivo (hay 15+ en uso, muchos fuera del alcance de `index.html` o ya correctos para su componente).
- No se toca la tarjeta "En Vivo" ni el contraste del hero-tagline/eyebrow "Identidad" — son hallazgos de contenido/accesibilidad, no de consistencia visual, y quedan para propuestas separadas.
- No se toca el lightbox ni ninguna otra página (`en-fotos`, `404`) — cada una tiene su propia propuesta.

## Decisions

- **`.social-strip`: reemplazar `backdrop-filter: blur(14px)` + `rgba(255,255,255,0.22)` por un fondo sólido/casi-sólido** (ej. `rgba(8,11,24,0.92)` sin blur, o blanco casi opaco si se prioriza legibilidad sobre foto clara) — alternativa considerada: mantener el blur pero subir la opacidad a ~0.85-0.9 (descartada: sigue siendo técnicamente glassmorphism aunque menos notorio; la regla de marca pide "resaltador, no vidrio", no "vidrio más opaco").
- **`.heritage p`: agregar `:not(.eyebrow)`** en vez de subir la especificidad de la regla `.eyebrow` que debería ganar — alternativa considerada: agregar `!important` a `.eyebrow` (descartada: ya hay abuso de `!important` en el archivo per `docs/tecnico/convenciones-css.md`; replicar el patrón correcto de la regla hermana `.route-copy p:not(.eyebrow)` es más consistente y más fácil de auditar a futuro).
- **(descubierto al implementar) `.heritage .eyebrow { color: var(--gold); }` con scope propio, en vez de confiar en que el `.eyebrow` base gane la cascada** — hay una regla sitewide sin scope (`styles.css:2977`, `.eyebrow, .feature-kicker, .story-label { color: var(--brand-red) }`) con la misma especificidad que la regla base `.eyebrow` (línea 196) pero que aparece después en el archivo, así que le gana. Sin un override de scope, sacar el guard de `.heritage p` hubiera dejado el eyebrow en rojo, no en dorado. Se evitó tocar la regla de línea 2977 directamente (afecta `.feature-kicker`/`.story-label` en otros lugares del sitio, fuera del alcance de esta propuesta) y en su lugar se agregó el override scoped — mismo patrón usado para `404.html` en la propuesta hermana.
- **`DESIGN.md`: actualizar en vez de re-derivar el token** — el valor 18px ya está en uso consistente en `.place-card`, `.fragata-hero`, `.video-panel`, `.culture-slide`; se documenta como el radio nombrado de "card" en la sección de tokens (`rounded.card: 18px`), y se corrige la nota de "Cards / Containers" que hoy dice "candidato a unificar en una futura pasada".

## Risks / Trade-offs

- [Cambiar el fondo del `.social-strip` puede reducir el contraste/legibilidad si se elige un tono muy oscuro sobre una foto de hero clara] → Mitigación: verificar visualmente contra las 8 fotos del crossfade del hero (no solo una), priorizando el tono que ya usa el resto de controles translúcidos oscuros del sitio (`rgba(7,11,11,0.46)` del nav-toggle) como referencia de "translúcido pero no glass".
- [El guard `:not(.eyebrow)` en `.heritage p` podría no ser la única regla con el mismo bug en el archivo] → Mitigación: el audit ya buscó específicamente este patrón (`p:not(.eyebrow)` vs. reglas sin guard) y solo encontró esta ocurrencia para `index.html`; no se expande la búsqueda a otras páginas en esta propuesta.

## Migration Plan

- Cambios de una sola línea/regla cada uno; no requieren migración de datos ni rollback especial. Revertir es un `git revert` del commit si algo se ve mal en la Deploy Preview de Netlify.
- Verificación: abrir la rama en su Deploy Preview de Netlify, comparar visualmente el `.social-strip` sobre el hero y el eyebrow "ENSENADA HISTORIA" contra `ensenadaturismo.com` (producción) antes de aprobar el merge.
