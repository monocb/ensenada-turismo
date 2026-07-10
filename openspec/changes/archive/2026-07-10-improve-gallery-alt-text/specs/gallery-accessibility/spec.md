## ADDED Requirements

### Requirement: El alt de las fotos de galería incluye título y ubicación
Las imágenes generadas dinámicamente por `setupPhotoReelSection` SHALL incluir en su atributo `alt` el título de la sección y su ubicación cuando ambos datos estén disponibles en el `data-photo-title`/`data-photo-location` de la sección.

#### Scenario: Una sección de galería tiene título y ubicación definidos
- **WHEN** se renderiza una foto dentro de una sección con `data-photo-title="Domingo en Punta Lara"` y `data-photo-location="Punta Lara"`
- **THEN** el `alt` de la imagen incluye tanto "Domingo en Punta Lara" como "Punta Lara" (no solo el título)

### Requirement: Ninguna foto de galería recibe un alt genérico no descriptivo
Cuando una sección de galería no define `data-photo-title`, el sistema SHALL generar un `alt` derivado del identificador de la galería (`folder`/`prefix`) en vez de usar un texto fijo genérico como "Foto de Ensenada".

#### Scenario: Una sección de galería no define título
- **WHEN** se renderiza una foto dentro de una sección sin `data-photo-title`, con `data-photo-folder="ejemplo-lugar"`
- **THEN** el `alt` de la imagen se deriva de `"ejemplo-lugar"` (por ejemplo, "Ejemplo Lugar, foto 01") y no es el texto fijo "Foto de Ensenada"
