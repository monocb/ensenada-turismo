## ADDED Requirements

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
