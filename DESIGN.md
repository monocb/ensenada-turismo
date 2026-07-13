---
name: Turismo Ensenada
description: Marca ciudad y archivo visual de Ensenada (Buenos Aires) — río, cultura, historia, memoria, orgullo local.
colors:
  primary: "#ffcf4a"
  primary-deep: "#ffcf2f"
  ink: "#101014"
  night: "#080b18"
  paper: "#fbf4e7"
  white: "#ffffff"
  line-fotos: "#00c8ff"
  line-fotos-accent: "#c7ff31"
  line-cultura: "#6d5cff"
  line-cultura-accent: "#ffd43d"
  line-historia: "#173f78"
  line-envivo: "#f04438"
  brand-blue-oficial: "#0b55ff"
typography:
  display:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "clamp(46px, 14vw, 168px)"
    fontWeight: 950
    lineHeight: 0.84
    letterSpacing: "0"
  headline:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "clamp(32px, 5vw, 66px)"
    fontWeight: 900
    lineHeight: 1
  body:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "clamp(20px, 2vw, 30px)"
    fontWeight: 900
    lineHeight: 1.15
  label:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    letterSpacing: "0.02em"
rounded:
  control: "10px"
  pill: "999px"
  flat: "0px"
  card: "18px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  nav-toggle:
    backgroundColor: "rgba(7, 11, 11, 0.46)"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
  social-link:
    backgroundColor: "rgba(255, 255, 255, 0.92)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  carousel-control:
    backgroundColor: "rgba(255, 255, 255, 0.12)"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
---

# Design System: Turismo Ensenada

## 1. Overview

**Creative North Star: "La Señal Costera"**

El sitio se lee como el río de noche: una superficie oscura y densa (navy casi negro, `#101014`–`#080b18`) sobre la que se recortan señales de color vivo — el dorado resaltador que marca lo importante, y un color por cada línea de contenido (Fotos, Cultura, Historia, En Vivo) que ordena el archivo como boyas en el agua. La palabra ENSENADA, en Inter en sus pesos más pesados (900–950), es siempre el elemento con más fuerza visual de cualquier pantalla — más que cualquier ícono o foto.

Este sistema rechaza explícitamente el tono de folleto turístico, el exceso de texto, los íconos obvios y el tono de oficina pública (ver `docs/marca/sistema-visual.md`). No es una vidriera institucional prolija; es un archivo vivo con orgullo local, y el diseño tiene que sentirse así: denso, fotográfico, con la palabra al frente.

**Key Characteristics:**
- Superficie oscura por defecto (navy/negro), no un neutro cálido tipo "paper" de SaaS genérico.
- Un único acento dorado-resaltador (`#ffcf4a`/`#ffcf2f`) que funciona como "highlighter" literal detrás de texto, no como botón CTA genérico.
- Un color propio por línea de contenido (Fotos=celeste+lima, Cultura=violeta+amarillo, Historia=azul documento, En Vivo=rojo) dentro de una sola marca madre.
- Tipografía única (Inter) en pesos extremos (800–950) haciendo todo el trabajo de jerarquía — sin una segunda familia tipográfica.
- Fotografía real (gente, río, puerto) siempre por delante de cualquier elemento decorativo.

## 2. Colors

Paleta de alto contraste: superficie oscura, un resaltador dorado que domina la interacción, y un color por línea de contenido para orientar sin depender de iconografía.

### Primary
- **Dorado Resaltador** (`#ffcf4a`, variante `#ffcf2f`): el acento más usado del sitio en la práctica — fondo de botones (ej. "Cerrar" en modales), franja resaltadora detrás del tagline del hero, círculos numerados, enlaces del footer. Es el color que carga la marca en pantalla, más que el azul del manual oficial (ver nota abajo).

### Secondary (sistema por línea de contenido)
- **Violeta Cultura** (`#6d5cff`) con acento **Amarillo** (`#ffd43d`): sección Cultura.
- **Celeste Fotos** (`#00c8ff`) con acento **Lima** (`#c7ff31`): línea En Fotos / En Vivo.
- **Azul Documento** (`#173f78`): línea Historia.
- **Rojo Alerta** (`#f04438`): línea En Vivo cuando indica algo en curso.

