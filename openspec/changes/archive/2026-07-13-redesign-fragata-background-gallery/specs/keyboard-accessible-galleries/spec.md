## REMOVED Requirements

### Requirement: Las fotos del carrete de la Fragata son operables por teclado
**Reason**: El carrete visible de la Fragata (`.fragata-reel`) se elimina — las 8 fotos pasan a ser un fondo rotativo decorativo (`.fragata-hero-slide`), sin interacción de ningún tipo (ni mouse ni teclado). Ya no hay nada que "operar por teclado" en esa galería.
**Migration**: Ninguna — no reemplaza a otro requirement de accesibilidad; la galería de fondo es `aria-hidden` y no forma parte del orden de tabulación.

Cada imagen dentro de `.fragata-reel` SHALL ser alcanzable con la tecla Tab y SHALL abrir el lightbox al presionar Enter o Espacio, igual que con un clic de mouse.

#### Scenario: Navegar y abrir una foto del carrete de la Fragata por teclado
- **WHEN** un usuario navega con Tab hasta una imagen dentro de `.fragata-reel` y presiona Enter o Espacio
- **THEN** el lightbox se abre mostrando esa imagen, igual que al hacer clic

#### Scenario: El foco es visible
- **WHEN** una imagen de `.fragata-reel` recibe foco de teclado
- **THEN** se muestra un anillo de foco visible alrededor de la imagen
