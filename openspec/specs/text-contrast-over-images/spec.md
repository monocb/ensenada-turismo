## Purpose

TBD - created by syncing change fix-hero-tagline-contrast. Update Purpose after archive.

## Requirements

### Requirement: El texto superpuesto a imágenes es legible en todo su recorrido
Todo texto posicionado sobre una imagen (hero, fragata, culture-slides) SHALL tener suficiente contraste contra su fondo real (medido con muestreo de píxeles, no estimado), incluidas zonas donde el fondo cambia dentro del mismo bloque de texto (ej. un resaltador de color que cubre parte de la línea).

#### Scenario: Hero h1, fragata h2 y culture-slide figcaptions (verificado, ya cumplían)
- **WHEN** se mide el contraste real de estos 3 elementos contra su fondo (scrim oscuro sobre imagen) en desktop y mobile
- **THEN** el contraste medido es ≥3:1 (texto grande/bold) en todos los casos, sin cambios necesarios

#### Scenario: Hero tagline sobre el resaltador dorado (corregido)
- **WHEN** el texto del tagline del hero se superpone a la franja del resaltador dorado (`rgba(255, 207, 47, 0.96)`)
- **THEN** el texto sigue siendo legible (verificado con captura ampliada antes/después), gracias a un contorno oscuro (`text-shadow`) que define el borde de cada letra independientemente del color de fondo detrás

#### Scenario: Eyebrow "Identidad" sobre el fondo de la sección Descubrí (corregido)
- **WHEN** se mide el contraste del texto de `.route-copy .eyebrow` ("ENSENADA IDENTIDAD") contra el fondo compuesto de `.route-section`
- **THEN** el resultado es igual o mayor a 4.5:1
