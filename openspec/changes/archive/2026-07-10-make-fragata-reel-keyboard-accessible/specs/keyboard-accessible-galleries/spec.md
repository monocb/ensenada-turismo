## ADDED Requirements

### Requirement: Las fotos del carrete de la Fragata son operables por teclado
Cada imagen dentro de `.fragata-reel` SHALL ser alcanzable con la tecla Tab y SHALL abrir el lightbox al presionar Enter o Espacio, igual que con un clic de mouse.

#### Scenario: Navegar y abrir una foto del carrete de la Fragata por teclado
- **WHEN** un usuario navega con Tab hasta una imagen dentro de `.fragata-reel` y presiona Enter o Espacio
- **THEN** el lightbox se abre mostrando esa imagen, igual que al hacer clic

#### Scenario: El foco es visible
- **WHEN** una imagen de `.fragata-reel` recibe foco de teclado
- **THEN** se muestra un anillo de foco visible alrededor de la imagen
