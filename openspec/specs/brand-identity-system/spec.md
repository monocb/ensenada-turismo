# brand-identity-system Specification

## Purpose
Aplicacion del Manual de Identidad v3.0 al sitio (2026-10-08).
## Requirements
### Requirement: El logotipo es el lettering de marca

El nombre de la marca SHALL presentarse con el lettering de pincel del manual, no compuesto en tipografía. El lettering SHALL conservar su color institucional sobre fondo claro y su versión en negativo sobre fondo oscuro o de color.

#### Scenario: El nombre en el encabezado y en el hero

- **WHEN** se carga cualquier página del sitio
- **THEN** el nombre de la marca aparece como lettering de pincel, no como texto compuesto en una tipografía

#### Scenario: Sigue siendo texto para quien no ve la imagen

- **WHEN** un lector de pantalla o un buscador recorren la página
- **THEN** el nombre de la marca está disponible como texto, aunque se muestre como lettering

### Requirement: El trazo de costa acompaña al lettering

El emblema SHALL incluir el trazo continuo que prolonga la última letra dibujando la línea de costa. La portada SHALL animar ese gesto respetando la secuencia del manual: primero se escribe la palabra, después el trazo sigue de largo y dibuja la costa. El gesto SHALL ser el de una mano que escribe —el dibujo apareciendo por donde pasa el pincel— y SHALL no ser el de una cortina que destapa una forma ya hecha.

El requisito ya exigía respetar la secuencia del manual, y el barrido por recorte la respetaba al pie de la letra: primero la palabra, después la costa. Pero el manual no describe un orden, describe una mano. Esa diferencia es la que se vuelve exigible acá.

#### Scenario: El gesto se completa

- **WHEN** se carga la portada
- **THEN** el trazo de costa aparece como continuación del lettering, no como un elemento separado

#### Scenario: La secuencia es la del manual

- **WHEN** se observa la entrada de la portada
- **THEN** la palabra se escribe primero y el trazo sigue de largo dibujando la costa, en ese orden y sin corte entre las dos partes

#### Scenario: Se nota el recorrido del pincel

- **WHEN** se observa cómo aparece cada letra
- **THEN** el dibujo crece siguiendo el recorrido del trazo de esa letra, no destapándose de un lado al otro

#### Scenario: Con movimiento reducido

- **WHEN** la persona tiene activada la preferencia de movimiento reducido
- **THEN** el emblema aparece completo y sin animar

### Requirement: La tipografía institucional es la del manual

Todo el texto del sitio SHALL componerse en la tipografía institucional que fija el manual, con sus pesos asignados: el más pesado para títulos, el intermedio para subtítulos y el regular para texto corrido. El lettering SHALL usarse sólo para el nombre de la marca y nunca para componer texto.

#### Scenario: Una sola familia en todo el sitio

- **WHEN** se inspeccionan las tipografías que carga y usa cualquier página
- **THEN** el texto se compone en la familia institucional del manual, sin familias ajenas al sistema

#### Scenario: El lettering no se usa como tipografía

- **WHEN** se busca el lettering de pincel en el sitio
- **THEN** aparece sólo como logotipo, nunca componiendo frases ni párrafos

### Requirement: La paleta es la del manual, con sus roles

Los colores del sitio SHALL ser los que define el manual y SHALL usarse en el rol que el manual les asigna. Ningún color del sistema SHALL ser una aproximación cercana a un color de marca.

#### Scenario: Sin colores aproximados

- **WHEN** se comparan los colores declarados en el sitio con los del manual
- **THEN** los que cumplen un rol de marca coinciden exactamente, sin variantes cercanas

#### Scenario: Cada color en su función

- **WHEN** se inspecciona dónde se usa cada color de marca
- **THEN** cumple el rol documentado: el institucional como color de marca, el de enlaces en los enlaces, y los complementarios acompañando sin reemplazar al institucional

### Requirement: La forma sigue una escala única

Los radios de borde del sitio SHALL salir de una escala corta y declarada, derivada del contenedor de marca. No SHALL convivir radios arbitrarios fuera de esa escala.

#### Scenario: Escala corta y declarada

- **WHEN** se inspeccionan los radios de borde en uso
- **THEN** todos salen de la escala declarada, y cada peldaño tiene un uso definido

### Requirement: El contraste se mantiene con la paleta nueva

Al adoptar la paleta del manual, el texto SHALL seguir cumpliendo el contraste mínimo de WCAG AA sobre todos los fondos donde aparece, incluidas las fotos.

#### Scenario: Texto sobre fotos

- **WHEN** se mide el contraste del texto que aparece sobre imágenes
- **THEN** cumple el mínimo exigido, medido sobre los píxeles reales y no estimado

