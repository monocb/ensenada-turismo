## ADDED Requirements

### Requirement: La sección Fragata muestra el copy actualizado
El `.feature-kicker` de la sección `#fragata` SHALL mostrar el texto "PATRIMONIO ARGENTINO". El `<h2 id="fragata-title">` SHALL mostrar "Fragata ARA Libertad en Ensenada". El párrafo dentro de `.fragata-hero-copy` SHALL mostrar únicamente el texto "Un encuentro entre patria, río e industria naval. Más que una embarcación: es uno de los grandes símbolos de la Argentina en el mundo. En Ensenada, su presencia une soberanía, formación, trabajo portuario y orgullo nacional." (sin el segundo párrafo anterior sobre "este carrete").

#### Scenario: Texto del kicker
- **WHEN** se carga la home y se lee el texto de `.feature-kicker` dentro de `#fragata`
- **THEN** el texto es "PATRIMONIO ARGENTINO"

#### Scenario: Texto del párrafo
- **WHEN** se carga la home y se lee el texto del `<p>` dentro de `.fragata-hero-copy`
- **THEN** el texto no contiene la frase "este carrete"

### Requirement: La sección Fragata muestra un fondo rotativo de 8 fotos sin controles interactivos
`.fragata-hero` SHALL contener una galería de 8 `<img>` (`.fragata-hero-slide`) que rotan automáticamente vía animación CSS, reutilizando el mismo mecanismo (`@keyframes heroPhotoFade`, sin JavaScript) que ya usa el hero principal del sitio. Ninguna de las 8 imágenes SHALL ser clickeable ni abrir un lightbox. No SHALL existir ningún botón de control (prev/next) para esta galería.

#### Scenario: 8 imágenes de fondo presentes
- **WHEN** se carga la home y se cuentan los `<img class="fragata-hero-slide">` dentro de `.fragata-hero`
- **THEN** hay exactamente 8

#### Scenario: Sin controles ni clic
- **WHEN** se inspecciona la sección `#fragata`
- **THEN** no existe ningún elemento con `data-reel-prev`, `data-reel-next`, ni ningún `<img>` de la galería de fondo con `data-lightbox-title` o `tabindex`

#### Scenario: Rotación vía CSS, sin JavaScript
- **WHEN** se inspecciona el CSS computado de `.fragata-hero-slide`
- **THEN** tiene una `animation-name` activa (no depende de un intervalo de JavaScript para cambiar de imagen)
