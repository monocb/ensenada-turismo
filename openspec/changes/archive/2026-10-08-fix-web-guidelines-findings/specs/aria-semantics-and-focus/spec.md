## ADDED Requirements

### Requirement: El foco visible se distingue del hover

El indicador de foco de teclado SHALL ser distinguible del estado de hover. Ninguna regla SHALL suprimir el indicador de foco dejando como único reemplazo el mismo tratamiento que ya aplica el hover.

#### Scenario: Un elemento con hover y foco propios

- **WHEN** un elemento interactivo recibe foco de teclado
- **THEN** su apariencia se diferencia tanto del estado de reposo como del estado de hover

#### Scenario: Ninguna supresión de foco sin reemplazo propio

- **WHEN** se inspecciona una regla que suprime el contorno de foco
- **THEN** esa regla aporta un indicador de foco propio, no compartido con el hover
