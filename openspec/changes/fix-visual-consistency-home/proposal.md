## Why

`/impeccable critique` + `/impeccable audit` sobre `index.html` (2026-07-12, snapshot en `.impeccable/critique/2026-07-12T23-32-39Z__index-html.md`) encontraron dos violaciones confirmadas de reglas de marca ya documentadas — glassmorphism en el `.social-strip` y un bug de cascada CSS que le roba el color dorado a un eyebrow — más una desactualización de `DESIGN.md` que describe como "deriva sin resolver" algo que ya se corrigió a propósito en el change archivado `2026-07-10-unify-place-card-radius`. Corregir esto ahora evita que una futura auditoría vuelva a marcar el mismo radio de borde como pendiente, y saca del sitio el único patrón explícitamente prohibido (glassmorphism) que el propio audit confirmó en producción.

## What Changes

- Reemplazar el tratamiento glassmorphism del `.social-strip` (`rgba(255,255,255,0.22)` + `backdrop-filter: blur(14px)`, `styles.css:6900-6913`) por un fondo sólido o casi-sólido, consistente con la regla de marca "resaltador, no vidrio".
- Agregar el guard `:not(.eyebrow)` faltante en `.heritage p` (`styles.css:1004-1006`), igual al que ya tiene la regla hermana `.route-copy p:not(.eyebrow)`, para que "ENSENADA HISTORIA" recupere su color dorado de marca en vez de heredar `--text-muted`.
- Actualizar `DESIGN.md` para reflejar que el radio de las place-cards (18px) es una decisión de marca ya resuelta (change archivado `2026-07-10-unify-place-card-radius`), no una deriva pendiente — y documentar 18px como el radio nombrado de "card", ya compartido con `.fragata-hero`, `.video-panel` y `.culture-slide`.

Fuera de alcance (candidatos a propuestas separadas, no de consistencia visual):
- La tarjeta "En Vivo" que enlaza a la sección Historia en vez de a contenido en vivo (problema de arquitectura de información/contenido).
- Contraste insuficiente en el hero-tagline y en el eyebrow "Identidad" (accesibilidad).
- El lightbox de fotos sin foco accesible (accesibilidad).
- Reconciliación completa de **todos** los valores de `border-radius` del archivo (se relevaron 15+ valores distintos en `styles.css`, muchos fuera de `index.html` o de componentes compartidos) — alcance demasiado amplio para esta propuesta puntual; queda fuera hasta que se decida abordarlo como iniciativa propia.

## Capabilities

### New Capabilities
- `home-cta-visual-treatment`: el `.social-strip` (CTA de seguir en redes, debajo del hero) usa un fondo sólido/casi-sólido en vez de glassmorphism, siguiendo la regla de marca "resaltador, no vidrio".
- `eyebrow-color-consistency`: todos los eyebrows del home (`ENSENADA IDENTIDAD/CULTURA/HISTORIA`) renderizan en el color dorado de marca documentado, sin excepciones causadas por reglas CSS más específicas sin guard.

### Modified Capabilities
- `technical-docs-accuracy`: `DESIGN.md` describe con precisión que el radio de 18px en las place-cards es una decisión de marca ya resuelta (no una deriva pendiente), y documenta ese valor como el radio nombrado de "card" compartido con sus tarjetas hermanas.

## Impact

- Archivo de código afectado: `styles.css` (dos reglas puntuales: `.social-strip`, `.heritage p`).
- Archivo de documentación afectado: `DESIGN.md` (sección de radios/"card style" y la nota sobre place-cards).
- No afecta HTML ni JS. No afecta otras páginas (`en-fotos/index.html`, `404.html` se abordan en propuestas separadas).
- Riesgo: bajo. Cambios acotados a 2 selectores CSS + un archivo de documentación; sin cambios de estructura ni de comportamiento interactivo.
