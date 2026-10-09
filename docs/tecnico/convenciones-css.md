# Convenciones de CSS

## Las cuatro hojas vivas

Desde el rediseño del 2026-10-08 el CSS del sitio vive en `assets/css/`, repartido en una capa compartida y una hoja por página:

| Hoja | Qué tiene | Quién la carga |
|---|---|---|
| `base.css` | Tokens del Manual de Identidad v3.0 (un único `:root`), base tipográfica, `.salto`, encabezado `.enc`, pie `.pie`, visor de fotos, ficha de territorio, reveal | las tres páginas |
| `home.css` | Secciones de la portada: `.portada`, `.lineas`, `.territorio`, `.historia`, `.fragata`, `.redes` | `index.html` |
| `en-fotos.css` | Portada de la página de fotos y carretes `.photos-*` | `en-fotos/index.html` |
| `error.css` | `.perdida*` | `404.html` |

Cada página carga `base.css` primero y después la suya. **No hay un solo `!important` en las cuatro.**

## Reglas de la casa

- **Los tokens se declaran una sola vez**, en el `:root` de `base.css`. No abrir un segundo `:root`: ese fue justamente el problema de la hoja histórica.
- **Los nombres de clase de estado los fija `script.js`**, no el CSS: `is-open`, `is-scrolled`, `is-visible`, `has-lightbox`, `menu-open`, `modal-open`. Si una regla no dispara, lo primero a revisar es que el nombre coincida con el que pone el JS — ya pasó con un `is-compacto` que el JS nunca escribía.
- **Cuidado con la especificidad de clase + tipo.** `.bloque p` (0,1,1) le gana a `.mi-clase` (0,1,0), aunque la segunda venga después. Si una clase sobre un `<p>` tiene que ganar, escribirla como `.bloque .mi-clase`.
- **`display: block` explícito en los `<span>` con máscara.** El lettering se pinta como `mask` sobre un `<span>`; si el padre no es grid o flex, el span queda `inline`, `width` y `aspect-ratio` no aplican y el logo colapsa a 0×0 sin error en consola.
- **La escala de forma sale de La Caleta**: `--r-pastilla` 999px, `--r-caleta` 20px, `--r-media` 12px, `--r-chico` 8px. No agregar una quinta variante.
- **Movimiento reducido no es opcional**: toda animación lleva su alternativa en `@media (prefers-reduced-motion: reduce)`. Ojo que `scrollTo`/`scrollBy` con `behavior: "smooth"` **no** lo respetan solos: hay que consultar la constante `reduceMotion` de `script.js`.

## `styles.css`: la hoja histórica

`styles.css` (~6.8k líneas, 4 bloques `:root`) creció a fuerza de parches fechados y peleaba cada cambio por especificidad. **Ya no la carga ninguna página.** Queda en el repo mientras el rediseño está en revisión, para que volver atrás sea barato. Una vez aprobado, se borra.

No tiene sentido seguir parcheándola: cualquier cambio de estilos va en `assets/css/`.

## Verificación

No hay tests de regresión visual. Lo que sí corre CI (`.github/workflows/ci.yml`) es `stylelint` sobre todas las hojas y `html-validate` sobre las tres páginas. Para un cambio de composición conviene medir en navegador antes y después (alto de sección, desborde horizontal de 360 a 1920px, contraste sobre el color resuelto) en vez de confiar en la vista.