### Neutral
- **Tinta** (`#101014`): color de texto por defecto sobre superficies claras, y tono base de "ink" del sistema.
- **Noche** (`#080b18`): la superficie más oscura — footer, fondos densos.
- **Papel** (`#fbf4e7`): neutro cálido claro, para las superficies que no son oscuras (uso más acotado que la superficie oscura por defecto).
- **Blanco** (`#ffffff`): texto sobre superficies oscuras, controles translúcidos.

### Named Rules
**La Regla del Resaltador.** El dorado (`#ffcf4a`/`#ffcf2f`) se usa como un marcador literal — franja detrás de texto, círculos, bordes de foco — nunca como relleno de superficies grandes. Su fuerza es la escasez y el contraste contra el fondo oscuro.

**Nota de deriva:** el Manual Interno de Marca (`docs/marca/colores-y-tipografia.md`) designa el Azul (`#0B55FF`) como "Marca (principal)", pero no aparece renderizado en las superficies muestreadas del sitio en vivo — el dorado ocupa ese rol en la práctica. Documentado tal cual está hoy; si se decide alinear el CSS al manual, esto debería revisarse explícitamente, no asumirse.

## 3. Typography

**Display Font:** Inter (con Arial, Helvetica, sans-serif como fallback)
**Body Font:** Inter (misma familia, mismo peso extremo)
**Label/Mono Font:** ninguna — no hay una tercera familia en el sistema.

**Character:** Una sola familia sans-serif geométrica llevada a sus pesos más pesados (800–950) para todo: titulares, cuerpo de texto destacado y navegación. No hay pareja tipográfica — la fuerza viene del peso y la escala, no del contraste entre dos familias. Esto es intencional: "la palabra es protagonista" (`docs/marca/sistema-visual.md`), no un descuido de no elegir una segunda fuente.

### Hierarchy
- **Display** (950, `clamp(46px, 14vw, 168px)`, line-height 0.84): título ENSENADA del hero y títulos de sección equivalentes. Todo en mayúsculas.
- **Headline** (900, `clamp(32px, 5vw, 66px)`, line-height 1): títulos de sección (ej. "Cultura, música y encuentros").
- **Body destacado** (900, `clamp(20px, 2vw, 30px)`, line-height 1.15): taglines y textos cortos de impacto — nótese que incluso el "cuerpo" de texto es peso 900, no un peso liviano de lectura.
- **Label** (800, 14px, letter-spacing 0.02em): navegación, botones, badges.

### Named Rules
**La Regla del Peso Único.** No hay pesos livianos (400–600) en ningún texto visible de marca. Si un texto nuevo necesita sentirse "de marca", súbanle el peso antes de bajarle el tamaño.

## 4. Elevation

El sistema usa sombras suaves y difusas con tinte navy (`rgba(5, 32, 49, 0.13)`), no negro puro ni sombras duras — la profundidad se siente como neblina sobre el río, no como un recorte duro de Material Design. No hay capas tonales (superficie más clara = más elevada); toda la elevación se comunica vía sombra difusa.

### Shadow Vocabulary
- **Elevación de tarjeta** (`box-shadow: 0 26px 80px rgba(5, 32, 49, 0.13)`): usada en tarjetas y contenedores flotantes sobre fondo claro.
- **Elevación de hero** (`box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34)`): variante más oscura para elementos sobre las secciones con foto de fondo.

### Named Rules
**La Regla de la Sombra con Color.** Ninguna sombra usa negro puro (`rgba(0,0,0,...)`) sobre superficies claras — siempre un tinte navy que ata la sombra a la paleta del sitio en vez de un gris genérico de UI kit.

## 5. Components

