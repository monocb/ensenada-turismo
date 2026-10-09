## ADDED Requirements

### Requirement: La marca entra escribiéndose

La portada SHALL abrir con el emblema solo sobre el fondo institucional, y el emblema SHALL aparecer siguiendo la secuencia que fija el manual: la palabra se revela de izquierda a derecha y el trazo sigue de largo dibujando la línea de costa, sin corte entre una cosa y la otra.

#### Scenario: Primera visita a la portada

- **WHEN** alguien abre la portada por primera vez en su sesión
- **THEN** ve el emblema sobre el fondo institucional, la palabra apareciendo de izquierda a derecha y el trazo de costa continuando el gesto

#### Scenario: El trazo es un solo gesto

- **WHEN** se observa la secuencia completa
- **THEN** el trazo de costa arranca antes de que la palabra termine de revelarse, de modo que se lee como una sola pincelada y no como dos animaciones encadenadas

### Requirement: La entrada termina atravesando el logotipo

Terminado el trazo, el emblema SHALL escalar hacia el espectador y desvanecerse, revelando debajo la portada. El logotipo SHALL quedar visible en el encabezado al terminar la entrada.

#### Scenario: Cierre de la entrada

- **WHEN** termina el trazo de costa
- **THEN** el emblema crece y se desvanece, y debajo aparece la portada con sus fotos, el encabezado con el logotipo y las navegaciones

### Requirement: La entrada se muestra una vez por sesión

La entrada SHALL mostrarse la primera vez que alguien llega a la portada en una sesión de navegación, y SHALL no repetirse en recargas ni al volver desde otra página del sitio durante esa misma sesión.

#### Scenario: Volver a la portada

- **WHEN** alguien navega a otra página del sitio y vuelve a la portada en la misma sesión
- **THEN** la portada aparece directamente, sin la entrada

#### Scenario: La segunda visita no parpadea

- **WHEN** se carga la portada por segunda vez en la misma sesión
- **THEN** no se alcanza a ver un destello de la entrada antes de que aparezca la portada

### Requirement: La entrada no puede dejar el sitio inaccesible

La entrada SHALL desmontarse sola sin depender de JavaScript, y el contenido de la página SHALL estar presente y alcanzable en todos los casos, incluido el de JavaScript ausente o fallado.

#### Scenario: Sin JavaScript

- **WHEN** se carga la portada con JavaScript deshabilitado
- **THEN** la entrada se muestra, termina sola y deja la portada usable, sin tapar el contenido ni capturar el puntero

#### Scenario: El contenido existe desde el principio

- **WHEN** un rastreador o un render sin ejecución lee la portada
- **THEN** encuentra el contenido completo de la página, no una pantalla de entrada

### Requirement: Con movimiento reducido no hay entrada

Cuando la persona tenga activada la preferencia de movimiento reducido, la entrada SHALL no mostrarse y la portada SHALL aparecer directamente.

#### Scenario: Preferencia de movimiento reducido activa

- **WHEN** se carga la portada con la preferencia de movimiento reducido activada
- **THEN** no hay entrada ni zoom: se ve la portada desde el primer momento

### Requirement: La entrada no se encima con la navegación

Mientras la entrada esté en curso, el scroll de la página SHALL quedar contenido, y al terminar SHALL devolverse. Si el bloqueo no llega a aplicarse, la entrada SHALL igual terminar y liberar la página.

#### Scenario: Scrollear durante la entrada

- **WHEN** alguien intenta scrollear mientras la entrada está en curso
- **THEN** la página no se desplaza por detrás de la entrada

#### Scenario: El scroll vuelve

- **WHEN** termina la entrada
- **THEN** la página se puede scrollear normalmente
