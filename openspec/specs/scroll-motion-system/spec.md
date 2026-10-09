# scroll-motion-system Specification

## Purpose
Como entra el contenido al scrollear: vocabulario corto de entradas declaradas por elemento, sobre contenido que ya es visible (2026-10-09).
## Requirements
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

### Requirement: Un elemento puede irse con el scroll, no sólo entrar

Además de las entradas, el sistema SHALL admitir que un elemento **se vaya** a medida que avanza el scroll. El avance de ese movimiento SHALL seguir a la posición del scroll, de modo que la velocidad la ponga quien está bajando y no una duración fijada de antemano.

#### Scenario: El movimiento sigue al scroll

- **WHEN** alguien baja por un elemento que se va con el scroll
- **THEN** el movimiento avanza con él, y si frena o vuelve a subir, el movimiento frena o vuelve

#### Scenario: No arranca y corre solo

- **WHEN** el scroll llega al punto donde el elemento empieza a irse
- **THEN** el movimiento no se dispara para correr por su cuenta: queda atado a la posición

### Requirement: Irse con el scroll nunca puede trabar el scroll

Un elemento que se va con el scroll SHALL no impedir llegar al contenido que tiene debajo. Si el seguimiento no corre —sin JavaScript, con JavaScript fallado o con movimiento reducido— el elemento SHALL irse scrolleando como cualquier otra sección.

#### Scenario: Sin JavaScript

- **WHEN** se baja por la página con JavaScript deshabilitado
- **THEN** el elemento se va de pantalla scrolleando y se llega al contenido de abajo

#### Scenario: Con movimiento reducido

- **WHEN** se baja con la preferencia de movimiento reducido activada
- **THEN** el elemento se va sin transformarse ni desvanecerse, y se llega al contenido de abajo

### Requirement: El cálculo del scroll no se paga de más

El seguimiento del scroll SHALL engancharse al oyente que el sitio ya tiene y SHALL dejar de calcular cuando el elemento no está a la vista.

#### Scenario: El elemento quedó atrás

- **WHEN** el elemento que se va con el scroll ya no está en pantalla
- **THEN** su cálculo deja de ejecutarse en cada cuadro

