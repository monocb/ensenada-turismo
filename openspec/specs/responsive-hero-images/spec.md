## Purpose

TBD - created by syncing change add-hero-image-srcset. Update Purpose after archive.

## Requirements

### Requirement: Las imágenes del hero sirven la resolución apropiada según el ancho del viewport
Cada `<img class="hero-image hero-slide">` SHALL declarar `srcset` con variantes de 480w, 900w, 1400w y el archivo original, más `sizes="100vw"`, para que el navegador descargue solo la resolución necesaria según el ancho real del viewport y el `devicePixelRatio` del dispositivo.

#### Scenario: Viewport angosto (mobile, DPR 1)
- **WHEN** un usuario carga el sitio en un viewport de 375px de ancho con `devicePixelRatio: 1`
- **THEN** el navegador descarga la variante de 480w en lugar del archivo original

#### Scenario: Viewport angosto con alta densidad de píxeles (mobile, DPR 3)
- **WHEN** un usuario carga el sitio en un viewport de 375-430px de ancho con `devicePixelRatio: 3`
- **THEN** el navegador descarga la variante de 1400w en lugar de una resolución insuficiente para esa densidad

#### Scenario: Viewport ancho (desktop)
- **WHEN** un usuario carga el sitio en un viewport de escritorio grande (≥1400px CSS)
- **THEN** el navegador descarga el archivo original de mayor resolución

#### Scenario: Sin regresión visual
- **WHEN** se compara cualquier variante generada (480w/900w/1400w) contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad, incluida la foto nocturna (`portada-03-camino-noche`), la más propensa a artefactos de compresión en sombras

### Requirement: Las imágenes de Fragata y Cultura sirven la resolución apropiada según su ancho renderizado
Los `<img>` de `.fragata-hero`, `.fragata-reel` y `.culture-slide` SHALL declarar `srcset` con variantes de 480w, 900w, 1400w y el archivo original, más un `sizes` que refleje el ancho real renderizado de cada grupo (no `100vw`, ya que ninguno es full-bleed).

#### Scenario: Fragata hero en un viewport angosto
- **WHEN** un usuario carga la sección Fragata en un viewport de 375px de ancho
- **THEN** el navegador descarga una variante acorde a los ~354px renderizados (480w), no el archivo original de 1600px

#### Scenario: Carrete de Fragata en cualquier viewport
- **WHEN** un usuario ve el carrete de fotos de la Fragata (ancho renderizado 340-792px según el viewport)
- **THEN** el navegador descarga la variante correspondiente al ancho real de esa miniatura, no siempre el archivo completo

#### Scenario: Carrusel de Cultura en desktop
- **WHEN** un usuario ve el carrusel de Cultura en un viewport de escritorio (ancho renderizado medido: 249-357px, no crece con el viewport)
- **THEN** el navegador descarga la variante de 900w o menor, no el archivo original de 1400-1600px

#### Scenario: Sin regresión visual
- **WHEN** se compara cualquier variante generada contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad (verificado visualmente antes de esta propuesta)

### Requirement: Las imágenes de place-cards, brand-line-grid y video-panel sirven la resolución apropiada según su ancho renderizado
Los `<img>` de `.place-media`, `.brand-line` y `.youtube-lite-button` SHALL declarar `srcset` con variantes ajustadas al ancho original de cada archivo (sin generar escalones iguales o mayores al original), más un `sizes` que refleje el ancho real renderizado.

#### Scenario: Place-card en cualquier viewport
- **WHEN** un usuario ve una tarjeta de lugar (ancho renderizado medido: 224-379px, no lineal con el viewport)
- **THEN** el navegador descarga la variante de 480w, no el archivo original

#### Scenario: Brand-line-grid en desktop grande
- **WHEN** un usuario ve la grilla de líneas de marca en un viewport ≥1600px (ancho renderizado ~617px)
- **THEN** el navegador descarga una variante de al menos 620px de ancho efectivo, no necesariamente el archivo original completo

#### Scenario: Video panel en mobile
- **WHEN** un usuario ve el panel de video del Fuerte Barragán en un viewport ≤480px (ancho renderizado ~340px)
- **THEN** el navegador descarga la variante de 480w, no el archivo original de 1224px

#### Scenario: Sin regresión visual (place-cards, brand-line, video-panel)
- **WHEN** se compara cualquier variante generada contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad (verificado visualmente antes de esta propuesta)

### Requirement: Las fotos de las galerías dinámicas de en-fotos sirven la resolución apropiada según su ancho renderizado
`setupPhotoReelSection()` en `script.js` SHALL generar cada `<img>` con `srcset` (variantes 480w/900w) y `sizes` acorde al ancho renderizado real (~260px), en vez de servir siempre el archivo original completo. La variante de mayor ancho SHALL nunca exceder el ancho real del archivo original (sin upscale).

#### Scenario: Foto de una galería en cualquier viewport
- **WHEN** un usuario ve una foto dentro de `.photos-reel-card` (ancho renderizado medido: 230-260px, estable en cualquier viewport)
- **THEN** el navegador descarga la variante de 480w o 900w, no el archivo original (1800px o más)

#### Scenario: Foto angosta de parroquia-el-dique
- **WHEN** se genera la variante "900w" para una foto cuyo archivo original es más angosto que 900px (ej. 833px)
- **THEN** el archivo generado no excede el ancho real del original — nunca se agranda una imagen

#### Scenario: Sin regresión visual (en-fotos)
- **WHEN** se compara cualquier variante generada contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad, incluida una foto nocturna (verificado visualmente antes de esta propuesta)
