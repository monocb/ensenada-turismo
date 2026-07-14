## Context

`.route-section::after` está definido en dos puntos de `styles.css` (regla base + un override de opacidad en otro breakpoint/patch posterior). No hay otra sección ni regla que dependa de `.route-section::after` — es exclusivo de esta sección.

## Goals / Non-Goals

**Goals:**
- Sacar el watermark del velero de `#recorrido` sin dejar CSS ni assets huérfanos.

**Non-Goals:**
- No se tocan los otros watermarks del sitio (ícono de sol/nubes, micrófono, etc.) — el pedido es puntual a esta sección.

## Decisions

- **Eliminar ambas declaraciones `.route-section::after` (no solo bajar la opacidad a 0).** El pedido es sacarlo, no atenuarlo más — ya está en 4.5% de opacidad y aun así se nota.
- **Borrar también `assets/identidad/icono-velero.png`.** Confirmado por grep que no tiene ningún otro uso en `.html`/`.css`/`.js` ni mención en `docs/marca/` — queda huérfano en cuanto se borra la regla CSS que lo referenciaba.

## Risks / Trade-offs

- [Riesgo: ninguno significativo — cambio puramente decorativo y acotado, sin dependencias] → N/A.
