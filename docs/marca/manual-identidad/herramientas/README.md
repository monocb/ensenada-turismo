# Herramientas del manual de identidad

Scripts que generaron el manual (`../index.html`, `../manual-identidad-ensenada.pdf`), los trazos vectorizados (`../ensenada-*.svg`) y la animación de pincelada (`../pincelada-demo.html`). No forman parte del sitio ni se publican: solo hacen falta si cambia el logo o el manual.

Requisitos: Python 3 con `numpy`, `pillow` y `pymupdf`. Para vectorizar, además `pip install potracer`.

## Vectorizar un trazo a mano (`trace.py`)

Recorta una zona de una imagen, la amplía y la convierte en SVG.

```bash
python trace.py <imagen> x0 y0 x1 y1 <salida.svg> [light|dark] [escala]
```

El modo invierte qué se toma como tinta; si el resultado sale “en negativo”, usar el otro.

## Manual de identidad (`build.py` + `template.html`)

`template.html` es el manual con marcadores (`{{WM_D}}`, `{{TERRITORIOS}}`…); `build.py` les inserta los trazos de `../ensenada-*.svg` y genera las páginas de territorios, familia y animación.

```bash
python build.py ../index.html
```

El PDF sale de imprimir `index.html` con Edge o Chrome sin encabezados (`--headless=new --no-pdf-header-footer --print-to-pdf=...`); las páginas están maquetadas a 1920×1080.

## Animación de pincelada

La letra se revela con una máscara: por la línea central de cada letra corre un trazo grueso que avanza (`stroke-dashoffset`), y cada letra tiene su propia máscara para que un trazo no destape la vecina.

```bash
python skeleton.py ../../../../assets/marca/ensenada-wordmark.svg trabajo/wm 1200
python branches.py trabajo/wm      # opcional: trabajo/wm-branches.png con las ramas numeradas
python strokes.py trabajo/wm
python skeleton.py ../../../../assets/marca/ensenada-costa.svg trabajo/co 1800
python demo.py ../pincelada-demo.html
```

- **Orden y dirección de las pinceladas:** lista `STROKES` en `strokes.py`. Son puntos guía en coordenadas de `trabajo/wm-branches.png` (2000 px de ancho); el script los pega al esqueleto. Si cambia el lettering, regenerar esa imagen y volver a marcar los puntos.
- **Ritmo:** `SPEED` (velocidad del pincel) y `OVERLAP` (cuánto se solapa un trazo con el siguiente) en `demo.py`. Velocidad constante y timing `linear`: con easing por trazo, la animación se ve “por partes”.
