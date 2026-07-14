## ADDED Requirements

### Requirement: El bloque de texto de Fragata está centrado verticalmente y el crédito es texto plano
`.fragata-hero-copy` (kicker exceptuado, que vive fuera de `.fragata-hero`) SHALL estar centrado verticalmente dentro de `.fragata-hero` sin depender de un offset fijo (`top`) calculado a mano. El link de crédito `.fragata-cta` SHALL renderizarse como texto plano (sin `background`, `border` ni `box-shadow`), con subrayado como indicador de que es un link.

#### Scenario: Centrado vertical del bloque de texto
- **WHEN** se inspecciona el CSS computado de `.fragata-hero`
- **THEN** usa `display:flex` con `align-items:center` (o un mecanismo de centrado equivalente), no un `top` fijo en `.fragata-hero-copy`

#### Scenario: CTA sin caja
- **WHEN** se inspecciona el CSS computado de `.fragata-cta`
- **THEN** no tiene `background-color` visible, `border` ni `border-left` de acento — solo texto con `text-decoration: underline`
