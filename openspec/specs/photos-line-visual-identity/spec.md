## Purpose

TBD - created by syncing change fix-visual-consistency-en-fotos. Update Purpose after archive.

## Requirements

### Requirement: Las galerías de En Fotos usan los tokens de color de la línea "Fotos"
Las tarjetas de galería (`.photos-reel-section`) en `en-fotos/index.html` SHALL usar los tokens de color documentados para la línea de contenido "Fotos" (`--brand-cyan`, `--brand-lime`) para su acento decorativo, en vez de valores hexadecimales hardcodeados no documentados.

#### Scenario: Acento decorativo de cada tarjeta de galería
- **WHEN** se carga `en-fotos/index.html` y se observa el acento de color de cualquiera de las 3 secciones de galería
- **THEN** el color usado corresponde a `var(--brand-cyan)` y/o `var(--brand-lime)`, no a un hexadecimal inventado fuera de esos tokens

### Requirement: Las galerías de En Fotos no usan el patrón de side-stripe prohibido
Las tarjetas de galería SHALL usar el mismo patrón de acento de barra superior (`::before` tipo top-bar) que ya usa `.place-card` en el home, no una franja de color en el borde lateral (side-stripe).

#### Scenario: Estructura del acento de color
- **WHEN** se inspecciona el `::before` de `.photos-reel-section`
- **THEN** el acento está posicionado como barra superior, no como franja vertical en el borde izquierdo/derecho de la tarjeta

### Requirement: El texto del eyebrow de cada galería cumple contraste WCAG AA
El texto de `.photos-reel-eyebrow` SHALL tener un contraste de al menos 4.5:1 contra su fondo, usando un tono derivado de la familia de color "Fotos" (celeste), no el token decorativo `--brand-cyan` sin modificar (que no cumple ese umbral como texto).

#### Scenario: Medición de contraste del eyebrow
- **WHEN** se mide el contraste del texto de `.photos-reel-eyebrow` contra el fondo de la tarjeta de galería
- **THEN** el resultado es igual o mayor a 4.5:1

#### Scenario: Identidad de color reconocible
- **WHEN** se observa el eyebrow junto a la barra superior de acento de la misma tarjeta
- **THEN** ambos se perciben como parte de la misma familia de color celeste de la línea "Fotos", no como dos azules no relacionados
