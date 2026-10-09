# consistent-site-chrome Specification

## Purpose
El encabezado y el pie que comparten las tres paginas, y lo que el encabezado tiene que cumplir en todo el rango de anchos (2026-10-08).
## Requirements
### Requirement: Las tres páginas comparten el mismo encabezado

`index.html`, `en-fotos/index.html` y `404.html` SHALL presentar el mismo componente de encabezado, con los mismos enlaces y el mismo tratamiento visual. La página de fotos SHALL marcar su propio enlace como la página actual.

#### Scenario: Llegar a la página de fotos desde la portada

- **WHEN** se compara el encabezado de `en-fotos/index.html` con el de `index.html`
- **THEN** son el mismo componente, con los mismos enlaces en el mismo orden y la misma composición

#### Scenario: La página actual se señala

- **WHEN** se carga la página de fotos
- **THEN** su enlace en el encabezado está marcado como la página actual

### Requirement: El logotipo del encabezado se ve y se puede activar

El lettering del encabezado SHALL renderizarse con un alto y un ancho mayores que cero en todas las páginas y en todo el rango de anchos, y SHALL ser un enlace activable al inicio del sitio.

#### Scenario: Medir el logotipo del encabezado

- **WHEN** se mide la caja renderizada del lettering del encabezado en cualquier página
- **THEN** tiene ancho y alto mayores que cero, y su área activable coincide con lo que se ve

### Requirement: El lettering del encabezado está centrado en todo el rango de anchos

El lettering SHALL quedar centrado respecto del ancho de la ventana en cualquier ancho de pantalla, incluso cuando las navegaciones laterales están ocultas.

#### Scenario: Teléfono y tablet

- **WHEN** se carga cualquier página en un ancho donde las navegaciones del encabezado están ocultas
- **THEN** el centro del lettering coincide con el centro de la ventana, sin correrse hacia ningún borde

### Requirement: El menú de teléfono expone todos los enlaces del encabezado

Al abrir el menú en anchos de teléfono, SHALL quedar visible y activable la totalidad de los enlaces del encabezado, no un subconjunto, aunque el encabezado los agrupe en más de una navegación.

#### Scenario: Abrir el menú

- **WHEN** se activa el botón del menú en un ancho de teléfono
- **THEN** quedan visibles y activables todos los enlaces del encabezado

#### Scenario: El menú se lee como una sola lista

- **WHEN** el menú está abierto
- **THEN** los enlaces se presentan con el mismo espaciado entre todos, sin que la agrupación interna del encabezado se perciba como dos menús separados

#### Scenario: El bloqueo de scroll acompaña a lo que se ve

- **WHEN** el menú bloquea el scroll de la página
- **THEN** es porque hay un menú visible ocupando la pantalla, nunca con la página congelada y sin menú a la vista

### Requirement: Navegar desde el menú lo cierra

Activar cualquier enlace del encabezado con el menú abierto SHALL cerrarlo y devolver el scroll de la página.

#### Scenario: Elegir una sección desde el menú

- **WHEN** se activa cualquiera de los enlaces del encabezado con el menú abierto
- **THEN** el menú se cierra y la página vuelve a poder scrollearse

### Requirement: El encabezado se condensa al scrollear

Al alejarse del inicio de la página, el encabezado SHALL reducir su altura y ganar un fondo propio, para no competir con el contenido ni quedar ilegible sobre una foto.

#### Scenario: Scrollear la página

- **WHEN** se scrollea más allá del inicio de la página
- **THEN** el encabezado reduce su espaciado y presenta un fondo opaco o semiopaco, en vez de quedar transparente sobre el contenido

### Requirement: Las tres páginas comparten el mismo pie

`index.html`, `en-fotos/index.html` y `404.html` SHALL presentar el mismo componente de pie. El pie SHALL no contener enlaces a redes sociales ni navegación a otras secciones: eso vive en el encabezado.

#### Scenario: Comparar el pie entre páginas

- **WHEN** se compara el pie de cualquier página con el de `index.html`
- **THEN** es el mismo componente, con el mismo contenido y sin estilos propios de esa página

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

