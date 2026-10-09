# native-ui-theming Specification

## Purpose
Requisitos surgidos de la revision contra las Web Interface Guidelines (2026-10-08).
## Requirements
### Requirement: La interfaz nativa del navegador acompaña al tema

El sitio SHALL declarar su esquema de color para que los controles que dibuja el navegador —barras de scroll, campos nativos, menús— se rendericen acordes al tema y no en claro sobre un sitio oscuro.

#### Scenario: Barras de scroll en tema oscuro

- **WHEN** se abre una página del sitio
- **THEN** las barras de scroll y demás interfaz nativa se ven en el esquema oscuro del sitio

### Requirement: El toque se siente inmediato y deliberado

Los elementos interactivos SHALL responder al toque sin demora artificial y con un resaltado definido por el sitio, no con el que el navegador aplica por defecto.

#### Scenario: Sin demora al tocar

- **WHEN** alguien toca un control en un dispositivo táctil
- **THEN** la acción responde sin la espera que el navegador reserva para detectar doble toque

#### Scenario: Resaltado propio

- **WHEN** alguien toca un control en un dispositivo táctil
- **THEN** el resaltado es el que define el sitio, consistente entre controles

### Requirement: Los diálogos contienen su propio scroll

Mientras un diálogo está abierto, el scroll SHALL quedar contenido dentro de él y SHALL no encadenarse con el de la página de atrás.

#### Scenario: Llegar al final del contenido de un diálogo

- **WHEN** alguien hace scroll dentro de un diálogo hasta su límite y sigue
- **THEN** la página de atrás no se mueve

### Requirement: Las imágenes de los diálogos reservan su espacio

Las imágenes que se cargan dinámicamente dentro de un diálogo SHALL tener su espacio reservado antes de cargar, para que el contenido no salte al aparecer.

#### Scenario: Abrir el visor ampliado

- **WHEN** se abre el visor con una foto
- **THEN** el contenido del diálogo no se reacomoda cuando la imagen termina de cargar
