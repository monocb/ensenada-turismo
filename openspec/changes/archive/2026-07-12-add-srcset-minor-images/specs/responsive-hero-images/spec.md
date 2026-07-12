## ADDED Requirements

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

#### Scenario: Sin regresión visual
- **WHEN** se compara cualquier variante generada contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad (verificado visualmente antes de esta propuesta)
