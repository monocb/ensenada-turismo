"""Esqueleto (línea central) de un SVG relleno: skeleton.py <in.svg> <out_prefix> <ancho_px>"""
import sys, json
import numpy as np, pymupdf
from PIL import Image

src, out, W = sys.argv[1], sys.argv[2], int(sys.argv[3])
svg = open(src).read().replace('currentColor', '#000')
doc = pymupdf.open(stream=svg.encode(), filetype='svg')
page = doc[0]
zoom = W / page.rect.width
pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
img = np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width, pix.n)[..., 0]
B = (img < 128).astype(np.uint8)
B = np.pad(B, 2)

# distancia al borde (chamfer 3-4) para conocer el grosor del trazo
INF = 10**6
D = np.where(B, INF, 0).astype(np.int64)
H, Wd = D.shape
for y in range(1, H):
    row = D[y]; up = D[y-1]
    np.minimum(row, up + 3, out=row)
    row[1:] = np.minimum(row[1:], up[:-1] + 4); row[:-1] = np.minimum(row[:-1], up[1:] + 4)
    for x in range(1, Wd):
        if row[x] > row[x-1] + 3: row[x] = row[x-1] + 3
for y in range(H-2, -1, -1):
    row = D[y]; dn = D[y+1]
    np.minimum(row, dn + 3, out=row)
    row[1:] = np.minimum(row[1:], dn[:-1] + 4); row[:-1] = np.minimum(row[:-1], dn[1:] + 4)
    for x in range(Wd-2, -1, -1):
        if row[x] > row[x+1] + 3: row[x] = row[x+1] + 3
D = D / 3.0

# Zhang-Suen
S = B.copy()
def nb(S):
    P = np.pad(S, 1)
    return [P[0:-2,1:-1],P[0:-2,2:],P[1:-1,2:],P[2:,2:],P[2:,1:-1],P[2:,0:-2],P[1:-1,0:-2],P[0:-2,0:-2]]
changed = True
while changed:
    changed = False
    for step in (0, 1):
        p2,p3,p4,p5,p6,p7,p8,p9 = nb(S)
        Bn = p2+p3+p4+p5+p6+p7+p8+p9
        seq = [p2,p3,p4,p5,p6,p7,p8,p9,p2]
        A = sum(((seq[i]==0)&(seq[i+1]==1)).astype(np.uint8) for i in range(8))
        if step == 0: c = (p2*p4*p6==0)&(p4*p6*p8==0)
        else: c = (p2*p4*p8==0)&(p2*p6*p8==0)
        m = (S==1)&(Bn>=2)&(Bn<=6)&(A==1)&c
        if m.any(): S[m] = 0; changed = True

Image.fromarray(((1-B)*255 - S*200).clip(0,255).astype(np.uint8)).save(out + '-skel.png')
np.save(out + '-S.npy', S); np.save(out + '-D.npy', D)
print('size', S.shape, 'skeleton px', int(S.sum()), 'max half-width', D.max(), 'scale', zoom)
