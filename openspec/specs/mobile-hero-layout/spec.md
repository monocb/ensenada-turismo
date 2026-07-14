## Purpose

TBD - created by syncing change verify-fix-mobile-bugs. Update Purpose after archive.

## Requirements

### Requirement: El título del hero no se recorta en viewports mobile
El `<h1>` de la sección hero SHALL renderizarse completo, sin recortarse ni desbordar su contenedor, en cualquier viewport entre 320px y 760px de ancho.

#### Scenario: Viewport de teléfono angosto (320px)
- **WHEN** se carga la página de inicio en un viewport de 320px de ancho
- **THEN** el ancho renderizado del texto "ENSENADA" es menor o igual al ancho disponible del contenedor `.hero h1`

#### Scenario: Viewport de teléfono típico (375-430px)
- **WHEN** se carga la página de inicio en un viewport entre 375px y 430px de ancho
- **THEN** el ancho renderizado del texto "ENSENADA" es menor o igual al ancho disponible del contenedor `.hero h1`

### Requirement: El menú mobile es funcional y usa un ícono de tres líneas
El botón de menú mobile SHALL mostrarse como un ícono estándar de tres líneas (no seis), y SHALL alternar `aria-expanded` entre `"false"` y `"true"` al hacer clic, mostrando la navegación.

#### Scenario: Abrir el menú mobile
- **WHEN** un usuario hace clic en el botón `[data-menu-button]` con `aria-expanded="false"`
- **THEN** el atributo cambia a `aria-expanded="true"` y la navegación `[data-menu]` se vuelve visible

### Requirement: El panel del menú mobile abierto es completamente opaco al contenido del hero
Mientras el menú mobile está abierto (`.main-nav.is-open`), ningún contenido de la sección hero (título, tagline u otro elemento de `.hero-content`) SHALL pintarse visualmente por encima del panel del menú en la zona donde ambos se superponen.

#### Scenario: Menú abierto sobre el hero
- **WHEN** un usuario abre el menú mobile estando en la página de inicio, con el hero visible detrás
- **THEN** el panel del menú cubre completamente el contenido del hero en su área — ningún texto del hero (título, tagline) es legible por encima del panel

#### Scenario: Verificación en múltiples anchos
- **WHEN** se abre el menú mobile en viewports de 320px, 375px y 414px de ancho
- **THEN** en los tres casos el panel del menú es completamente opaco al contenido detrás, sin excepciones por ancho de pantalla
