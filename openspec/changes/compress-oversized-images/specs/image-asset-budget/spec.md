## ADDED Requirements

### Requirement: Ninguna imagen del repositorio supera 500KB
Los archivos de imagen en `assets/` SHALL pesar 500KB o menos, verificable con `find assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -size +500k`.

#### Scenario: Verificación de peso de imágenes
- **WHEN** se ejecuta `find assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -size +500k` sobre el repositorio
- **THEN** el comando no devuelve ningún resultado

### Requirement: La compresión no introduce degradación visual perceptible
Las imágenes recomprimidas SHALL verse visualmente equivalentes a las originales al inspeccionarlas a tamaño de renderizado normal (no en zoom extremo).

#### Scenario: Revisión visual de una imagen recomprimida
- **WHEN** se compara una imagen recomprimida contra su versión original a tamaño de pantalla normal
- **THEN** no se detectan artefactos de compresión (bloques, bandas de color, borrosidad) a simple vista
