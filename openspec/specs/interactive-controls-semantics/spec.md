# interactive-controls-semantics Specification

## Purpose
Requisitos surgidos de la revision contra las Web Interface Guidelines (2026-10-08).
## Requirements
### Requirement: Lo que se activa es un control real

Todo elemento que dispare una acción SHALL ser un control nativo —`<button>` para acciones, `<a>` para navegación— y no un elemento genérico o una imagen con rol e índice de tabulación agregados.

#### Scenario: Las fotos que abren el visor son botones

- **WHEN** se inspecciona una foto que al activarse abre el visor ampliado
- **THEN** el elemento activable es un `<button>` real, no una imagen con `role` y `tabindex`

#### Scenario: Los overlays que cierran un diálogo son controles

- **WHEN** un diálogo se puede cerrar tocando el fondo
- **THEN** ese fondo es un control real, o el cierre se ofrece además mediante un control real y la tecla de escape

### Requirement: El nombre accesible describe la acción, no el contenido

El nombre accesible de un control SHALL describir lo que hace, no lo que muestra. Cuando el control envuelve una imagen, la descripción de la imagen SHALL quedar disponible sin reemplazar al nombre de la acción.

#### Scenario: Una foto ampliable se anuncia por su acción

- **WHEN** un lector de pantalla llega a una foto que se puede ampliar
- **THEN** anuncia la acción de ampliarla junto con qué foto es, en lugar de leer sólo la descripción de la imagen

#### Scenario: Cada foto de una galería se distingue de las demás

- **WHEN** se recorren con el teclado las fotos de una misma galería
- **THEN** el nombre accesible de cada una permite distinguirla de sus vecinas

### Requirement: Los cambios de contenido asincrónicos se anuncian

Cuando una acción reemplace contenido sin recargar la página, el cambio SHALL anunciarse a las tecnologías de asistencia.

#### Scenario: Navegar entre fotos del visor

- **WHEN** alguien avanza o retrocede entre las fotos del visor ampliado
- **THEN** un lector de pantalla anuncia la foto nueva sin que la persona tenga que ir a buscarla
