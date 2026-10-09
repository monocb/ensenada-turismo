## Purpose

TBD - created by syncing change fix-visual-consistency-en-fotos. Update Purpose after archive.
## Requirements
### Requirement: Las galerías de En Fotos usan los tokens de color de la línea "Fotos"
Las secciones de carrete de `en-fotos/index.html` SHALL tomar su acento de color de la paleta declarada del Manual de Identidad, y SHALL usar el color del territorio que retrata cada carrete, en vez de valores hexadecimales sueltos o de tokens que la paleta vigente ya no define.

El requisito nombraba `--brand-cyan` y `--brand-lime`, que eran tokens de la paleta anterior al Manual de Identidad v3.0 y hoy no existen. El criterio de fondo no cambia —el acento sale de un token documentado, no de un hexadecimal inventado— pero la fuente del token pasa a ser la paleta del manual y el sistema de territorios.

#### Scenario: Acento decorativo de cada carrete
- **WHEN** se carga `en-fotos/index.html` y se observa el acento de color de cualquiera de las 3 secciones de carrete
- **THEN** el color corresponde a un token de la paleta del manual, y es el que el manual asigna al territorio que ese carrete retrata

#### Scenario: Agregar un carrete nuevo
- **WHEN** se suma un carrete de un territorio del partido
- **THEN** su acento se declara nombrando el token del territorio, sin inventar un color nuevo

### Requirement: Las galerías de En Fotos no usan el patrón de side-stripe prohibido
El acento de color de las galerías SHALL presentarse como una barra sobre el borde superior o inferior del elemento, nunca como una franja vertical sobre el borde izquierdo o derecho.

El requisito fijaba la barra superior sobre `.photos-reel-section`, copiando el patrón de las tarjetas de lugar de la portada. Con el carrete rediseñado el acento vive en la tarjeta de foto, sobre su borde inferior, y aparece al apuntarla o enfocarla. La prohibición del side-stripe no cambia.

#### Scenario: Estructura del acento de color
- **WHEN** se inspecciona el acento de color de una galería
- **THEN** está posicionado como barra horizontal sobre un borde superior o inferior, no como franja vertical en el borde izquierdo o derecho

### Requirement: El texto del eyebrow de cada galería cumple contraste WCAG AA
El volantillo de lugar de cada carrete SHALL tener un contraste de al menos 4.5:1 contra su fondo, medido sobre el color resuelto. SHALL no componerse con el token de acento del carrete sin modificar, porque los acentos de la paleta están pensados para superficies y detalles, no para texto chico.

El requisito pedía derivar el color del volantillo de la familia celeste de la línea "Fotos". Con el rediseño el volantillo es un dato de ubicación compuesto en el neutral claro del sistema dentro de una pastilla, y quien lleva el color del territorio es el número del carrete.

#### Scenario: Medición de contraste del volantillo
- **WHEN** se mide el contraste del texto del volantillo contra el fondo de su sección, sobre el color resuelto y no estimado
- **THEN** el resultado es igual o mayor a 4.5:1

#### Scenario: El acento del territorio tampoco baja del mínimo
- **WHEN** se mide el contraste del número del carrete, que sí lleva el color del territorio, contra el fondo de su sección
- **THEN** el resultado es igual o mayor a 4.5:1, y si un color del territorio no lo alcanza se reserva para superficies y detalles en vez de componer texto

