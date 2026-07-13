## Why

`/impeccable audit` sobre `404.html` (2026-07-12, snapshot en `.impeccable/critique/2026-07-12T23-32-39Z__404-html.md`) encontró que la página **nunca carga la tipografía Inter** — a diferencia de `index.html` y `en-fotos/index.html`, no tiene los `<link>` de Google Fonts en su `<head>`, así que renderiza en Arial de fallback en vez del Inter en pesos extremos que `DESIGN.md` documenta como "siempre el elemento con más fuerza visual de cualquier pantalla". Además, el eyebrow "ENSENADA" hereda el rojo de alerta (`--brand-red`, reservado para la línea "En Vivo") en vez del dorado de marca, por el mismo tipo de bug de cascada CSS que se corrige en `fix-visual-consistency-home` para `index.html` — una regla sitewide sin scope (`.eyebrow, .feature-kicker, .story-label { color: var(--brand-red) }`) le gana a la regla base de `.eyebrow`.

## What Changes

- Agregar a `404.html` los mismos 3 tags de Google Fonts que ya tienen `index.html` (líneas 57-61) y `en-fotos/index.html`: `preconnect` a `fonts.googleapis.com`, `preconnect` a `fonts.gstatic.com`, y el `<link>` de la hoja de estilos de Inter.
- Agregar una regla `.not-found .eyebrow { color: var(--gold); }` (o equivalente con scope) para que el eyebrow "ENSENADA" no dependa de qué regla sitewide gane la cascada en el futuro.

Fuera de alcance (candidatos a propuestas separadas, no de consistencia visual):
- Falta de enlaces a redes sociales/navegación en la página (problema de conversión, mismo tema que en `en-fotos`).
- Copy genérico sin voz de marca ("El contenido que buscás no está disponible...").
- Riesgo de recorte del `<h1>` en viewports menores a 360px (responsive).
- Imagen de fondo sin variante WebP (performance).
- Duplicación de tokens de dorado (`--brand-yellow` #ffd43d vs. el dorado "resaltador" #ffcf4a/#ffcf2f de `DESIGN.md`) — el propio audit nota que esto **no es específico de esta página**, es un patrón ya establecido en el resto del sitio; corregirlo acá sin tocar el resto sería inconsistente en sí mismo, así que queda fuera hasta que se aborde sitewide.

## Capabilities

### New Capabilities
- `notfound-page-typography`: `404.html` carga la tipografía Inter igual que el resto del sitio, en vez de caer a Arial por fallback.

### Modified Capabilities
- `eyebrow-color-consistency`: se agrega el caso de `404.html` (el eyebrow "ENSENADA" hereda el rojo de "En Vivo" en vez del dorado) a la capability introducida por `fix-visual-consistency-home` para el mismo tipo de bug en `index.html`.

## Impact

- Archivo de código afectado: `404.html` (agregar 3 `<link>` tags), `styles.css` (una regla nueva con scope).
- No afecta JS. No afecta otras páginas.
- Riesgo: muy bajo — agregar tags de fuente y una regla de color con scope no tiene efectos secundarios conocidos.
