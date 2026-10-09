## Why

El sitio tiene una identidad propia que no es la de la marca. El Manual de Identidad v3.0 define un lettering de pincel, una tipografía institucional, una paleta anclada a la bandera de Ensenada y un contenedor llamado La Caleta. El sitio no usa nada de eso: escribe "ENSENADA" en Inter, tiene una paleta apagada que *se parece* a la de marca sin ser ninguno de sus colores, y mezcla once radios de borde distintos.

La distancia es medible. El manual dice `#3E8E3F` para el verde del logo; el sitio usa `#3f7b37`. Dice `#FFD43D` para el amarillo; el sitio usa `#ffcf4a`. Dice `#0E1330` para el fondo oscuro; el sitio usa `#070b0b`, que además tira a verde y no a azul. Ninguno está mal por sí solo: el problema es que el sitio es la pieza más visible de la marca y no habla su idioma.

Y hay algo que directamente falta: el logo. La marca **es** un lettering hecho a mano —"la letra hecha lugar"— cuyo último trazo se prolonga dibujando la costa de la ensenada. Ese gesto es la identidad entera en un solo movimiento, y el sitio lo reemplaza por una palabra tipeada.

## What Changes

**La marca aparece**

- El lettering de pincel reemplaza a la palabra tipeada en el hero y en el encabezado, usando los SVG del manual.
- El trazo de costa acompaña al lettering en el hero, con la animación que el manual describe: la misma mano escribe y sigue de largo dibujando la costa.
- La Caleta entra como contenedor de marca donde hoy hay rectángulos redondeados genéricos.

**El sistema se unifica**

- **Tipografía**: Archivo reemplaza a Inter. Black para títulos, Bold para subtítulos, Regular para texto corrido, tal como fija el manual.
- **Color**: los tokens del sitio pasan a ser los del manual, con sus nombres y sus roles. Se agregan los complementarios que el sitio no tenía: río de la plata para enlaces, cielo de verano, atardecer, gris acero.
- **Forma**: los once radios de borde se reducen a una escala de cuatro, derivada de la Caleta.

**Los territorios se vuelven sistema**

La sección de lugares ya tiene exactamente los tres territorios del manual —Punta Lara, El Dique, Ensenada Centro—, pero los trata como tres tarjetas iguales. Pasan a llevar el color y el motivo que el manual le asigna a cada uno.

**No cambia**

La arquitectura de información, las rutas, los anclas, el orden de las secciones, los textos y las fotos. Es un cambio de lenguaje visual sobre la estructura que ya existe y que acaba de quedar ordenada.

## Capabilities

### New Capabilities

- `brand-identity-system`: el sitio expresa la identidad del Manual v3.0 — lettering, tipografía institucional, paleta con sus roles y escala de forma — en lugar de una aproximación propia.
- `territory-visual-system`: cada uno de los tres territorios se distingue por el color y el motivo que le asigna el manual, dentro de un mismo esqueleto.

### Modified Capabilities

- `brand-system-copy`: el bloque de marca pasa a usar el lettering y la tipografía institucional.
- `eyebrow-color-consistency`: los volantillos se unifican sobre la paleta del manual.
- `home-cta-visual-treatment`: los botones adoptan la escala de forma y el color de enlace del manual.
- `place-card-visual-consistency`: las tarjetas de lugar dejan de ser tres iguales y pasan a ser tres territorios distinguibles.
- `text-contrast-over-images`: se revalida el contraste con la paleta nueva, que es más saturada que la actual.

## Impact

**Código afectado**

- `index.html`, `en-fotos/index.html`, `404.html` — lettering en el encabezado y el hero, carga de Archivo en lugar de Inter.
- `styles.css` — los cuatro bloques `:root` pasan a apoyarse en los tokens del manual; escala de forma; estilos del lettering, el trazo de costa y los territorios.
- `script.js` — la animación de la pincelada.
- `assets/marca/` — los tres SVG del manual, copiados desde `docs/marca/manual-identidad/`.
- `docs/marca/colores-y-tipografia.md` — documenta la paleta v1.0; se actualiza a la v3.0 y se marca que ahora **sí** coincide con el CSS.

**Riesgo principal**

La paleta nueva es bastante más saturada que la actual. Hay texto sobre fotos en cuatro lugares del sitio que ya se midieron una vez y cumplían; hay que volver a medirlos, porque cambian los colores de abajo.

**Verificación**

Sin tests de regresión visual en el repo, pero en esta sesión se montó un arnés con Chromium que ya se usó para comparar píxel a píxel y para medir contraste real. Se reutiliza.
