## Context

El cambio anterior (`restyle-recorrido-identidad-heading`, ya archivado) dejó `<p class="eyebrow">ENSENADA</p>` + `<h2>IDENTIDAD</h2>` dentro de `.route-copy`, con el `<h2>` ya re-estilizado en naranja `#b8440b` vía un override `!important` al final de `styles.css`. `.route-copy` aparece una sola vez en todo el sitio (confirmado por grep), así que `.route-copy h2::before` es un selector seguro sin riesgo de afectar otras secciones.

## Goals / Non-Goals

**Goals:**
- Sacar "ENSENADA" de la sección sin dejar un `<p class="eyebrow">` vacío en el DOM.
- Reponer el acento de línea naranja como una barra corta y centrada arriba de "IDENTIDAD", no un underline de ancho completo.

**Non-Goals:**
- No se toca `.eyebrow::before`/`.feature-kicker::before` (regla compartida, usada por Historia, Fragata y 404).
- No se reordena ni consolida el resto de las reglas `.route-copy h2` ya parcheadas.

## Decisions

- **Eliminar el `<p class="eyebrow">` en vez de vaciarlo o de `display:none`.** Un elemento vacío en el DOM es ruido para lectores de pantalla y para quien lea el HTML después; no hay razón para conservarlo si el texto que contenía desaparece del todo.
- **Barra vía `.route-copy h2::before` en vez de un elemento HTML nuevo.** Es puramente decorativo (no aporta información), así que un pseudo-elemento CSS es lo correcto — evita agregar markup sin significado semántico, siguiendo la misma convención que ya usa `.eyebrow::before` para su propia línea.
- **`background: currentColor` en vez de un color hardcodeado de nuevo.** El `<h2>` ya define `color: #b8440b !important` desde el cambio anterior; heredar con `currentColor` mantiene la barra sincronizada con ese color sin repetir el valor por segunda vez en el archivo.
- **Ancho fluido corto (`clamp(48px, 6vw, 84px)`) en vez de un ancho fijo único.** "IDENTIDAD" varía de ~200px a ~700px de ancho renderizado según el viewport (por el `clamp()` de `font-size` del `<h2>`); un ancho de barra fijo se vería proporcionalmente distinto en mobile vs. desktop. El `clamp()` la mantiene visualmente "corta respecto a la palabra" en todo el rango, sin necesitar calcularla en `%` del ancho real del texto (no directo en CSS puro sin JS).
- **`display:block; margin: 0 auto` en vez de `position:absolute`.** Como `.route-copy` ya está centrado (`text-align:center`) y el `<h2>` es el único hijo relevante en ese punto, un bloque centrado por margen evita tener que calcular offsets absolutos o depender del ancho real del texto — se centra respecto al contenedor, que visualmente coincide con el centro de la palabra porque el `<h2>` también está centrado.

## Risks / Trade-offs

- [Riesgo: la barra centrada respecto al *contenedor* (`.route-copy`, ancho completo) en vez de centrada respecto al *texto renderizado* de "IDENTIDAD" — como el `<h2>` también está centrado dentro de ese contenedor, coinciden visualmente, pero si en el futuro el `<h2>` dejara de estar centrado esto se desalinearía] → Mitigación: aceptado; `.route-copy` centra todo su contenido por diseño y no hay indicio de que eso vaya a cambiar.
