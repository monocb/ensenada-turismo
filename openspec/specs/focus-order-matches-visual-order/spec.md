# focus-order-matches-visual-order Specification

## Purpose
Requisitos surgidos de la revision contra las Web Interface Guidelines (2026-10-08).
## Requirements
### Requirement: El orden de tabulación coincide con el orden visual

En cada página, el orden en que los elementos reciben el foco con el teclado SHALL coincidir con el orden en que se leen en pantalla. Ninguna técnica de maquetado SHALL separar ambos órdenes.

#### Scenario: Recorrido con teclado de punta a punta

- **WHEN** alguien tabula desde el principio hasta el final de una página
- **THEN** el foco avanza siempre hacia abajo en la pantalla, sin saltar a una sección posterior y volver atrás

#### Scenario: El orden del documento es el orden visual

- **WHEN** se compara el orden de las secciones en el HTML con el orden en que aparecen en pantalla
- **THEN** son el mismo, en todos los anchos de viewport

#### Scenario: Sin reordenamiento visual de secciones

- **WHEN** se inspecciona el CSS de la maquetación de secciones
- **THEN** no hay propiedades que cambien el orden visual respecto del orden del documento

### Requirement: Existe un salto al contenido principal

Cada página SHALL ofrecer, como primer elemento enfocable, un enlace que lleve directamente al contenido principal y que sea visible al recibir el foco.

#### Scenario: Saltar la navegación

- **WHEN** alguien tabula una sola vez desde el inicio de la página
- **THEN** recibe el foco un enlace visible que permite saltar al contenido principal, y activarlo mueve el foco allí

#### Scenario: No estorba a quien no lo necesita

- **WHEN** la página se usa con mouse
- **THEN** el enlace de salto no es visible
