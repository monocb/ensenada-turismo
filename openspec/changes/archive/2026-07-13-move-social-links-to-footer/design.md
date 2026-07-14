## Context

`.social-strip` está duplicado en ~8 bloques base + ~10 responsive en `styles.css` (patrón recurrente en este archivo, ya visto al limpiar la sección Cultura y el carrete de Fragata en cambios anteriores de esta sesión) — casi todas las declaraciones usan `!important`, así que el estilo efectivo hoy es un merge de los dos últimos bloques que tocan cada selector (confirmado por investigación: el bloque en la línea ~6323 gana para el contenedor `.social-strip` en sí — cápsula oscura `background: rgba(8,11,24,0.92)`, `border-radius:999px` — y el bloque en ~4262 gana para `.social-strip-links a` — badge blanco `rgba(255,255,255,0.92)` — y su `:hover`).

El footer (`.footer-links a`) hoy pinta todos sus links en dorado (`color: var(--gold) !important`) sin distinguir entre la nav de "Guía de la página" y la de redes sociales — ambas comparten la clase `.footer-links`. Los nuevos badges necesitan texto blanco, así que hace falta pisar ese `color` con `!important` propio (la única propiedad de esa regla que lo usa).

Los colores de marca por red (`.instagram-link .social-icon`, `.facebook-link .social-icon`, `.tiktok-link .social-icon`) son selectores independientes, no anidados bajo `.social-strip` — se reutilizan automáticamente al poner esas mismas clases en los badges del footer, sin tocarlos.

## Goals / Non-Goals

**Goals:**
- Mover el contenido (ícono + handle) de los 3 badges del hero al footer, sin duplicar SVGs ni reinventar el ícono.
- Dejar `.social-strip` sin ningún rastro en HTML/CSS/JS de las 3 páginas.
- Badges del footer: translúcidos, con sombra leve, sin cápsula contenedora, con la misma animación de hover que ya existía.

**Non-Goals:**
- No se cambia la lista de redes sociales ni los links/hrefs.
- No se toca `.footer-brand` ni el nav de "Guía de la página".
- No se rediseña el layout general del footer (grid de 3 columnas existente).

## Decisions

- **Reusar el contenido exacto de `.social-strip` (SVGs, hrefs, handles) en el footer, no reescribirlo.** Es literalmente "mover" el componente, como pidió el cliente — cambia dónde vive y cómo se ve el contenedor, no el contenido.
- **Sin cápsula contenedora en el footer.** El pedido fue explícito ("el box contenedor general quiero sacarlo") — los badges van sueltos dentro del `<nav>` existente, que ya no necesita fondo/borde propio.
- **Badges translúcidos (`rgba(255,255,255,0.1)` aprox.) en vez de casi opacos.** El footer es un fondo oscuro (mismo que tenía la cápsula por detrás), así que un blanco muy translúcido da el efecto "vidrio esmerilado" pedido sin perder legibilidad del ícono/texto.
- **Reusar los valores de hover ya existentes (elevación + aclarado de fondo) en vez de inventar una animación nueva.** El pedido fue "que tengan la animación que ya tienen" — se reutiliza el mismo patrón (`transform: translateY(-3px)`, fondo más opaco/sólido en `:hover`/`:focus-visible`), no una coreografía nueva.
- **`color: #ffffff !important` en `.footer-social-links a` para pisar el dorado heredado de `.footer-links a`.** Es la única propiedad de esa regla compartida que usa `!important`; el resto (ej. `text-decoration`) se puede pisar sin `!important` apilando la regla nueva después en el archivo.
- **Eliminar `socialStrip` de `script.js` en vez de dejarlo como no-op.** Con `?.` ya no rompe nada si el elemento no existe, pero es código muerto — mismo criterio de limpieza usado en cambios anteriores de esta sesión (Cultura, carrete de Fragata).

## Risks / Trade-offs

- [Riesgo: `.footer-links` (compartida entre la nav "Guía de la página" y la nueva nav de redes) podría necesitar ajustes de `flex-wrap`/`gap` para acomodar badges más anchos que texto plano] → Mitigación: verificación visual en mobile/tablet/desktop en las 3 páginas como parte de las tareas; `.footer-links` ya usa flex-wrap (confirmado en la investigación previa), así que debería acomodar el contenido más ancho sin romperse, pero se verifica de todas formas.
