## ADDED Requirements

### Requirement: Las entradas se declaran por elemento

Cada elemento que entre al scrollear SHALL declarar en el marcado con qué entrada lo hace. El sistema SHALL ofrecer un vocabulario corto y cerrado de entradas —desde la izquierda, desde la derecha, desde abajo y por escala— y SHALL no asignar una entrada por la posición del elemento en una lista.

#### Scenario: Leer con qué entra un elemento

- **WHEN** se mira el marcado de un elemento que se revela al scrollear
- **THEN** su entrada está declarada ahí, y no hay que deducirla del orden en que el JavaScript lo recorrió

#### Scenario: El vocabulario no crece por decoración

- **WHEN** se necesita una entrada nueva
- **THEN** se justifica por lo que revela, no por variar: el vocabulario se mantiene corto

### Requirement: Cada sección entra como corresponde a su composición

Secciones de composición distinta SHALL recibir entradas distintas. El sitio SHALL no aplicar la misma entrada a todas las secciones.

#### Scenario: Una grilla y una superficie a pantalla completa

- **WHEN** se comparan la entrada de una grilla de varios tiles con la de una sección que ocupa la pantalla entera
- **THEN** no son la misma: la grilla escalona sus piezas y la superficie entra de una pieza

#### Scenario: Dos mitades enfrentadas

- **WHEN** una sección tiene dos mitades, una de texto y otra de imagen
- **THEN** cada mitad entra desde su lado, no las dos desde el mismo

### Requirement: El escalonado se calcula dentro del grupo

Cuando varios elementos hermanos entren escalonados, el retardo SHALL calcularse dentro de ese grupo. SHALL no acumularse sobre una lista global de todos los elementos observados de la página.

#### Scenario: Una grilla de cuatro piezas

- **WHEN** entra una grilla de cuatro piezas
- **THEN** sus retardos van del primero al cuarto, sin depender de cuántos elementos observados hubo antes en la página

### Requirement: Las entradas mejoran contenido que ya es visible

El contenido SHALL ser visible sin JavaScript y sin animación. Las entradas SHALL aplicarse sólo cuando hay JavaScript y el movimiento está permitido, y SHALL no condicionar la visibilidad del contenido.

#### Scenario: Sin JavaScript

- **WHEN** se carga cualquier página con JavaScript deshabilitado
- **THEN** todas las secciones se ven completas, sin que ninguna quede transparente esperando una transición

#### Scenario: Pestaña oculta o render sin ejecución

- **WHEN** la página se renderiza sin que lleguen a dispararse las transiciones
- **THEN** el contenido igual se ve, porque el estado visible es el estado por defecto

### Requirement: Cada entrada tiene su alternativa sin movimiento

Con la preferencia de movimiento reducido activada, los elementos SHALL aparecer sin desplazamiento ni escala.

#### Scenario: Preferencia de movimiento reducido activa

- **WHEN** se recorre la página con la preferencia de movimiento reducido activada
- **THEN** el contenido aparece sin movimiento, y nada queda oculto a la espera de una animación que no va a ocurrir

### Requirement: Las entradas no animan propiedades de maquetado

Las entradas SHALL animar únicamente propiedades que el navegador pueda componer sin recalcular la maquetación.

#### Scenario: Inspeccionar una entrada

- **WHEN** se inspeccionan las propiedades que anima una entrada
- **THEN** son de transformación y opacidad, no de posición, tamaño ni márgenes
