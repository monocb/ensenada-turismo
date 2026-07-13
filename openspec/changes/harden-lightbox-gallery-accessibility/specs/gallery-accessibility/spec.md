## ADDED Requirements

### Requirement: Cada foto de una galería tiene un aria-label distinguible de las demás
Los botones generados por `setupPhotoReelSection` en `en-fotos/index.html` SHALL tener un `aria-label` que incluya el número de foto, no solo el título de la sección (que es igual para todas las fotos de esa sección).

#### Scenario: Un lector de pantalla navega una galería
- **WHEN** un usuario de lector de pantalla tabula entre las fotos de una misma sección (ej. "Parroquia del Dique")
- **THEN** cada foto anuncia un nombre accesible distinto (ej. "Ampliar foto 03 de Parroquia del Dique"), no el mismo texto repetido
