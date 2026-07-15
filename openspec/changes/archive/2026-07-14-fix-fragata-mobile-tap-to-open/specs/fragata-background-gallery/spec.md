## MODIFIED Requirements

### Requirement: La sección Fragata muestra un fondo rotativo de 8 fotos, clickeables de forma confiable en cualquier navegador
`.fragata-hero` SHALL contener una galería de 8 `<img>` (`.fragata-hero-slide`) que rotan automáticamente vía animación CSS (`@keyframes heroPhotoFade`), reutilizando el mismo mecanismo que ya usa el hero principal del sitio — la rotación visual en sí SHALL NOT depender de JavaScript. Cada una de las 8 imágenes SHALL ser clickeable/tocable y operable por teclado (Tab + Enter/Espacio), abriendo el lightbox del sitio agrupadas entre sí (navegación prev/next dentro del lightbox recorre las 8). Solo la imagen visualmente visible en cada momento SHALL responder a clicks/taps — un click nunca SHALL abrir una foto distinta a la que el usuario ve en pantalla. El mecanismo que determina qué foto es clickeable en cada momento SHALL funcionar de forma confiable en cualquier navegador, incluidos los basados en WebKit/Safari (no SHALL depender de que el navegador anime `pointer-events` vía `@keyframes`, ya que ese comportamiento no está soportado de forma confiable en todos los motores).

#### Scenario: 8 imágenes de fondo presentes
- **WHEN** se carga la home y se cuentan los `<img class="fragata-hero-slide">` dentro de `.fragata-hero`
- **THEN** hay exactamente 8

#### Scenario: Click abre la foto visible
- **WHEN** un usuario hace click sobre la sección Fragata en el momento en que una foto específica está visible
- **THEN** el lightbox abre esa misma foto, no otra de las 8

#### Scenario: Tap abre la foto visible en un dispositivo con Safari/WebKit
- **WHEN** un usuario en un iPhone (Safari o cualquier navegador basado en WebKit) toca la sección Fragata en el momento en que una foto específica está visible
- **THEN** el lightbox abre esa misma foto — el mismo comportamiento que en navegadores de escritorio

#### Scenario: Navegación por teclado
- **WHEN** un usuario navega con Tab hasta una de las 8 fotos y presiona Enter o Espacio
- **THEN** el lightbox se abre mostrando esa foto

#### Scenario: Rotación vía CSS, sin JavaScript
- **WHEN** se inspecciona el CSS computado de `.fragata-hero-slide`
- **THEN** tiene una `animation-name` de rotación de opacidad activa (no depende de un intervalo de JavaScript para cambiar de imagen)
