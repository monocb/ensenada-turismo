"""Vectoriza un recorte de una imagen: trace.py <img> x0 y0 x1 y1 <out.svg> [modo] [escala]
modo: 'dark' (tinta oscura sobre fondo claro) o 'light' (tinta clara sobre fondo oscuro)."""
import sys
import numpy as np
import potrace  # pip install potracer
from PIL import Image, ImageFilter

img, x0, y0, x1, y1, out = sys.argv[1], *map(int, sys.argv[2:6]), sys.argv[6]
mode = sys.argv[7] if len(sys.argv) > 7 else 'dark'
k = int(sys.argv[8]) if len(sys.argv) > 8 else 10

im = Image.open(img).convert('RGB').crop((x0, y0, x1, y1))
g = im.convert('L').resize((im.width * k, im.height * k), Image.LANCZOS)
g = g.filter(ImageFilter.GaussianBlur(k * 0.45))
a = np.asarray(g, dtype=float)
lo, hi = np.percentile(a, 2), np.percentile(a, 98)
thr = (lo + hi) / 2
bm = a < thr if mode == 'dark' else a > thr

bmp = potrace.Bitmap(bm)
path = bmp.trace(turdsize=k * k * 2, alphamax=1.2, opticurve=True, opttolerance=0.4)

W, H = im.width * k, im.height * k
d = []
for c in path:
    s = c.start_point
    d.append(f'M{s.x:.1f} {s.y:.1f}')
    for seg in c:
        if seg.is_corner:
            d.append(f'L{seg.c.x:.1f} {seg.c.y:.1f}L{seg.end_point.x:.1f} {seg.end_point.y:.1f}')
        else:
            d.append(f'C{seg.c1.x:.1f} {seg.c1.y:.1f} {seg.c2.x:.1f} {seg.c2.y:.1f} {seg.end_point.x:.1f} {seg.end_point.y:.1f}')
    d.append('Z')
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
       f'<path fill="currentColor" fill-rule="evenodd" d="{"".join(d)}"/></svg>')
open(out, 'w').write(svg)
print(out, W, H, len(svg))
