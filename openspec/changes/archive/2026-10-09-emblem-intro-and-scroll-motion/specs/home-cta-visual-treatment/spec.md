## MODIFIED Requirements

### Requirement: El CTA de redes sociales del home no usa glassmorphism
Lo que la portada ponga encima de sus fotos de fondo SHALL usar un fondo sólido, casi-sólido o ningún fondo, y SHALL no combinar `backdrop-filter: blur(...)` con una opacidad translúcida tipo vidrio esmerilado — siguiendo la regla de marca "resaltador, no vidrio". Su legibilidad SHALL sostenerse contra **todas** las fotos del ciclo, no contra una, con un recurso propio de la portada y no con el encuadre afortunado de una imagen; y SHALL medirse sobre los píxeles reales, no estimarse.

El requisito nombraba `.social-strip`, una franja con enlaces a redes debajo del hero. Ese elemento no existe más: el rediseño de marca lo reemplazó por una sección propia de redes al final de la página. Se conserva la regla, aplicada a lo que hoy sí vive encima de las fotos de la portada — la frase y la invitación a seguir bajando.

#### Scenario: Renderizado de lo que va sobre las fotos de la portada
- **WHEN** se carga `index.html` y se observa lo que está encima de las fotos de fondo
- **THEN** ningún elemento combina `backdrop-filter: blur` con una opacidad translúcida tipo vidrio esmerilado

#### Scenario: Legibilidad sobre cualquiera de las fotos del crossfade del hero
- **WHEN** el ciclo de la portada muestra cualquiera de sus 8 fotos de fondo
- **THEN** la frase y la invitación mantienen contraste suficiente contra el nuevo fondo, medido sobre los píxeles reales, para las 8 fotos y no sólo para una

#### Scenario: El recurso de legibilidad no depende del encuadre
- **WHEN** se reemplaza una foto del ciclo por otra
- **THEN** la legibilidad se sostiene por un recurso propio de la portada —un velo graduado a la altura donde cae el texto, una sombra, o similar— sin depender de cómo esté encuadrada esa imagen
