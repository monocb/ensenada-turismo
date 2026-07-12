## Why

Último grupo de imágenes del sitio sin `srcset`: las 49 fotos de las 3 galerías dinámicas de `en-fotos/index.html` (`parroquia-el-dique` 19, `stella-maris-punta-lara` 10, `domingo-punta-lara` 20), generadas en tiempo de carga por `setupPhotoReelSection()` en `script.js` — no son `<img>` estáticos en el HTML.

Medido el ancho renderizado real (Puppeteer): `.photos-reel-card img` renderiza siempre 230-260px CSS, estable en cualquier viewport (no crece con la pantalla, es un carrete de miniaturas). Los archivos originales son 1800×1200 (stella-maris, domingo-punta-lara) o entre 833×556 y 1280×853 (parroquia-el-dique, con variación real dentro de la misma carpeta) — hoy siempre se sirve el archivo completo para una miniatura de ~250px.

## What Changes

- Generar 2 variantes por foto (480w + 900w) para las 49 fotos, en vez de las 3 del resto del sitio — el rango renderizado es angosto y estable (230-260px), 900w ya cubre con margen el peor caso (DPR 3 ≈ 780px).
- El escalón de 900w usa un ancho tope condicional (`min(900, ancho_original)`) para no agrandar (upscale) las fotos de `parroquia-el-dique` más angostas que 900px (mínimo real detectado: 833px) — nunca se agranda una imagen.
- Modificar `setupPhotoReelSection()` en `script.js` para generar `srcset`/`sizes` en cada `<img>` creado dinámicamente, además del `src` que ya genera hoy.

## Capabilities

### Modified Capabilities
- `responsive-hero-images`: se extiende para cubrir las galerías dinámicas de en-fotos, con generación de `srcset` en JavaScript en vez de HTML estático.

## Impact

- Archivos nuevos: 98 variantes de imagen (49 fotos × 2 anchos), ~3.5MB en total (vs. 6.6MB de los originales), generadas y revisadas visualmente antes de esta propuesta.
- Archivo modificado: `script.js` (`setupPhotoReelSection()`).
- No afecta CSS ni el mecanismo de carga (`loading="lazy"` se mantiene).
- Riesgo: bajo. Cambio acotado a una función ya existente, sin tocar el resto de `script.js`.
