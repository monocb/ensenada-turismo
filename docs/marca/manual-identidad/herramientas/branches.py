"""Separa el esqueleto en ramas, las simplifica y las numera."""
import sys, json
import numpy as np
from PIL import Image, ImageDraw

pre = sys.argv[1]
S = np.load(pre + '-S.npy'); D = np.load(pre + '-D.npy')
H, W = S.shape
pts = set(zip(*np.nonzero(S)))
N8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
def nbrs(p): return [(p[0]+a, p[1]+b) for a, b in N8 if (p[0]+a, p[1]+b) in pts]

def branches():
    ring = [(-1,0),(-1,1),(0,1),(1,1),(1,0),(1,-1),(0,-1),(-1,-1)]
    def crossing(p):
        v = [((p[0]+a, p[1]+b) in pts) for a, b in ring]
        return sum(1 for i in range(8) if not v[i] and v[(i+1) % 8])
    nodes = {p for p in pts if crossing(p) != 2}
    visited = set(); out = []
    def walk(start, first):
        path = [start, first]; prev, cur = start, first
        while cur not in nodes:
            visited.add(cur)
            nx = [r for r in nbrs(cur) if r != prev and r not in visited and r != start]
            if not nx:
                nx = [r for r in nbrs(cur) if r in nodes and r != prev and r != start]
                if not nx: break
            # preferir el vecino más lejano del anterior: sigue la dirección
            nx.sort(key=lambda r: -((r[0]-prev[0])**2 + (r[1]-prev[1])**2))
            prev, cur = cur, nx[0]; path.append(cur)
        return path
    for n in nodes:
        for q in nbrs(n):
            if q in visited or q in nodes and any(o[:2] == [n, q] or o[:2] == [q, n] for o in out): continue
            out.append(walk(n, q))
    # lazos cerrados sin nodos (la D)
    rest = pts - visited - nodes
    while rest:
        st = min(rest); visited.add(st)
        nx = [r for r in nbrs(st) if r in rest and r != st]
        if not nx: rest.discard(st); continue
        p = walk(st, nx[0]); p.append(st); out.append(p)
        rest = pts - visited - nodes
    return out

def rdp(P, eps):
    if len(P) < 3: return P
    a, b = np.array(P[0], float), np.array(P[-1], float)
    ab = b - a; L = np.hypot(*ab) or 1e-9
    d = [abs(ab[0]*(p[1]-a[1]) - ab[1]*(p[0]-a[0])) / L for p in P[1:-1]]
    i = int(np.argmax(d)) + 1
    if d[i-1] > eps: return rdp(P[:i+1], eps)[:-1] + rdp(P[i:], eps)
    return [P[0], P[-1]]

br = branches()
# podar espolones cortos que terminan en punta
def length(P): return sum(np.hypot(P[i][0]-P[i-1][0], P[i][1]-P[i-1][1]) for i in range(1, len(P)))
final = [b for b in br if length(b) >= 14]
res = []
for b in final:
    simp = rdp(b, 1.2)
    hw = max(D[p] for p in b)
    res.append({'pts': [(int(x), int(y)) for y, x in simp], 'hw': float(hw), 'len': length(b)})
res.sort(key=lambda r: min(p[0] for p in r['pts']))
json.dump(res, open(pre + '-branches.json', 'w'))

im = Image.open(pre + '-skel.png').convert('RGB').resize((W*2, H*2))
dr = ImageDraw.Draw(im)
cols = [(230,40,40),(30,120,230),(20,160,60),(200,120,0),(150,40,200),(0,160,170)]
for i, r in enumerate(res):
    P = [(x*2, y*2) for x, y in r['pts']]
    dr.line(P, fill=cols[i % 6], width=5)
    mx, my = P[len(P)//2]
    dr.rectangle([mx-14, my-12, mx+14, my+12], fill=(255,255,255))
    dr.text((mx-10, my-8), str(i), fill=cols[i % 6])
    dr.ellipse([P[0][0]-5, P[0][1]-5, P[0][0]+5, P[0][1]+5], fill=(255,220,0))
im.save(pre + '-branches.png')
print(len(br), 'ramas;', len(res), 'tras podar')
