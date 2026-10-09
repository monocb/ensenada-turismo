## MODIFIED Requirements

### Requirement: Todo contenido temporal está delimitado por comentarios marcadores

El contenido publicado con fecha de vencimiento (campañas, eventos, convocatorias) SHALL quedar encerrado entre comentarios marcadores de apertura y cierre en cada archivo que lo contenga (la página HTML, la hoja de `assets/css/` que corresponda y `script.js`), con un identificador de bloque idéntico en todos los archivos.

El requisito nombraba `styles.css` como la hoja única del sitio. Con el CSS repartido en una capa compartida más una hoja por página, un bloque temporal puede tocar la hoja de la página donde se publica, la capa compartida si agrega algo transversal, o las dos.

#### Scenario: Localizar todo el contenido temporal de un bloque

- **WHEN** se busca el identificador del bloque en el repositorio con `grep -rn "<identificador>" index.html en-fotos/index.html 404.html assets/css/ script.js`
- **THEN** se obtienen los pares de marcadores de apertura y cierre de cada archivo involucrado, sin omitir ninguno

#### Scenario: El marcador declara su fecha de baja prevista

- **WHEN** se lee el comentario de apertura de un bloque temporal
- **THEN** indica qué es el bloque, desde cuándo está publicado, cuándo se prevé darlo de baja y dónde está documentado el procedimiento
