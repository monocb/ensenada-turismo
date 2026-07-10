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

### Requirement: La sección Cultura muestra sus fotos correctamente
El carrusel de la sección "Cultura, música y encuentros" SHALL cargar y mostrar las 6 fotos que lo componen al navegarlo con los controles siguiente/anterior.

#### Scenario: Navegar el carrusel de Cultura
- **WHEN** un usuario hace clic repetidamente en `[data-carousel-next]` dentro de la sección `#cultura`
- **THEN** cada foto del carrusel carga (`naturalWidth > 0`) y se muestra sin espacios en blanco ni imágenes rotas
