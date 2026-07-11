## Why

`docs/pendientes/accesibilidad.md` señalaba "Contraste de texto sobre imágenes — no verificado todavía con una herramienta de medición real". Se midió con Puppeteer (sampleo de píxeles reales del fondo, no estimación) en los 4 lugares donde hay texto superpuesto a una imagen, en desktop y mobile:

- Hero h1 "ENSENADA": 14-20:1 (excelente).
- Fragata hero h2: ~19:1 (excelente).
- Culture-slide figcaptions: 12-20:1 (excelente).
- **Hero tagline** ("Tiene algo que solo tiene Ensenada."): el efecto "resaltador" (`.hero-content p.hero-tagline span`, `background-image: linear-gradient(transparent 58%, rgba(255, 207, 47, 0.96) 58%)`) pone texto blanco sobre una franja dorada opaca en el tercio inferior de cada línea. Ahí el contraste medido cae a ~1.5:1, muy por debajo del mínimo WCAG (3:1 para texto grande/bold). Verificado visualmente con zoom 2-3x: sigue siendo legible por el peso de fuente muy bold (900+), pero no cumple el estándar.

## What Changes

- Agregar `text-shadow` oscuro y sutil al texto de `.hero-content p.hero-tagline span`, para subir el contraste efectivo en la franja dorada sin cambiar el color del texto (blanco) ni el tono del resaltador dorado (`rgba(255, 207, 47, 0.96)`) — mantiene el look de marca intacto.
- Aplicar el mismo tratamiento en todos los breakpoints donde se redeclara el `background-image` del resaltador (mobile ≤430px, ≤370px).
- Documentar en `docs/pendientes/accesibilidad.md` los 4 resultados de la medición (3 ya cumplían, 1 corregido acá).

## Capabilities

### New Capabilities
- `text-contrast-over-images`: el texto superpuesto a imágenes en el sitio cumple el contraste mínimo WCAG (3:1 para texto grande/bold, 4.5:1 para texto normal), verificable con medición de píxeles reales.

## Impact

- Archivo modificado: `styles.css` (regla `.hero-content p.hero-tagline span` y sus redeclaraciones en media queries).
- Archivo modificado: `docs/pendientes/accesibilidad.md`.
- No afecta el resto del sitio — cambio acotado a un único selector.
- Riesgo: bajo. `text-shadow` es puramente visual/aditivo, no cambia layout ni JS.
