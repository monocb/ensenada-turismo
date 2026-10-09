## ADDED Requirements

### Requirement: Los carretes avanzan solos

Cada carrete de la página de fotos SHALL avanzar por su cuenta, de forma continua y lenta, sin que haga falta ninguna acción para que las fotos pasen.

#### Scenario: Llegar a un carrete

- **WHEN** un carrete está a la vista y nadie lo está usando
- **THEN** las fotos se desplazan solas, de forma continua y pareja

#### Scenario: Fuera de la vista no gasta

- **WHEN** un carrete queda fuera de la ventana
- **THEN** deja de avanzar hasta volver a estar a la vista

### Requirement: El carrete se frena cuando alguien quiere mirar

El avance automático SHALL detenerse mientras el puntero esté sobre el carrete, mientras algo dentro de su sección tenga el foco, durante un lapso después de tocarlo en una pantalla táctil, y mientras haya una foto abierta en el visor. Al cesar esas condiciones SHALL retomar desde donde quedó.

#### Scenario: Apoyar el mouse encima

- **WHEN** el puntero se apoya sobre el carrete
- **THEN** las fotos se detienen, y vuelven a moverse cuando el puntero se va

#### Scenario: Tocar el carrete en el teléfono

- **WHEN** se toca el carrete en una pantalla táctil
- **THEN** las fotos se detienen el tiempo suficiente para elegir una y abrirla

#### Scenario: Recorrer el carrete con el teclado

- **WHEN** el foco entra en la sección del carrete
- **THEN** el carrete se detiene mientras el foco siga adentro, de modo que lo que está enfocado no se mueva

#### Scenario: Abrir una foto

- **WHEN** hay una foto abierta en el visor
- **THEN** el carrete de atrás no avanza

### Requirement: La vuelta no duplica fotos

Para girar sin fin, el carrete SHALL reubicar sus propias tarjetas en lugar de duplicarlas. La cantidad de tarjetas SHALL mantenerse constante y SHALL no haber dos tarjetas de la misma foto.

#### Scenario: Dar una vuelta completa

- **WHEN** el carrete avanza lo suficiente como para que la primera foto salga de pantalla
- **THEN** esa foto reaparece al final de la fila sin que se perciba un salto, y la cantidad de tarjetas no cambia

#### Scenario: El visor y el teclado ven una sola copia

- **WHEN** se recorre el carrete con el teclado o se abre una foto en el visor
- **THEN** cada foto aparece una sola vez

### Requirement: El carrete no muestra barra de scroll

El carrete SHALL no mostrar una barra de scroll horizontal. El avance SHALL quedar a cargo del movimiento automático, de los controles de avance y retroceso, y del arrastre o deslizamiento.

#### Scenario: Observar un carrete

- **WHEN** se mira un carrete en cualquier página
- **THEN** no hay ninguna barra de scroll horizontal debajo de las fotos

### Requirement: Los controles mueven el carrete en los dos sentidos

Cada carrete SHALL conservar controles explícitos de avance y retroceso, operables por teclado, que muevan una foto por activación y funcionen en cualquier punto del giro, incluido el comienzo.

#### Scenario: Retroceder desde el principio

- **WHEN** se activa el control de retroceso con el carrete en su posición inicial
- **THEN** aparece la foto anterior, sin que el control quede sin efecto

#### Scenario: Usar los controles detiene el avance

- **WHEN** se activa un control de avance o retroceso
- **THEN** el carrete se queda quieto un lapso, para que el movimiento automático no pelee con el desplazamiento del control

### Requirement: Con movimiento reducido el carrete no se mueve solo

Cuando la persona tenga activada la preferencia de movimiento reducido, el avance automático SHALL no iniciarse, y el carrete SHALL seguir siendo recorrible con sus controles.

#### Scenario: Preferencia de movimiento reducido activa

- **WHEN** se carga la página de fotos con la preferencia de movimiento reducido activada
- **THEN** las fotos no se desplazan solas, y los controles de avance y retroceso siguen funcionando
