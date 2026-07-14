## Purpose

TBD - created by syncing change redesign-fragata-background-gallery. Update Purpose after archive.

## Requirements

### Requirement: La sección Fragata muestra el copy actualizado
El `.feature-kicker` de la sección `#fragata` SHALL mostrar el texto "PATRIMONIO ARGENTINO". El `<h2 id="fragata-title">` SHALL mostrar "Fragata ARA Libertad en Ensenada". El párrafo dentro de `.fragata-hero-copy` SHALL mostrar únicamente el texto "Patria, río e industria, uno de los grandes símbolos de la Argentina. Soberanía, trabajo y orgullo nacional."

#### Scenario: Texto del kicker
- **WHEN** se carga la home y se lee el texto de `.feature-kicker` dentro de `#fragata`
- **THEN** el texto es "PATRIMONIO ARGENTINO"

#### Scenario: Texto del párrafo
- **WHEN** se carga la home y se lee el texto del `<p>` dentro de `.fragata-hero-copy`
- **THEN** el texto no contiene la frase "este carrete" ni "mucho más que una embarcación"

### Requirement: La sección Fragata muestra un fondo rotativo de 8 fotos, clickeables sin perder la rotación
`.fragata-hero` SHALL contener una galería de 8 `<img>` (`.fragata-hero-slide`) que rotan automáticamente vía animación CSS, reutilizando el mismo mecanismo (`@keyframes heroPhotoFade`, sin JavaScript) que ya usa el hero principal del sitio. Cada una de las 8 imágenes SHALL ser clickeable y operable por teclado (Tab + Enter/Espacio), abriendo el lightbox del sitio agrupadas entre sí (navegación prev/next dentro del lightbox recorre las 8). Solo la imagen visualmente visible en cada momento SHALL responder a clicks de mouse — un click nunca SHALL abrir una foto distinta a la que el usuario ve en pantalla.

#### Scenario: 8 imágenes de fondo presentes
- **WHEN** se carga la home y se cuentan los `<img class="fragata-hero-slide">` dentro de `.fragata-hero`
- **THEN** hay exactamente 8

#### Scenario: Click abre la foto visible
- **WHEN** un usuario hace click sobre la sección Fragata en el momento en que una foto específica está visible
- **THEN** el lightbox abre esa misma foto, no otra de las 8

#### Scenario: Navegación por teclado
- **WHEN** un usuario navega con Tab hasta una de las 8 fotos y presiona Enter o Espacio
- **THEN** el lightbox se abre mostrando esa foto

#### Scenario: Rotación vía CSS, sin JavaScript
- **WHEN** se inspecciona el CSS computado de `.fragata-hero-slide`
- **THEN** tiene una `animation-name` de rotación de opacidad activa (no depende de un intervalo de JavaScript para cambiar de imagen)

### Requirement: El bloque de texto de Fragata separa título arriba y bajada/crédito abajo, alineados a la izquierda
`.fragata-hero-copy` SHALL distribuir su contenido con el `<h2>` en la parte superior y un bloque `.fragata-hero-foot` (párrafo + crédito) en la parte inferior, sin depender de un offset fijo (`top`) calculado a mano. Ambos bloques SHALL compartir el mismo margen izquierdo (alineación mutua). El link de crédito `.fragata-cta` SHALL renderizarse como texto plano (sin `background`, `border` ni `box-shadow`), con subrayado como indicador de que es un link.

#### Scenario: Título arriba, bajada y crédito abajo
- **WHEN** se inspecciona el CSS computado de `.fragata-hero-copy`
- **THEN** usa `display:flex; flex-direction:column; justify-content:space-between` (o un mecanismo equivalente que separe el `<h2>` del bloque `.fragata-hero-foot`), no un `top` fijo

#### Scenario: Alineación mutua
- **WHEN** se comparan los márgenes izquierdos del `<h2>` y de `.fragata-hero-foot`
- **THEN** están alineados sobre la misma línea vertical

#### Scenario: CTA sin caja
- **WHEN** se inspecciona el CSS computado de `.fragata-cta`
- **THEN** no tiene `background-color` visible, `border` ni `border-left` de acento — solo texto con `text-decoration: underline`
