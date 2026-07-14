## ADDED Requirements

### Requirement: El lightbox muestra un botón de descarga cuando la foto activa lo soporta
El lightbox compartido (`.image-lightbox`) SHALL incluir un botón/link de descarga que permanece oculto por defecto, y SHALL mostrarse únicamente cuando el `<img>` de origen de la foto activa tenga un atributo `data-download`. Cuando se muestra, el botón SHALL apuntar (`href` + `download`) al archivo referenciado por ese atributo — la versión de mayor resolución disponible, no necesariamente la que el navegador esté mostrando en pantalla (`currentSrc`).

#### Scenario: Foto de Fragata con descarga disponible
- **WHEN** un usuario abre el lightbox desde una de las 8 fotos de fondo de la sección Fragata
- **THEN** el botón de descarga es visible y descarga el archivo de resolución completa (no una variante `-480w`/`-900w`/`-1400w`)

#### Scenario: Foto de otra galería sin descarga
- **WHEN** un usuario abre el lightbox desde una place-card, una foto de `en-fotos` u otra galería sin `data-download`
- **THEN** el botón de descarga no es visible

#### Scenario: Navegar entre fotos con y sin descarga dentro del mismo lightbox
- **WHEN** un usuario usa prev/next dentro del lightbox y pasa de una foto con `data-download` a una sin ese atributo
- **THEN** el botón de descarga se oculta al llegar a la foto sin el atributo

### Requirement: El lightbox no muestra información superpuesta sobre la foto
El lightbox compartido (`.image-lightbox`) SHALL mostrar únicamente la imagen ampliada y sus controles (cerrar, anterior/siguiente, descarga cuando corresponda). SHALL NOT mostrar título, ubicación ni descripción de la foto en ningún momento, para ninguna galería del sitio.

#### Scenario: Abrir cualquier foto del sitio en el lightbox
- **WHEN** un usuario abre una foto de cualquier galería (Fragata, place-cards, en-fotos) en el lightbox
- **THEN** solo se ve la foto ampliada, sin ningún texto de título, ubicación o descripción superpuesto
