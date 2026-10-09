## Purpose

TBD - created by syncing change make-fragata-reel-keyboard-accessible. Update Purpose after archive.

## Requirements

### Requirement: Las fotos de fondo de la Fragata son operables por teclado
Cada foto de `.fragata-gallery` SHALL ser un control real alcanzable con la tecla Tab y SHALL abrir el lightbox al activarse con teclado o con el mouse. El nombre accesible del control SHALL describir la acción de ampliar la foto.

#### Scenario: Navegar y abrir una foto de fondo de la Fragata por teclado
- **WHEN** un usuario navega con Tab hasta una foto de `.fragata-gallery` y presiona Enter o Espacio
- **THEN** el lightbox se abre mostrando esa imagen, igual que al hacer clic

#### Scenario: El foco es visible
- **WHEN** una foto de `.fragata-gallery` recibe foco de teclado
- **THEN** se muestra un anillo de foco visible alrededor del control

#### Scenario: Se anuncia como acción, no como imagen
- **WHEN** un lector de pantalla llega a una foto de `.fragata-gallery`
- **THEN** anuncia que se trata de un control para ampliar esa foto, no solamente la descripción de la imagen

### Requirement: El ciclado automático de la galería se puede pausar

La galería de fondo de la Fragata se cicla sola. Mientras ese movimiento esté activo, SHALL existir un control visible que permita pausarlo, y el estado elegido SHALL mantenerse mientras dure la visita.

#### Scenario: Pausar el ciclado

- **WHEN** alguien activa el control de pausa de la galería
- **THEN** las fotos dejan de cambiar solas y el control pasa a ofrecer reanudar

#### Scenario: Sin movimiento, sin control que estorbe

- **WHEN** la persona tiene activada la preferencia de movimiento reducido
- **THEN** la galería no se cicla sola y no se ofrece un control de pausa para algo que no se mueve

#### Scenario: El control es alcanzable por teclado

- **WHEN** alguien recorre la sección con el teclado
- **THEN** el control de pausa recibe foco visible y se activa con Enter o Espacio
