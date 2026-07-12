## Why

`docs/pendientes/performance.md` marca `srcset` como resuelto solo para el hero, y deja explícitamente pendiente "el resto de las imágenes del sitio (Fragata, Historia, Cultura, galerías dinámicas de en-fotos)". Medido el ancho renderizado real (Puppeteer, 4 anchos de viewport) de cada grupo restante:

- **Fragata** (`.fragata-hero img` + `.fragata-reel img`, 8 archivos únicos, 1600×1200 cada uno): el banner renderiza 354-1233px CSS, el carrete 340-792px — hoy ambos sirven siempre el archivo completo de 1600px.
- **Cultura** (`.culture-slide img`, 6 archivos, 1400-1600px de ancho): renderiza apenas 249-357px CSS en cualquier viewport (es un carrusel de varias columnas, no se ensancha con la pantalla) — el mayor desperdicio proporcional de este grupo.

Ambos son HTML estático simple (mismo patrón que el hero: atributo `srcset`/`sizes` en `<img>` existentes, sin tocar JS), por eso se agrupan en este cambio. Las galerías dinámicas de en-fotos (generadas por `script.js`, 49 fotos) y el resto de imágenes menores (place-cards, brand-line-grid, video-panel — archivos ya chicos, menor margen de ahorro) quedan fuera de este alcance, para cambios futuros aparte.

## What Changes

- Generar 3 variantes por archivo (480w/900w/1400w + original como la más grande) para las 8 imágenes de Fragata y las 6 de Cultura — mismo comando `ffmpeg` ya documentado en `docs/tecnico/generar-variantes-responsive.md`.
- Agregar `srcset` a los `<img>` de `.fragata-hero`, `.fragata-reel` y `.culture-slide` en `index.html`.
- `sizes` específico por grupo (no `100vw`, a diferencia del hero — estas imágenes no son full-bleed): calculado a partir del ancho renderizado medido en cada breakpoint real del sitio.

## Capabilities

### Modified Capabilities
- `responsive-hero-images`: se extiende para cubrir Fragata y Cultura además del hero (la capability ya documenta el patrón general de imágenes responsive del sitio).

## Impact

- Archivos nuevos: 42 variantes de imagen (14 archivos × 3 anchos), generadas y revisadas visualmente antes de esta propuesta.
- Archivo modificado: `index.html` (los `<img>` de Fragata y Cultura).
- No afecta CSS ni JS — mismo patrón que el hero, solo atributos en `<img>` existentes.
- Riesgo: bajo, mismo patrón ya validado en producción con el hero.
