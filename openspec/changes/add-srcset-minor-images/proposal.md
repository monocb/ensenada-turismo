## Why

Último grupo de imágenes menores señalado en `docs/pendientes/performance.md`: place-cards, brand-line-grid y video-panel. Medido el ancho renderizado real (Puppeteer, 4 anchos de viewport):

- **Place-card media** (`.place-media img`, 3 archivos: `el-dique.jpg` 960w, `ensenada-centro.jpg` 887w, `punta-lara.jpg` 1100w): renderiza 224-379px CSS.
- **Brand-line-grid** (`.brand-line img`, 4 usos, 3 archivos nuevos a generar — el cuarto, `cultura-publico.jpg`, ya tiene variantes del ciclo anterior): renderiza 353-617px CSS.
- **Video-panel thumbnail** (`.youtube-lite-button img`, `fuerte-barragan.jpg` 1224w, reusado del brand-line-grid): renderiza 340-737px CSS.

Estos archivos ya son más chicos que los de Fragata/Cultura (887-1600px de ancho original, 85-434KB) — el ahorro proporcional es menor, pero sigue habiendo desperdicio real: por ejemplo `1911-fuerte-barragan.jpg` (1600px, 434KB) se sirve completo en una tarjeta de 353-617px.

## What Changes

- Generar variantes por archivo, con anchos ajustados a cada original (sin generar un escalón mayor o igual al ancho real del archivo):
  - `el-dique.jpg` (960w) → 480w + original.
  - `ensenada-centro.jpg` (887w) → 480w + original.
  - `punta-lara.jpg` (1100w) → 480w/900w + original.
  - `aerea-costa-punta-lara.jpg` (1280w) → 480w/900w + original.
  - `1911-fuerte-barragan.jpg` (1600w) → 480w/900w/1400w + original.
  - `fuerte-barragan.jpg` (1224w) → 480w/900w + original.
  - `cultura-publico.jpg`: reutiliza las variantes ya generadas en el ciclo anterior (`add-srcset-fragata-cultura`), no se regenera.
- Agregar `srcset`/`sizes` a los `<img>` de `.place-media` (3), `.brand-line` (4, incluida la reutilización de `cultura-publico.jpg`) y `.youtube-lite-button` (1) en `index.html`.

## Capabilities

### Modified Capabilities
- `responsive-hero-images`: se extiende para cubrir place-cards, brand-line-grid y video-panel.

## Impact

- Archivos nuevos: 11 variantes de imagen (~724KB en total), generadas y revisadas visualmente antes de esta propuesta.
- Archivo modificado: `index.html` (8 `<img>`: 3 place-card + 4 brand-line + 1 video-panel).
- No afecta CSS ni JS.
- Riesgo: bajo, mismo patrón validado en los 2 ciclos anteriores (hero, Fragata/Cultura).
