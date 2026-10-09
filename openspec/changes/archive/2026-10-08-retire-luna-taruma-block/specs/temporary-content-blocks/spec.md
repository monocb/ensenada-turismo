## ADDED Requirements

### Requirement: La baja se verifica antes de darse por hecha

Retirar un bloque temporal SHALL incluir una verificación explícita de que no quedaron residuos y de que el sitio sigue sano, antes de considerar la baja terminada. No alcanza con borrar las regiones marcadas.

#### Scenario: Búsqueda de residuos sin resultados

- **WHEN** se termina de borrar las regiones marcadas, los assets y la documentación del bloque
- **THEN** una búsqueda en el repositorio por el identificador del bloque y por sus prefijos de clase no devuelve nada fuera del archivo histórico de cambios

#### Scenario: El sitio sigue en verde

- **WHEN** se termina la baja
- **THEN** las comprobaciones automatizadas del repositorio siguen pasando y la consola del navegador no reporta errores nuevos en ninguna página

#### Scenario: Lo que el bloque enganchaba sigue funcionando

- **WHEN** el bloque retirado se apoyaba en una funcionalidad compartida del sitio
- **THEN** esa funcionalidad sigue operativa para el resto del sitio después de la baja

### Requirement: El inventario de baja incluye las capacidades de OpenSpec

La página de baja de un bloque temporal SHALL listar, además de los archivos de código, los assets y la documentación, las capacidades de `openspec/specs/` que existen sólo por ese bloque y que deben retirarse con él.

#### Scenario: Las specs del bloque figuran en el inventario

- **WHEN** se escribe la página de baja de un bloque temporal
- **THEN** su inventario nombra las capacidades que se retiran y distingue las que siguen vigentes para bloques futuros

#### Scenario: No quedan capacidades huérfanas

- **WHEN** se completa la baja
- **THEN** `openspec/specs/` no conserva capacidades que describan contenido que ya no está en el sitio

### Requirement: El identificador de residuos cubre todos los prefijos del bloque

Cuando un bloque temporal incorpore un prefijo de clase o de identificador nuevo después de publicarse, la búsqueda de residuos de su página de baja SHALL actualizarse en el mismo cambio que lo incorpora.

#### Scenario: Un agregado posterior trae su propio prefijo

- **WHEN** se suma una pieza al bloque temporal con un prefijo propio
- **THEN** ese prefijo queda incluido en la búsqueda de residuos documentada, sin esperar al momento de la baja

### Requirement: Cada baja ejecutada deja la convención mejor que antes

Al ejecutar la baja de un bloque temporal, SHALL compararse lo que hizo falta realmente con lo que decía el procedimiento documentado, y SHALL corregirse esta convención si el procedimiento resultó incompleto o incorrecto.

#### Scenario: El procedimiento se contrasta con la ejecución real

- **WHEN** se completa la baja de un bloque temporal
- **THEN** queda registrado si el inventario y los pasos documentados alcanzaron, y cualquier diferencia encontrada se incorpora a esta convención antes de borrar la página de baja del bloque

#### Scenario: El próximo bloque temporal hereda lo aprendido

- **WHEN** se publica un bloque temporal posterior
- **THEN** su procedimiento de baja parte de una convención ya corregida con la experiencia de las bajas anteriores
