"""Construye los trazos de pincel (orden y dirección de escritura) pegados al esqueleto.
Los puntos guía están en coordenadas de la imagen numerada (2000 px de ancho)."""
import sys, json, heapq, math
import numpy as np

pre, VB_X, VB_Y, ZOOM, PAD = sys.argv[1], 103.0, 77.0, 0.48, 2
S = np.load(pre + '-S.npy'); D = np.load(pre + '-D.npy')
pts = set(zip(*np.nonzero(S)))
arr = np.array(sorted(pts))
DISP = 0.6  # imagen numerada -> px de esqueleto

STROKES = [  # (letra, puntos guía)
    ('E', [(160,18),(40,70),(38,290),(45,440),(120,530),(160,532)]),
    ('E', [(40,290),(145,270)]),
    ('n', [(250,212),(265,288),(278,485)]),
    ('n', [(265,288),(345,210),(400,205),(425,280),(435,535)]),
    ('s', [(660,285),(685,200),(650,172),(590,185),(535,250),(540,330),(590,410),(665,495),(640,545),(595,550),(505,490)]),
    ('E', [(920,180),(825,172),(790,265),(775,345),(775,470),(820,535),(878,537)]),
    ('E', [(785,340),(830,352),(893,378)]),
    ('n', [(987,212),(1000,282),(1010,480)]),
    ('n', [(1000,282),(1050,245),(1100,205),(1145,212),(1160,280),(1150,450),(1163,530)]),
    ('A', [(1250,550),(1255,430),(1275,300),(1300,200),(1355,172),(1395,190),(1405,300),(1407,425),(1407,500)]),
    ('A', [(1255,433),(1330,428),(1407,423)]),
    ('D', [(1578,205),(1548,240),(1540,400),(1560,540)]),
    ('D', [(1578,205),(1660,215),(1720,300),(1700,420),(1600,535),(1560,540)]),
    ('A', [(1800,548),(1810,430),(1830,250),(1870,185),(1915,172),(1945,190),(1957,300),(1962,425),(1957,503)]),
    ('A', [(1808,437),(1885,430),(1962,423)]),
]

def snap(p):
    y, x = p[1]*DISP, p[0]*DISP
    i = np.argmin((arr[:,0]-y)**2 + (arr[:,1]-x)**2)
    return tuple(arr[i])

N8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
def route(a, b):
    dist = {a: 0}; prev = {}; h = [(0, a)]
    while h:
        d, u = heapq.heappop(h)
        if u == b: break
        if d > dist[u]: continue
        for dy, dx in N8:
            v = (u[0]+dy, u[1]+dx)
            if v not in pts: continue
            nd = d + math.hypot(dy, dx)
            if nd < dist.get(v, 1e18): dist[v] = nd; prev[v] = u; heapq.heappush(h, (nd, v))
    path = [b]
    while path[-1] != a: path.append(prev[path[-1]])
    return path[::-1]

def rdp(P, eps):
    if len(P) < 3: return P
    a, b = P[0], P[-1]; ab = (b[0]-a[0], b[1]-a[1]); L = math.hypot(*ab) or 1e-9
    d = [abs(ab[0]*(p[1]-a[1]) - ab[1]*(p[0]-a[0])) / L for p in P[1:-1]]
    i = int(np.argmax(d)) + 1
    if d[i-1] > eps: return rdp(P[:i+1], eps)[:-1] + rdp(P[i:], eps)
    return [a, b]

def to_svg(p):  # (y, x) esqueleto -> (x, y) SVG
    return ((p[1]-PAD)/ZOOM + VB_X, (p[0]-PAD)/ZOOM + VB_Y)

def smooth_path(P):
    """Catmull-Rom -> Bézier cúbicas."""
    if len(P) == 2: return f'M{P[0][0]:.1f} {P[0][1]:.1f}L{P[1][0]:.1f} {P[1][1]:.1f}'
    d = f'M{P[0][0]:.1f} {P[0][1]:.1f}'
    for i in range(len(P)-1):
        p0 = P[i-1] if i else P[i]; p1, p2 = P[i], P[i+1]; p3 = P[i+2] if i+2 < len(P) else p2
        c1 = (p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6)
        c2 = (p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6)
        d += f'C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}'
    return d

out = []
for letter, guide in STROKES:
    g = [snap(p) for p in guide]
    full = [g[0]]
    for a, b in zip(g, g[1:]):
        full += route(a, b)[1:]
    hw = max(D[p] for p in full)
    simp = rdp(full, 1.5)
    P = [to_svg(p) for p in simp]
    # prolongar los extremos medio grosor: el esqueleto termina antes que la punta del trazo
    def ext(a, b, k):
        L = math.hypot(b[0]-a[0], b[1]-a[1]) or 1
        return (a[0] + (a[0]-b[0])/L*k, a[1] + (a[1]-b[1])/L*k)
    k = hw / ZOOM * 0.8
    P = [ext(P[0], P[1], k)] + P + [ext(P[-1], P[-2], k)]
    length = sum(math.hypot(P[i][0]-P[i-1][0], P[i][1]-P[i-1][1]) for i in range(1, len(P)))
    out.append({'letter': letter, 'd': smooth_path(P), 'w': round(2*hw/ZOOM + 14, 1), 'len': round(length, 1)})
json.dump(out, open(pre + '-strokes.json', 'w'), indent=1)
for o in out: print(o['letter'], o['w'], o['len'])
