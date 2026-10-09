## Purpose

TBD - created by syncing change fix-a11y-validate-findings. Update Purpose after archive.

## Requirements

### Requirement: Los contenedores con aria-label tienen un rol que lo soporta
Todo `<div aria-label="...">` SHALL tener un `role` (ej. `group`) que garantice que el nombre accesible se exponga de forma confiable a tecnología asistiva.

#### Scenario: Un lector de pantalla anuncia el panel de video de Historia
- **WHEN** un usuario de lector de pantalla navega hasta `.video-panel` (sección Historia, `#historia`)
- **THEN** el lector anuncia su `aria-label` ("Video sobre el Fuerte Barragán") porque el elemento tiene `role="group"`

### Requirement: Los landmarks duplicados tienen nombres accesibles únicos
Cuando una página tiene más de un `<nav>` (u otro landmark del mismo tipo), cada uno SHALL tener un `aria-label` propio y distinto.

#### Scenario: index.html tiene 4 elementos `<nav>`
- **WHEN** un usuario navega por landmarks en `index.html`
- **THEN** encuentra 4 navegaciones distinguibles por nombre (`Navegación principal`, `Links a redes sociales`, `Guía de la página`, `Redes sociales`), ninguna sin nombre

### Requirement: Ningún elemento interactivo es alcanzable por teclado mientras está oculto
Los contenedores que se muestran/ocultan dinámicamente (lightbox, modal) SHALL usar el atributo `inert` (además de `aria-hidden`) mientras están cerrados, de forma que ningún botón interno reciba foco de teclado en ese estado, sin importar el mecanismo CSS usado para ocultarlos visualmente.

#### Scenario: Tabular por toda la página con el modal "Ver historia" cerrado
- **WHEN** un usuario navega con Tab por toda la página sin haber abierto ningún modal
- **THEN** el foco nunca aterriza en `.place-modal__close` ni en ningún otro control dentro de `.place-modal` o `.image-lightbox`

#### Scenario: Abrir y cerrar el modal restaura el comportamiento
- **WHEN** un usuario abre el modal "Ver historia" (quita `inert`) y luego lo cierra (vuelve a poner `inert`)
- **THEN** el foco funciona normalmente dentro del modal mientras está abierto, y vuelve a estar excluido del orden de tabulación una vez cerrado

### Requirement: El foco visible se distingue del hover

El indicador de foco de teclado SHALL ser distinguible del estado de hover. Ninguna regla SHALL suprimir el indicador de foco dejando como único reemplazo el mismo tratamiento que ya aplica el hover.

#### Scenario: Un elemento con hover y foco propios

- **WHEN** un elemento interactivo recibe foco de teclado
- **THEN** su apariencia se diferencia tanto del estado de reposo como del estado de hover

#### Scenario: Ninguna supresión de foco sin reemplazo propio

- **WHEN** se inspecciona una regla que suprime el contorno de foco
- **THEN** esa regla aporta un indicador de foco propio, no compartido con el hover
