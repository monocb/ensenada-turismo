## Context

El cambio anterior (`redesign-fragata-background-gallery`, archivado) dejó `.fragata-hero-copy` en `position:absolute` con un `top` fijo en `clamp(74px,10vw,132px)`, pensado originalmente para un bloque que solo tenía el `<h2>`. Ahora tiene tres niveles (h2 + párrafo + CTA), y el offset fijo no se ajusta a esa altura de contenido variable. `.fragata-cta` conserva el estilo de "caja" (fondo, borde, `border-left` de acento) que tenía cuando vivía dentro de la tarjeta navy separada (`.fragata-reel-block`, ya eliminada) — ese estilo no se revisó al moverlo.

## Goals / Non-Goals

**Goals:**
- Centrado vertical robusto que no dependa de recalcular un `top` fijo cada vez que cambia el contenido.
- CTA como texto plano, sin caja ni acento de color lateral (anti-patrón de diseño ya señalado, y pedido explícito del cliente).

**Non-Goals:**
- No se cambia el tamaño/color del `<h2>` ni del párrafo — ya evaluados y confirmados.
- No se toca la galería de fondo, el kicker, ni ninguna otra sección.

## Decisions

- **`display:flex; align-items:center` en `.fragata-hero` en vez de recalcular el `top` del `.fragata-hero-copy`.** Centra el bloque de texto sin importar cuántas líneas ocupe cada elemento — más robusto que un offset fijo en px/vw que había que ajustar a mano cada vez que el contenido cambia de altura (ya pasó una vez en el cambio anterior).
- **`.fragata-hero-copy` pasa a `position:relative` sin `top`.** Al quedar como hijo normal de un contenedor flex, el centrado lo resuelve el flex del padre — no hace falta posicionamiento absoluto para este elemento. `.fragata-gallery` y `.fragata-hero::after` siguen siendo `position:absolute` (no participan del flex), así que no cambia su comportamiento.
- **CTA con subrayado en vez de sin ninguna señal visual.** Sacar la caja completamente sin agregar otra señal dejaría un link indistinguible del párrafo de arriba — el subrayado es la convención más simple y accesible para "esto es un link" sin depender solo del color (que además ya es blanco/gris como el resto del texto).
- **`margin-top` del CTA sube de 18px a 24px.** Con menos peso visual (14px vs. 20px, peso 700 vs. 900), necesita algo más de aire para leerse como un tercer nivel distinto del párrafo, no como una continuación de este.

## Risks / Trade-offs

- [Riesgo: ninguno significativo — ajuste visual acotado sobre una estructura ya verificada] → N/A.
