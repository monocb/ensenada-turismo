## MODIFIED Requirements

### Requirement: Las imágenes de Fragata sirven la resolución apropiada según su ancho renderizado
Los `<img>` de `.fragata-hero` (incluida la galería de fondo rotativa de 8 fotos, `.fragata-hero-slide`) SHALL declarar `srcset` con variantes de 480w, 900w, 1400w y el archivo original, más un `sizes` que refleje el ancho real renderizado del contenedor (no `100vw`, ya que `.fragata-hero` no es full-bleed).

#### Scenario: Fragata hero en un viewport angosto
- **WHEN** un usuario carga la sección Fragata en un viewport de 375px de ancho
- **THEN** el navegador descarga una variante acorde a los ~354px renderizados (480w), no el archivo original de 1600px

#### Scenario: Galería de fondo de Fragata en cualquier viewport
- **WHEN** un usuario ve la sección Fragata en cualquier viewport
- **THEN** las 8 imágenes de la galería de fondo descargan la variante acorde al ancho renderizado del contenedor `.fragata-hero` (mismo criterio de `sizes` que la imagen de portada), no siempre el archivo original completo

#### Scenario: Sin regresión visual
- **WHEN** se compara cualquier variante generada contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad (verificado visualmente antes de esta propuesta)
