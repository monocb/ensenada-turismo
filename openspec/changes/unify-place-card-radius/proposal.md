## Why

Al escribir `DESIGN.md` (skill `impeccable`), se detectó que las place-cards de la sección "Tres formas de vivir Ensenada" son el único elemento del sistema visual con esquinas 100% filosas (`border-radius: 0`), mientras el resto del componente — el badge numerado circular, el botón "Ver historia" (pill) y prácticamente todas las demás tarjetas del sitio (`.fragata-hero`, `.video-panel`, `.culture-slide`, `.timeline-stage`, todas en 18-22px) — usa esquinas redondeadas. Confirmaste explícitamente que es deriva accidental del código, no una decisión de marca, y que preferís unificarlo.

## What Changes

- Cambiar `border-radius: 0 !important` a `border-radius: 18px !important` en `.place-card` (`styles.css` línea ~6356), alineándolo con el radio ya usado por sus tarjetas hermanas (`.fragata-hero`, `.video-panel`, `.culture-slide`, todas en 18px).
- Revisar si hay elementos hijos de `.place-card` (imagen, overlay) que necesiten `overflow: hidden` + el mismo radio para que la imagen no sobresalga de la esquina redondeada del contenedor (la regla ya tiene `overflow: hidden !important`, a confirmar que alcanza).
- No se toca ningún otro componente ni breakpoint fuera de `.place-card`.

## Capabilities

### New Capabilities
- `place-card-visual-consistency`: las place-cards de "Tres formas de vivir Ensenada" usan un radio de esquina consistente con el resto de las tarjetas del sitio.

### Modified Capabilities
(ninguna)

## Impact

- Archivo afectado: `styles.css`, una declaración (`.place-card` línea ~6356).
- No afecta HTML ni JS.
- Riesgo: bajo — cambio puramente visual, acotado a un selector. Verificar que la imagen de portada de cada card respeta la esquina redondeada (no se sale del contorno) y que el modal que se abre al hacer clic (`.place-modal__media`, ya redondeado en 22px) sigue viéndose coherente con la card de origen.
