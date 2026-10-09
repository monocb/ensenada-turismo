# Colores y tipografía

Paleta y tipografía oficiales del **Manual de Identidad v3.0**. El manual completo, navegable y con sus SVG, está en [`manual-identidad/`](manual-identidad/).

**Estado:** desde el 2026-10-08 el CSS del sitio **sí** usa esta paleta. Los tokens están declarados una sola vez, en el `:root` de [`assets/css/base.css`](../../assets/css/base.css), que cargan las tres páginas. Antes de esa fecha el sitio usaba una aproximación propia que se parecía a la paleta sin coincidir con ninguno de sus valores.

## Paleta de bandera

"Anclada a la bandera": la bandera oficial de 1999, con su cielo y sol naciente, el agua, la costa verde-monte y la franja roja de la fusión de orígenes.

| Uso | Color | Hex | Token | Pantone |
|---|---|---|---|---|
| Institucional | Verde-monte | `#1B5E20` | `--verde-monte` | |
| Lettering del logo | Sauce | `#3E8E3F` | `--sauce` | |
| Agua y naturaleza | Río verde | `#00A676` | `--rio-verde` | |
| Cielo con sol naciente | Celeste | `#3B6FD4` | `--celeste` | 285 |
| Sol naciente, identidad | Amarillo | `#FFD43D` | `--amarillo` | 108 |
| Fusión de orígenes, carnaval | Rojo | `#F04438` | `--rojo` | 185 |

## Complementarios

"El río, el cielo y el acero". Acompañan a la paleta de bandera en piezas digitales, fondos y señalética. **Nunca reemplazan al verde institucional.**

| Uso | Color | Hex | Token |
|---|---|---|---|
| Marca digital y enlaces | Río de la Plata | `#0B55FF` | `--rio-plata` |
| Fotos, agua, verano | Cielo de verano | `#00C8FF` | `--cielo-verano` |
| Cultura y agenda | Atardecer | `#6D5CFF` | `--atardecer` |
| Fondos y texto principal | Río de noche | `#0E1330` | `--noche` |
| Astillero, puerto, YPF, industria | Gris acero | `#6B7280` | `--acero` |

Neutrales: `--papel` `#F4F2EC`, `--noche-2` `#161B40`, `--gris-texto` `#4A5068`.

## Territorios

Cada localidad es una sub-marca con el mismo esqueleto y su propio par de colores. En el sitio se aplican con el hook `--place-color` / `--place-ink` sobre `[data-place]`.

| Territorio | Par del manual | Motivos |
|---|---|---|
| Punta Lara | `#1B5E20` + `#3E8E3F` | Sauce · Hoja de selva · Garza |
| El Dique | `#6B7280` + `#FFD43D` | Grúa · Barco · Sol naciente |
| Ensenada Centro | `#0E1330` + `#F04438` | Fuerte · Fragata · Murga · Mate |

Isla Santiago queda prevista como emblema ribereño transversal del partido.

**Nota de contraste.** El rojo y el verde sauce no sostienen texto chico: medidos sobre píxeles dan 3.76:1 y 4.46:1, por debajo del 4.5:1 de WCAG AA. Por eso en el sitio cada territorio usa el color **dominante** de su par como fondo, con tinta clara, y el acento queda para franjas y detalles.

## Tipografía

**El lettering es del logo. Archivo, lo institucional.**

El trazo de pincel no se tipea nunca: es exclusivo del logotipo. Todo lo demás se compone en **Archivo**.

| Peso | Uso |
|---|---|
| Black (900) | Títulos |
| Bold (700) | Subtítulos |
| Regular (400) | Texto corrido y párrafos largos |

Las sub-áreas de la marca paraguas (Turismo, Cultura, Adultos mayores, Prensa) van en Archivo Bold, mayúsculas espaciadas, junto al wordmark o la Caleta. Nunca compiten con el lettering.

## Logotipo

Los SVG viven en [`../../assets/marca/`](../../assets/marca/) y usan `fill="currentColor"`, así que una sola copia sirve para las tres variantes del manual. En el sitio se aplican como máscara CSS, no incrustados, para no repetir 17 KB de marcado en cada página.

- `ensenada-wordmark.svg` — el lettering, uso cotidiano.
- `ensenada-costa.svg` — el trazo que prolonga la última «A» dibujando la línea de costa.
- `ensenada-caleta.svg` — el contenedor de la marca.

La escala de forma del sitio sale de La Caleta: `--r-pastilla` 999px, `--r-caleta` 20px, `--r-media` 12px, `--r-chico` 8px.
