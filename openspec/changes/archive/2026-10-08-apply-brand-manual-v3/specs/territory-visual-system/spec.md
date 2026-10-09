## ADDED Requirements

### Requirement: Cada territorio tiene su color

Los tres territorios del partido SHALL distinguirse visualmente por el par de colores que el manual le asigna a cada uno, dentro de un mismo esqueleto compartido.

#### Scenario: Tres territorios distinguibles

- **WHEN** se recorre la sección de territorios
- **THEN** cada uno se reconoce por su color sin necesidad de leer su nombre, y los tres comparten la misma estructura

#### Scenario: El color no es decoración arbitraria

- **WHEN** se comparan los colores de cada territorio con los del manual
- **THEN** coinciden con el par asignado a esa localidad

### Requirement: El esqueleto es común a los tres

Las piezas de territorio SHALL compartir estructura: el mismo contenedor, la misma jerarquía tipográfica y la misma disposición. Sólo SHALL variar el color y el motivo.

#### Scenario: Agregar un territorio no obliga a rediseñar

- **WHEN** se suma una pieza de territorio nueva
- **THEN** alcanza con definir su color y su motivo, sin tocar la estructura ni los estilos compartidos
