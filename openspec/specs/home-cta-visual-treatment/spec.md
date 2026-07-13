## Purpose

TBD - created by syncing change fix-visual-consistency-home. Update Purpose after archive.

## Requirements

### Requirement: El CTA de redes sociales del home no usa glassmorphism
El `.social-strip` (la franja con los enlaces a Instagram/Facebook/TikTok debajo del hero de `index.html`) SHALL usar un fondo sólido o casi-sólido, sin `backdrop-filter: blur(...)` combinado con un fondo translúcido — siguiendo la regla de marca "resaltador, no vidrio" (`reference/brand.md` del skill impeccable, ban list de glassmorphism decorativo).

#### Scenario: Renderizado del social-strip sobre el hero
- **WHEN** se carga `index.html` y se observa la franja de redes sociales debajo del hero
- **THEN** el fondo de `.social-strip` no combina `backdrop-filter: blur` con una opacidad translúcida tipo vidrio esmerilado

#### Scenario: Legibilidad sobre cualquiera de las fotos del crossfade del hero
- **WHEN** el crossfade del hero muestra cualquiera de sus 8 fotos de fondo
- **THEN** el texto y los íconos dentro de `.social-strip` mantienen contraste suficiente contra el nuevo fondo sólido/casi-sólido, para las 8 fotos, no solo una
