## MODIFIED Requirements

### Requirement: El trazo de costa acompaña al lettering

El emblema SHALL incluir el trazo continuo que prolonga la última letra dibujando la línea de costa. La portada SHALL animar ese gesto respetando la secuencia del manual: primero se escribe la palabra, después el trazo sigue de largo y dibuja la costa.

El requisito pedía que, *si* se animaba, respetara la secuencia. El manual le dedica una sección entera a esa animación, así que pasa a ser algo que la portada tiene que hacer, no una condición para el caso de que alguien la implemente.

#### Scenario: El gesto se completa

- **WHEN** se carga la portada
- **THEN** el trazo de costa aparece como continuación del lettering, no como un elemento separado

#### Scenario: La secuencia es la del manual

- **WHEN** se observa la entrada de la portada
- **THEN** la palabra se escribe primero y el trazo sigue de largo dibujando la costa, en ese orden y sin corte entre las dos partes

#### Scenario: Con movimiento reducido

- **WHEN** la persona tiene activada la preferencia de movimiento reducido
- **THEN** el emblema aparece completo y sin animar
