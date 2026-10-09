"""Arma la demo de pincelada: demo.py <out.html>"""
import sys, json, re, math, heapq
import numpy as np
import os
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, '..', '..', '..', '..'))
S_DIR = os.path.join(HERE, 'trabajo')   # salidas intermedias de skeleton.py / strokes.py

def svgpath(f):
    t = open(f).read()
    return re.search(r'viewBox="([^"]+)"', t).group(1), re.search(r' d="([^"]+)"', t).group(1)

wm_vb, wm_d = svgpath(os.path.join(REPO, 'assets', 'marca', 'ensenada-wordmark.svg'))
co_vb, co_d = svgpath(os.path.join(REPO, 'assets', 'marca', 'ensenada-costa.svg'))
strokes = json.load(open(os.path.join(S_DIR, 'wm-strokes.json')))

# costa: recorrido del extremo izquierdo al derecho por su esqueleto
S = np.load(os.path.join(S_DIR, 'co-S.npy')); D = np.load(os.path.join(S_DIR, 'co-D.npy'))
pts = set(zip(*np.nonzero(S))); a = min(pts, key=lambda p: p[1]); b = max(pts, key=lambda p: p[1])
dist = {a: 0}; prev = {}; h = [(0, a)]
while h:
    d, u = heapq.heappop(h)
    if u == b: break
    if d > dist[u]: continue
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            v = (u[0]+dy, u[1]+dx)
            if v in pts and v != u:
                nd = d + math.hypot(dy, dx)
                if nd < dist.get(v, 1e18): dist[v] = nd; prev[v] = u; heapq.heappush(h, (nd, v))
path = [b]
while path[-1] != a: path.append(prev[path[-1]])
path = path[::-1][::6] + [b]
vx, vy, vw, vh = map(float, co_vb.split()); z = 1800 / vw
co_pts = [((p[1]-2)/z + vx, (p[0]-2)/z + vy) for p in path]
co_center = 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in co_pts)
co_w = round(2 * D.max() / z + 24, 1)

# tiempos: velocidad constante de pincel, con una pausa breve entre trazos
SPEED = 4.2     # unidades SVG por ms, igual para todos los trazos
OVERLAP = 0.18  # cada trazo arranca cuando al anterior le falta este tramo
t = 250; rows = []
for s in strokes:
    dur = s['len'] / SPEED
    rows.append((s, round(t), round(dur)))
    t += dur * (1 - OVERLAP)
co_len = 3637
co_dur = round(co_len / (SPEED * 1.6))   # la costa es un solo gesto largo: algo más rápida
co_start = round(t)

# Cada letra con su propia máscara: un trazo grueso no puede destapar la letra vecina.
li = -1; prev_tag = None
for k, (s, st, du) in enumerate(rows):
    if s['letter'] != prev_tag: li += 1
    s['li'] = li; prev_tag = s['letter']
n_letters = li + 1
def nums(d): n = list(map(float, re.findall(r'-?\d+\.?\d*', d))); return n[0::2], n[1::2]
centers = []
for k in range(n_letters):
    xs = [x for s, _, _ in rows if s['li'] == k for x in nums(s['d'])[0]]
    centers.append(sum(xs) / len(xs))
groups = [[] for _ in range(n_letters)]
for sp in re.findall(r'M[^M]+', wm_d):
    xs, _ = nums(sp); cx = (min(xs) + max(xs)) / 2
    groups[min(range(n_letters), key=lambda k: abs(centers[k] - cx))].append(sp)

mask_defs = []; letter_paths = []
for k in range(n_letters):
    ps = '\n'.join(
        f'<path d="{s["d"]}" stroke-width="{s["w"]}" pathLength="1" style="animation-delay:{st}ms;animation-duration:{du}ms"/>'
        for s, st, du in rows if s['li'] == k)
    mask_defs.append(f'<mask id="m-l{k}" maskUnits="userSpaceOnUse" x="-500" y="-500" width="5000" height="2000"><g class="trazo">{ps}</g></mask>')
    letter_paths.append(f'<path d="{"".join(groups[k])}" fill="#F4F2EC" fill-rule="evenodd" mask="url(#m-l{k})"/>')
mask_paths = '\n'.join(mask_defs)
print('subtrazados por letra:', [len(g) for g in groups])

html = f'''<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pincelada del emblema</title>
<style>
:root{{--noche:#0E1330;--sauce:#3E8E3F}}
*{{margin:0;box-sizing:border-box}}
body{{min-height:100vh;background:var(--noche);display:grid;place-items:center;font-family:system-ui,sans-serif;color:#8E95BC}}
.emblema{{width:min(86vw,760px)}}
.emblema svg{{display:block;width:100%;height:auto;overflow:visible}}
.trazo path{{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 1;stroke-dashoffset:1;
  animation-name:pinta;animation-timing-function:linear;animation-fill-mode:forwards}}
@keyframes pinta{{to{{stroke-dashoffset:0}}}}
button{{margin-top:40px;background:none;border:2px solid #2A3060;color:#C9CDE2;font:600 15px system-ui;padding:10px 22px;border-radius:99px;cursor:pointer}}
@media (prefers-reduced-motion:reduce){{.trazo path{{animation:none;stroke-dashoffset:0}}}}
</style></head>
<body>
<div style="text-align:center">
  <div class="emblema" role="img" aria-label="Ensenada">
    <svg viewBox="{wm_vb}" aria-hidden="true">
      <defs>
{mask_paths}
      </defs>
{chr(10).join(letter_paths)}
    </svg>
    <svg viewBox="{co_vb}" style="margin-top:3%" aria-hidden="true">
      <defs><mask id="m-co" maskUnits="userSpaceOnUse" x="-500" y="-500" width="6000" height="2000"><g class="trazo">
        <path d="{co_center}" stroke-width="{co_w}" pathLength="1" style="animation-delay:{co_start}ms;animation-duration:{co_dur}ms;animation-timing-function:cubic-bezier(.2,0,.6,1)"/>
      </g></mask></defs>
      <path d="{co_d}" fill="var(--sauce)" fill-rule="evenodd" mask="url(#m-co)"/>
    </svg>
  </div>
  <button type="button" onclick="location.reload()">Repetir</button>
</div>
</body></html>'''
open(sys.argv[1], 'w', encoding='utf-8').write(html)
print('total ms', co_start + co_dur, 'strokes', len(rows))
