## ADDED Requirements

### Requirement: En la portada la navegación puede entrar después del emblema

En la portada, los enlaces del encabezado MAY entrar una vez que el emblema termina de dibujarse, en vez de estar visibles desde el primer cuadro. Cuando lo hagan, SHALL entrar de a uno y en orden de lectura, con una transición y no con un corte.

Esa espera SHALL ser propia de la portada: el resto de las páginas SHALL mostrar su navegación apenas cargan.

#### Scenario: El emblema se escribe sin competencia

- **WHEN** se carga la portada y el emblema se está pintando
- **THEN** los enlaces del encabezado todavía no están, y aparecen después de que el trazo termina

#### Scenario: Entra como un gesto y no como un cambio de estado

- **WHEN** los enlaces entran
- **THEN** lo hacen escalonados y con una transición suave, no todos juntos de golpe

#### Scenario: Las otras páginas no esperan

- **WHEN** se carga cualquier página que no sea la portada
- **THEN** su navegación está disponible desde el primer momento

### Requirement: Esconder la navegación nunca puede dejar a nadie trabado

Cuando la navegación de la portada espere para entrar, SHALL aparecer de inmediato si el foco entra al encabezado; SHALL no esperar en los anchos donde vive detrás del botón del menú; y SHALL no esperar cuando la persona pidió movimiento reducido.

#### Scenario: Llegar con el teclado

- **WHEN** alguien tabula hasta el encabezado antes de que la navegación haya entrado
- **THEN** los enlaces se muestran en el acto, de modo que el foco nunca cae sobre algo invisible

#### Scenario: Abrir el menú en teléfono

- **WHEN** alguien abre el menú en un ancho de teléfono mientras el emblema todavía se está pintando
- **THEN** ve todos los enlaces, no un menú vacío

#### Scenario: Con movimiento reducido

- **WHEN** se carga la portada con la preferencia de movimiento reducido activada
- **THEN** la navegación está disponible desde el primer momento
