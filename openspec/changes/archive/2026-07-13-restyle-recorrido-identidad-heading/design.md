## Context

`.route-copy h2` tiene ~10 declaraciones dispersas en `styles.css` (líneas 451, 1681, 1792, 2085, 2947, 3080, 3341, 3399, 3576, 3721, 6113, 6535 aprox.), con distintos `clamp()` y colores según breakpoint/layout (variante mobile centrada vs. variante desktop `sticky`), algunas con `!important`. `styles.css` es un archivo de ~7.9k líneas crecido a base de parches puntuales fechados — CLAUDE.md pide no reorganizarlo ampliamente.

Se usó el skill `impeccable` (register `brand`, DESIGN.md del proyecto) para determinar el tratamiento visual: la palabra que crece es "IDENTIDAD", no "ENSENADA" (que sigue siendo la palabra protagonista del sitio en el hero), así que no compite con la regla de marca "la palabra ENSENADA es protagonista". El límite de tamaño de heading del sistema (`clamp() max ≤ 96px`) y el piso de `letter-spacing` (`≥ -0.04em`) del skill se respetan con los valores elegidos (max 88px, tracking -0.01em).

## Goals / Non-Goals

**Goals:**
- "IDENTIDAD" reemplaza visualmente al título negro, en el color/tipografía del eyebrow, agrandado, sin romper el heading semántico de la sección.
- No reescribir ni reorganizar las reglas `.route-copy h2` existentes — solo agregar un override final que gane la cascada.

**Non-Goals:**
- No se rediseña el resto de la sección `#recorrido` (place-cards, layout sticky en desktop).
- No se consolidan las ~10 declaraciones dispersas de `.route-copy h2` en una sola regla — eso sería la reorganización amplia que CLAUDE.md pide evitar.

## Decisions

- **Mantener el `<h2>` en vez de borrarlo, re-estilizándolo para mostrar "IDENTIDAD".** La sección `#recorrido` no tiene `aria-labelledby` ni otro heading — es el único encabezado semántico. Eliminarlo sin reemplazo (la lectura literal del pedido "sacar el título") dejaba la sección sin heading accesible. Re-estilizar el `<h2>` existente para mostrar "IDENTIDAD" cumple el pedido visual (el título negro grande desaparece) sin esa regresión.
- **Agregar un único override final con `!important` en vez de tocar las ~10 declaraciones existentes de `.route-copy h2`.** Editar cada una individualmente es frágil (distintos breakpoints, layout sticky vs. mobile) y viola la convención del repo de parches puntuales. Un bloque final con `!important` en `color`, `font-size`, `font-weight`, `letter-spacing`, `line-height`, `text-transform` gana la cascada en todos los breakpoints con una sola regla `clamp()` fluida (no hace falta repetirla por media query).
- **`font-size: clamp(44px, 7.5vw, 88px)`.** Techo de 88px, por debajo del límite de 96px (`6rem`) que marca el skill `impeccable` para headings. Un poco más grande que la escala "headline" del DESIGN.md del proyecto (`clamp(32px, 5vw, 66px)`) porque esta palabra sola carga todo el peso visual que antes tenían el eyebrow + el h2 combinados.
- **`letter-spacing: -0.01em` en vez de heredar el `0.14em` del eyebrow.** Ese tracking está pensado para texto de 12px; a 44-88px un tracking tan abierto se ve roto (letras separadas artificialmente). -0.01em está dentro del piso permitido (`≥ -0.04em`) y da una lectura sólida para texto pesado (900) en mayúsculas.
- **Color `#b8440b` literal (no una nueva variable CSS).** Es el mismo valor que ya usa `.route-copy .eyebrow` en una sola declaración sin variable — coherente con el patrón existente del archivo (muchos colores puntuales sin tokenizar). No se introduce una variable nueva para un solo uso adicional.
- **Actualizar la prosa de `place-card-visual-consistency/spec.md` en el mismo cambio.** Es una referencia de texto que queda desactualizada por este cambio (menciona la sección por su nombre viejo); corregirla evita que quede documentación confusa, sin que sea un cambio de requirement (el spec sigue testeando el `border-radius` de las place-cards, no el copy del heading).

## Risks / Trade-offs

- [Riesgo: el override con `!important` se suma a una cascada ya compleja de `!important` en `.route-copy h2`, dificultando el próximo cambio en esta sección] → Mitigación: comentario fechado explicando que es la regla final que gana, siguiendo el patrón ya establecido en el archivo (ej. "Puesta a punto responsive final 2026-07-04").
- [Riesgo: "IDENTIDAD" sola, sin las 3-4 líneas del h2 anterior, deja la sección con menos densidad de texto antes de las place-cards] → Mitigación: aceptado como parte del pedido explícito del cliente; el tamaño elegido (44-88px) compensa la pérdida de líneas con más peso visual por palabra.