### Buttons
- **Shape:** pill completo (`border-radius: 999px`) — ningún botón real usa esquinas rectas.
- **Primary:** fondo dorado (`{colors.primary}`), texto tinta oscura, peso 900, mayúsculas (ej. botón "Cerrar" de los modales de lugar).
- **Hover / Focus:** anillo de foco dorado con offset (`outline: 3px solid var(--gold); outline-offset: 4px`) en todos los controles interactivos — es el mecanismo de accesibilidad de foco visible del sitio.
- **Secundario (controles translúcidos):** fondo blanco a 12% de opacidad sobre fondo oscuro, borde blanco a 24% — usado en controles de carrusel y el botón de menú mobile.

### Cards / Containers
- **Corner Style:** las place-cards y sus tarjetas hermanas (`.fragata-hero`, `.video-panel`, `.culture-slide`) usan el radio nombrado de "card" (`rounded.card`, 18px) — unificado a propósito en el change archivado `2026-07-10-unify-place-card-radius`, que corrigió una deriva anterior donde las place-cards estaban en `0px` sin motivo de marca. Este 18px es hoy la decisión vigente del sistema, no una deriva pendiente.
- **Background:** superficies claras (papel) para el contenido editorial largo; superficies oscuras para hero, footer y secciones de impacto.
- **Shadow Strategy:** ver Elevación — sombra difusa tinte navy.

### Navigation
- Fondo del header translúcido oscuro sobre la foto del hero; enlaces blancos a 88% de opacidad, peso 800.
- Botón de menú (`.nav-toggle`): ícono de tres líneas estándar, translúcido oscuro con borde blanco, `border-radius: 10px` — nótese que este es uno de los pocos elementos con radio "control" (10px) en vez de pill o flat, otra inconsistencia de forma a tener en cuenta.
- Mobile: el panel del menú desplegado hoy tiene fondo semi-transparente, dejando ver el `<h1>` del hero por detrás — señalado como hallazgo de una auditoría previa, no corregido todavía.

### Carrusel / Reel
- Controles circulares translúcidos (blanco 12% sobre oscuro), pill completo.
- Las "líneas" de contenido (Fotos, Cultura, Historia, En Vivo) cada una con su propio par de colores (ver sección Colors) aplicado a acentos puntuales, no a fondos completos.

## 6. Do's and Don'ts

### Do:
- **Do** usar Inter en pesos 800+ para cualquier texto que deba sentirse "de marca" — nunca pesos livianos en titulares o CTAs.
- **Do** reservar el dorado (`#ffcf4a`) para momentos puntuales de énfasis (resaltador, botón primario, foco) — no como color de fondo extendido.
- **Do** usar `border-radius: 999px` (pill) en controles interactivos: botones, chips, controles de carrusel.
- **Do** usar sombras difusas con tinte navy (`rgba(5, 32, 49, ...)`), nunca negro puro, para mantener la profundidad ligada a la paleta.
- **Do** anteponer la fotografía real (gente, río, puerto, historia) a cualquier ilustración o ícono decorativo — es un principio de marca, no solo visual (`docs/marca/sistema-visual.md`).
- **Do** dar foco visible con anillo dorado offset (`outline: 3px solid var(--gold); outline-offset: 4px`) a todo control interactivo nuevo.

### Don't:
- **Don't** usar tono de folleto turístico, exceso de texto, íconos obvios ni tono de oficina pública — anti-referencias explícitas de PRODUCT.md y del Manual Interno de Marca.
- **Don't** introducir una segunda familia tipográfica sin una razón de marca explícita — el sistema depende de una sola fuente en pesos extremos, no de pares de fuentes.
- **Don't** asumir que el azul del manual oficial (`#0B55FF`) es el color primario al construir algo nuevo — en la práctica el dorado ocupa ese rol; si se quiere alinear con el manual, es una decisión a tomar explícitamente, no a asumir.
- **Don't** agregar más variantes de `border-radius` sin revisar primero la inconsistencia ya detectada (place-cards en `0px` contra el resto del sistema en pill/`999px`) — no sumar una tercera variante a un problema ya señalado como no intencional.
- **Don't** usar sombras negras puras (`rgba(0,0,0,...)`) sobre superficies claras — rompe la coherencia tonal navy del sistema.
