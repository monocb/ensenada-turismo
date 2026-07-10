## Why

Al verificar el bug histórico del menú hamburguesa (`docs/pendientes/bug-menu-hamburguesa.md`, ya cerrado como no reproducible — el ícono y el `aria-expanded` funcionan bien), se encontró un problema **distinto y real** en el mismo componente: con el menú mobile abierto, el `<h1>ENSENADA</h1>` del hero y su tagline se ven "fantasma" (bleed-through) por encima del panel del menú, pese a que el panel tiene un fondo casi opaco (`rgba(8, 11, 24, 0.96)`, 96%). Esto reduce la legibilidad de los últimos ítems del menú ("Contacto") y se ve como un bug visual, no como un efecto intencional.

## What Changes

- Subir la opacidad del fondo de `.main-nav` (panel del menú mobile) de `0.96` a `1` (opaco completo). **Causa raíz confirmada empíricamente** (ver `design.md`): no es un bug de stacking/z-index — el 4% de transparencia alcanzaba para revelar el `<h1>` del hero (blanco, peso 950, tamaño enorme) detrás del panel.
- No se toca la lógica de apertura/cierre del menú (`script.js`, `aria-expanded`) ni el ícono de tres líneas — eso ya está confirmado funcionando.

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
- `mobile-hero-layout`: se agrega un nuevo requirement sobre la legibilidad del panel del menú mobile abierto (el contenido del hero no debe pintarse por encima del panel), como delta ADDED sobre la capability ya existente (no se modifica ningún requirement previo, que ya cubre forma del ícono y `aria-expanded`).

## Impact

- Archivo afectado: `styles.css` — un solo valor (`background` de `.main-nav`, línea ~6973).
- No afecta HTML ni JS.
- Riesgo: bajo — cambio de una línea, causa raíz confirmada empíricamente (no es un fix especulativo). Verificar con capturas antes/después en varios anchos mobile antes de dar por cerrado, y confirmar que el panel a opacidad 1 sigue viéndose coherente con el resto del sistema visual.
