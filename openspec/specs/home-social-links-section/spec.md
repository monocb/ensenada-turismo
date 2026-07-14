## Purpose

TBD - created by syncing change add-social-links-page. Update Purpose after archive.

## Requirements

### Requirement: El inicio tiene una sección de redes sociales como última sección, después de Fragata
`index.html` SHALL incluir una sección `#redes` con los 3 links de redes sociales del sitio (Instagram, Facebook, TikTok), uno al lado del otro y centrados. Esta sección SHALL aparecer visualmente después de la sección Fragata (`#fragata`) y antes del footer — la última sección de contenido del inicio.

#### Scenario: Cargar el inicio
- **WHEN** se carga `index.html` y se recorre el inicio de arriba a abajo
- **THEN** la sección `#redes` es la última sección de contenido antes del footer, apareciendo después de `#fragata`

#### Scenario: Los links apuntan a las cuentas reales
- **WHEN** se inspeccionan los `href` de los 3 badges dentro de `#redes`
- **THEN** apuntan a `https://www.instagram.com/turismoensenada_/`, `https://www.facebook.com/turismoeda` y `https://www.tiktok.com/@turismoensenada` respectivamente, cada uno con `target="_blank" rel="noopener noreferrer"`

### Requirement: La sección ocupa toda la pantalla y su transición con Fragata es continua
`#redes` SHALL ocupar como mínimo el alto completo de la ventana (`100svh`), igual que otras secciones de peso completo del inicio (ej. el hero principal). El color de fondo donde termina la sección Fragata y donde empieza `#redes` SHALL coincidir, de forma que el límite entre ambas secciones no sea perceptible al hacer scroll.

#### Scenario: La sección ocupa toda la pantalla
- **WHEN** se carga el inicio y se mide la altura de `#redes`
- **THEN** es al menos el alto de la ventana visible

#### Scenario: Transición sin salto de color entre Fragata y Redes
- **WHEN** un usuario hace scroll desde el final de la sección Fragata hacia el inicio de la sección `#redes`
- **THEN** el color de fondo en ese punto de unión es continuo, sin un salto de tono perceptible

### Requirement: Los badges tienen un efecto de vidrio esmerilado real
Cada badge SHALL usar `backdrop-filter` (con `blur`) sobre un fondo no opaco, de forma que el contenido/color detrás del badge sea visible pero desenfocado a través de él — no un color de fondo plano sin desenfoque. Los badges en sí SHALL NOT tener un color de fondo propio por red social — son vidrio, no la fuente del color.

#### Scenario: Verificar el vidrio esmerilado
- **WHEN** se inspecciona el CSS computado de un badge en `#redes`
- **THEN** tiene `backdrop-filter` con un valor `blur(...)` mayor a 0, y su `background` no es un color totalmente opaco ni varía por red social

### Requirement: El hover/focus de un badge cambia el color de fondo de toda la sección
Al pasar el mouse o llevar el foco de teclado sobre un badge, SHALL cambiar el color de fondo de **toda la sección `#redes`** (no solo del badge) a un color de la paleta oficial de marca correspondiente a esa red, entrando vía una transformación (`transform`) desde un costado — no un cambio de opacidad instantáneo ni un crossfade. Los badges, al ser de vidrio esmerilado, SHALL dejar ver ese cambio de color de fondo a través suyo. El mapeo de color es: Instagram usa `--brand-cyan` (#00C8FF), Facebook usa `--brand-blue` (#0B55FF), TikTok usa `--brand-violet` (#6D5CFF).

#### Scenario: Hover sobre el badge de Instagram
- **WHEN** un usuario pasa el mouse sobre el badge de Instagram
- **THEN** el fondo de toda la sección `#redes` cambia a un color celeste (`--brand-cyan`) que entra desde un costado vía `transform`, visible a través del vidrio esmerilado de los 3 badges

#### Scenario: Foco de teclado tiene el mismo efecto que el hover
- **WHEN** un usuario navega con Tab hasta un badge
- **THEN** el fondo de la sección cambia de la misma forma que al pasar el mouse (`:focus-visible` iguala a `:hover`)

#### Scenario: Reduced motion
- **WHEN** el usuario tiene activada la preferencia `prefers-reduced-motion: reduce`
- **THEN** el color de fondo de la sección sigue cambiando en hover/focus, pero sin la animación de barrido (transición prácticamente instantánea)

### Requirement: El link "Redes" del sitio lleva a la sección del inicio
El nav principal, en las 3 páginas del sitio, SHALL incluir un link "Redes" que apunta a `/#redes`.

#### Scenario: Navegar a la sección de redes desde otra página
- **WHEN** un usuario hace click en "Redes" desde `en-fotos/index.html` o `404.html`
- **THEN** llega al inicio (`index.html`) con scroll hasta la sección `#redes`
