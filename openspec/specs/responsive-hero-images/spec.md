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
