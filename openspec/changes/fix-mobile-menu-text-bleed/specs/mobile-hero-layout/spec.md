## ADDED Requirements

### Requirement: El panel del menú mobile abierto es completamente opaco al contenido del hero
Mientras el menú mobile está abierto (`.main-nav.is-open`), ningún contenido de la sección hero (título, tagline u otro elemento de `.hero-content`) SHALL pintarse visualmente por encima del panel del menú en la zona donde ambos se superponen.

#### Scenario: Menú abierto sobre el hero
- **WHEN** un usuario abre el menú mobile estando en la página de inicio, con el hero visible detrás
- **THEN** el panel del menú cubre completamente el contenido del hero en su área — ningún texto del hero (título, tagline) es legible por encima del panel

#### Scenario: Verificación en múltiples anchos
- **WHEN** se abre el menú mobile en viewports de 320px, 375px y 414px de ancho
- **THEN** en los tres casos el panel del menú es completamente opaco al contenido detrás, sin excepciones por ancho de pantalla
