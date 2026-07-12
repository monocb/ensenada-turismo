## ADDED Requirements

### Requirement: Las fotos de las galerías dinámicas de en-fotos sirven la resolución apropiada según su ancho renderizado
`setupPhotoReelSection()` en `script.js` SHALL generar cada `<img>` con `srcset` (variantes 480w/900w) y `sizes` acorde al ancho renderizado real (~260px), en vez de servir siempre el archivo original completo. La variante de mayor ancho SHALL nunca exceder el ancho real del archivo original (sin upscale).

#### Scenario: Foto de una galería en cualquier viewport
- **WHEN** un usuario ve una foto dentro de `.photos-reel-card` (ancho renderizado medido: 230-260px, estable en cualquier viewport)
- **THEN** el navegador descarga la variante de 480w o 900w, no el archivo original (1800px o más)

#### Scenario: Foto angosta de parroquia-el-dique
- **WHEN** se genera la variante "900w" para una foto cuyo archivo original es más angosto que 900px (ej. 833px)
- **THEN** el archivo generado no excede el ancho real del original — nunca se agranda una imagen

#### Scenario: Sin regresión visual
- **WHEN** se compara cualquier variante generada contra el archivo original a resolución equivalente
- **THEN** no hay degradación visible de calidad, incluida una foto nocturna (verificado visualmente antes de esta propuesta)
