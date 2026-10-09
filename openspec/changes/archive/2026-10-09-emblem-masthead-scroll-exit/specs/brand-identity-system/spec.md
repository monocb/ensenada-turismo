## MODIFIED Requirements

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
