## Why

`docs/pendientes/performance.md` lista falta de `srcset` como el único ítem de performance que queda pendiente (el peso de imágenes >500KB y `loading="lazy"` ya se resolvieron en ciclos anteriores). Las 8 imágenes del hero (`assets/portada-home/`) se muestran a todo el ancho del viewport (`.hero-gallery { position: absolute; inset: 0 }`, full-bleed), pero hoy un celular descarga la imagen a resolución completa (1434-2200px de ancho, 150-420KB cada una) para mostrarla en una pantalla de 375-430px — más del doble del ancho necesario.

## What Changes

- Generar 3 variantes por cada una de las 8 imágenes del hero (480w, 900w, 1400w), manteniendo el archivo original como la variante más grande.
- Agregar `srcset` y `sizes="100vw"` a los 8 `<img class="hero-image hero-slide">` en `index.html`.
- **Alcance acotado a las 8 imágenes del hero** — es el grupo de mayor impacto (full-bleed, más pesadas) y menor riesgo (mismo patrón de markup en las 8, sin tocar `script.js` ni otras páginas). El resto de las imágenes del sitio (Fragata, Historia, Cultura, galerías de en-fotos generadas dinámicamente) quedan para un cambio futuro aparte.

## Capabilities

### New Capabilities
- `responsive-hero-images`: las imágenes del hero sirven la resolución apropiada según el ancho del viewport del dispositivo, en vez de siempre la resolución completa.

### Modified Capabilities
(ninguna)

## Impact

- Archivos nuevos: 24 variantes de imagen (`assets/portada-home/*-480w.webp`, `*-900w.webp`, `*-1400w.webp`), ~1.7MB en total.
- Archivo modificado: `index.html` (los 8 `<img>` del hero).
- No afecta CSS ni JS — el hero sigue rotando entre las mismas 8 imágenes, ahora con `srcset`.
- Riesgo: bajo. Generé y revisé visualmente las variantes antes de esta propuesta (incluida la foto nocturna, la más propensa a artefactos de compresión en sombras) — sin degradación visible.
