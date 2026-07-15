## Context

`.image-lightbox` (styles.css:610-620) es `position:fixed; inset:0; display:flex; align-items:center; justify-content:center;`. `.lightbox-nav` (656-670) hoy es `position:absolute; top:50%; transform:translateY(-50%);` con `border-radius:999px` (círculo, 52×52px), y `.lightbox-prev`/`.lightbox-next` (672-678) lo anclan a `left`/`right` respectivamente (pegados a los bordes del viewport). Como la imagen ampliada usa `max-width:96vw; max-height:92vh;` y suele acercarse a esos límites, las flechas —a la altura del centro vertical, cerca de los bordes horizontales— quedan superpuestas sobre los costados de la foto en la mayoría de los casos.

El ícono en sí (glyph `‹`/`›` vía `[data-lightbox-prev]::before`/`[data-lightbox-next]::before`, styles.css:1026-1032) no cambia — solo el contenedor que lo posiciona y le da forma.

## Goals / Non-Goals

**Goals:**
- Las flechas de navegación no se superponen con la foto ampliada, en ningún tamaño/orientación de imagen.
- Forma rectangular con esquinas redondeadas, en vez de circular.
- Cambio aplicado al componente compartido (mismo resultado en Fragata, En Fotos, y cualquier galería futura que use el lightbox).

**Non-Goals:**
- No se toca `.lightbox-close` ni `.lightbox-download` (posición/forma sin cambios).
- No se cambia el ícono de las flechas (sigue siendo el glyph `‹`/`›` existente).
- No se reduce el tamaño mínimo de touch target de 48px ya reforzado para estos botones.

## Decisions

- **Centrar el par de flechas con `left:50%` + `transform:translateX()` con offsets opuestos, en vez de un ancho de par hardcodeado.** Permite que ambos botones queden centrados como grupo bajo la foto sin depender de calcular a mano el ancho total del par (que cambiaría si se ajusta el tamaño de los botones en el futuro) — cada botón se posiciona en relación a su propio ancho (`calc(-100% - Npx)` para el de la izquierda, `Npx` para el de la derecha), un patrón robusto ante cambios de tamaño.
- **Reducir `.image-lightbox img` de `max-height:92vh` a `78vh`, en vez de dejar que las flechas se superpongan condicionalmente según la altura de cada foto.** Una regla condicional (ej. solo mover las flechas si la foto es muy alta) agregaría complejidad innecesaria — reservar espacio fijo abajo garantiza que nunca haya superposición, a costa de que las fotos se vean un poco más chicas que antes. Es el trade-off directo de la petición del cliente (evitar que las flechas tapen la foto).
- **No tocar la regla mobile existente que achica `.lightbox-nav` a 44×44px.** El `border-radius` rectangular se hereda de la regla base sin necesidad de repetirlo en la media query — el botón sigue viéndose rectangular-redondeado en mobile, solo más chico.

## Risks / Trade-offs

- [Riesgo: fotos muy anchas y poco altas (panorámicas) podrían dejar bastante espacio vacío arriba/abajo con el nuevo `max-height:78vh`, ya que antes usaban más alto del viewport disponible] → Aceptado: el `object-fit:contain` ya maneja proporciones correctamente: una foto panorámica se acota por `max-width` de todos modos, no por `max-height`, así que el impacto real es mínimo — solo se reduce el techo máximo para fotos muy verticales.

## Migration Plan

Cambio de CSS puntual sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify.
