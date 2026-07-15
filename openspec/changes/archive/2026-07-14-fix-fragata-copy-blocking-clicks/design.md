## Context

`.fragata-hero-copy` (styles.css:511-521) es `position:relative; z-index:1; display:flex; flex-direction:column; max-width:650px;` — se superpone visualmente sobre `.fragata-gallery` (position:absolute, detrás). Sin `pointer-events:none`, el navegador asigna los clicks a esta caja en toda su superficie rectangular, no solo donde hay texto visible — incluso el espacio "vacío" (fondo transparente) entre el `<h2>` y `.fragata-hero-foot` bloquea el paso del click hacia la foto de atrás.

En desktop, `.fragata-hero-copy` ocupa una fracción chica del ancho total de `.fragata-hero` (hasta 1180px), así que la mayor parte de la foto está genuinamente libre de superposición y el bug pasa desapercibido. En mobile, `.fragata-hero-copy` es el único hijo flex real de `.fragata-hero` (la galería está fuera del flujo) y su ancho se ajusta casi al total del viewport disponible — dejando solo el `margin-left` (16-46px) como zona real y consistentemente libre de la caja del panel. Coincide exactamente con el reporte del cliente ("tengo que apretar muy sobre el borde izquierdo").

## Goals / Non-Goals

**Goals:**
- Tocar/hacer click en cualquier punto visible de una foto de Fragata abre el lightbox, sin importar si ese punto cae dentro del área rectangular de `.fragata-hero-copy`.
- El link de crédito (`.fragata-cta`) sigue siendo clickeable.

**Non-Goals:**
- No se toca la navegación por teclado — no depende de `pointer-events` (que solo afecta interacción de mouse/touch, no el orden/alcance de Tab).
- No se rediseña el layout del panel de texto — el fix es puramente sobre qué elementos capturan eventos de puntero, no sobre posición/tamaño visual.

## Decisions

- **`pointer-events:none` en el contenedor completo (`.fragata-hero-copy`), con `pointer-events:auto` solo en el hijo interactivo (`.fragata-cta`), en vez de acotar manualmente el área del contenedor.** Es el patrón estándar y más robusto para "dejar pasar clicks a través de un contenedor decorativo/de texto que se superpone a algo interactivo detrás" — no depende de calcular a mano cuánto espacio ocupa el texto en cada breakpoint (que ya demostró ser frágil, como se vio con el bug de recorte de texto arreglado antes en esta misma sesión).

## Risks / Trade-offs

- [Riesgo: si en el futuro se agrega otro elemento interactivo dentro de `.fragata-hero-copy` (además de `.fragata-cta`), va a heredar `pointer-events:none` de su padre y quedar no-clickeable a menos que se le agregue `pointer-events:auto` explícito] → Trade-off aceptado y documentado acá — es el mismo patrón que ya usa el resto del sitio en casos similares (contenedores decorativos con hijos interactivos puntuales).

## Migration Plan

Cambio de CSS puntual sin estado ni datos — se aplica en una sola pasada de edición y se despliega vía el flujo normal de Netlify.
