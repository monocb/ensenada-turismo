import re, sys, os
S = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1]

def load(name):
    # trazos vectorizados que viven junto al manual (un nivel arriba de herramientas/)
    svg = open(os.path.join(S, '..', f'ensenada-{name}.svg')).read()
    return re.search(r' d="([^"]+)"', svg).group(1)

def bbox(d):
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    xs, ys = nums[0::2], nums[1::2]
    return min(xs), min(ys), max(xs), max(ys)

def vb(d, pad=0):
    x0, y0, x1, y1 = bbox(d)
    return f'{x0-pad:.0f} {y0-pad:.0f} {x1-x0+2*pad:.0f} {y1-y0+2*pad:.0f}'

wm, ca, co = load('wordmark'), load('caleta'), load('costa')
# relleno pleno de la Caleta: el subtrazado exterior (el de mayor caja)
subs = ['M' + p for p in ca.split('M') if p.strip()]
outer = max(subs, key=lambda p: (lambda b: (b[2]-b[0])*(b[3]-b[1]))(bbox(p)))

T = open(f'{S}/template.html', encoding='utf-8').read()
rep = {'WM_VB': vb(wm), 'WM_D': wm, 'CA_VB': vb(ca), 'CA_D': ca, 'CO_VB': vb(co), 'CO_D': co, 'CA_FILL': outer}

def lockup(ring, word, name_color, w=360, name=None, size=22):
    h = round(w * 0.567)
    name_html = (f'<div style="margin-top:20px;font-weight:800;letter-spacing:.22em;font-size:{size}px;'
                 f'color:{name_color};text-transform:uppercase;text-align:center;line-height:1.25">{name}</div>') if name else ''
    return (f'<div style="display:flex;flex-direction:column;align-items:center">'
            f'<div style="position:relative;width:{w}px;height:{h}px">'
            f'<svg class="wm" style="width:100%;height:100%;color:{ring}"><use href="#caleta"/></svg>'
            f'<svg class="wm" style="position:absolute;left:18%;top:28%;width:64%;height:44%;color:{word}"><use href="#wordmark"/></svg>'
            f'</div>{name_html}</div>')

TERR = [
    dict(n=10, name='Punta Lara', bg='var(--verde-monte)', ring='#fff', word='#fff', namec='#fff', acc='var(--sauce)',
         title_c='var(--verde-monte)', kc='cA', side='left',
         lead='La reserva natural: la selva marginal más austral del mundo, los sauces, las garzas, los recreos y la costa.',
         chips=[('#1B5E20', 'var(--verde-monte)', '#fff'), ('#3E8E3F', 'var(--sauce)', '#fff')],
         icons=[('i-sauce', 'Sauce'), ('i-hoja', 'Hoja de selva'), ('i-garza', 'Garza')]),
    dict(n=11, name='El Dique', bg='var(--acero)', ring='var(--amarillo)', word='#fff', namec='var(--amarillo)', acc='var(--acero)',
         title_c='#3F4552', kc='cD', side='right',
         lead='El corazón obrero: el Astillero Río Santiago, el puerto, YPF y la industria que hizo ciudad.',
         chips=[('#6B7280', 'var(--acero)', '#fff'), ('#FFD43D', 'var(--amarillo)', 'var(--noche)')],
         icons=[('i-grua', 'Grúa'), ('i-bote', 'Barco'), ('i-sol', 'Sol naciente')]),
    dict(n=12, name='Ensenada Centro', bg='var(--noche)', ring='var(--rojo)', word='#fff', namec='var(--rojo)', acc='var(--rojo)',
         title_c='var(--noche)', kc='cB', side='left',
         lead='La historia viva: el Fuerte Barragán (1801), la plaza Belgrano, el carnaval, el mate y la memoria de Malvinas.',
         chips=[('#0E1330', 'var(--noche)', '#fff'), ('#F04438', 'var(--rojo)', '#fff')],
         icons=[('i-fuerte', 'Fuerte'), ('i-fragata', 'Fragata'), ('i-bombo', 'Murga'), ('i-mate', 'Mate')]),
]

def territorio(t):
    chips = ''.join(f'<span style="background:{bg};color:{fg};padding:10px 20px;border-radius:99px;font-size:19px;font-weight:800;letter-spacing:.04em">{hx}</span>'
                    for hx, bg, fg in t['chips'])
    ico_color = t['acc'] if t['n'] != 11 else '#3F4552'
    icons = ''.join(f'<figure style="text-align:center"><svg width="96" height="96" style="color:{ico_color}"><use href="#{i}"/></svg>'
                    f'<figcaption style="font-size:19px;font-weight:700;margin-top:14px">{lbl}</figcaption></figure>' for i, lbl in t['icons'])
    text = (f'<div style="display:flex;flex-direction:column;justify-content:center">'
            f'<h2 style="font-size:120px;color:{t["title_c"]};margin:0">{t["name"].replace(" ", "<br>") if t["n"]==12 else t["name"]}.</h2>'
            f'<p class="lead" style="margin-top:30px;max-width:640px">{t["lead"]}</p>'
            f'<div style="display:flex;gap:12px;margin-top:36px;flex-wrap:wrap">{chips}</div>'
            f'<div class="label" style="margin-top:44px">Motivos</div>'
            f'<div style="display:flex;gap:12px;margin-top:12px;font-size:22px;font-weight:600;color:var(--gris-texto)">{" · ".join(l for _, l in t["icons"])}</div></div>')
    visual = (f'<div style="display:grid;grid-template-rows:1.25fr 1fr;gap:28px;min-height:0">'
              f'<div class="card" style="background:{t["bg"]}"><span class="label" style="color:rgba(255,255,255,.65)">Lockup territorial</span>'
              f'{lockup(t["ring"], t["word"], t["namec"], 400, t["name"], 26)}</div>'
              f'<div class="card" style="justify-content:space-evenly"><span class="label">Iconos del territorio</span>{icons}</div></div>')
    cols = '1fr 1.15fr' if t['side'] == 'left' else '1.15fr 1fr'
    body = text + visual if t['side'] == 'left' else visual + text.replace('justify-content:center"', 'justify-content:center;padding-left:40px"', 1)
    return (f'<!-- {t["n"]:02} · E · {t["name"].upper()} -->\n<section class="frame"><div class="slide">'
            f'<div class="kicker {t["kc"]}">E · Territorio</div>'
            f'<div style="display:grid;grid-template-columns:{cols};gap:80px;flex:1;margin:40px 0 120px;min-height:0">{body}</div>'
            f'<div class="foot"><span>E · Los territorios</span><span>{t["n"]:02}</span></div></div></section>\n')

rep['TERRITORIOS'] = ''.join(territorio(t) for t in TERR)

FAM = [('Punta Lara', 'var(--sauce)', 'Selva · sauce · garza', None),
       ('El Dique', 'var(--amarillo)', 'Grúa · barco · engranaje', None),
       ('Ensenada Centro', 'var(--rojo)', 'Fuerte · fragata · murga · mate', None),
       ('Isla Santiago', 'var(--cielo-verano)', 'Bote · pez · pesca', '#0D2A50')]
rep['FAMILIA'] = ''.join(
    f'<div class="card" style="flex-direction:column;justify-content:center;{"background:"+bg+";outline:2px solid #1F4E8C" if bg else ""}">'
    f'<span class="label">{"Emblema ribereño" if bg else "Territorio"}</span>'
    f'{lockup(c, "#fff", c, 300, n, 22)}'
    f'<div style="font-size:19px;color:#8E95BC;margin-top:16px;text-align:center">{m}</div></div>'
    for n, c, m, bg in FAM)

FR = [(32, 0, 'Empieza el trazo'), (100, 0, 'Se completa la palabra'), (100, 42, 'El trazo sigue de largo'), (100, 100, 'Dibuja la costa')]
def frame(i, w, c, cap, live):
    cls = ' live' if live else ''
    cw = '' if live else f'clip-path:inset(0 {100-w}% 0 0);'
    cc = '' if live else f'clip-path:inset(0 {100-c}% 0 0);'
    capc = 'color:var(--amarillo)' if i == 3 else ''
    return (f'<div class="card{cls}"><span class="n">0{i+1}</span><div class="stage">'
            f'<svg class="wm w" width="280" height="90" style="{cw}color:#fff"><use href="#wordmark"/></svg>'
            f'<svg class="wm c" width="280" height="34" style="{cc}margin-top:10px;color:var(--sauce)"><use href="#costa"/></svg></div>'
            f'<figcaption style="{capc}">{cap}</figcaption></div>')
rep['FRAMES'] = ''.join(frame(i, w, c, cap, False) for i, (w, c, cap) in enumerate(FR))

for k, v in rep.items():
    T = T.replace('{{' + k + '}}', v)
left = re.findall(r'\{\{\w+\}\}', T)
assert not left, left
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(T)
for name, d in (('ensenada-wordmark', wm), ('ensenada-caleta', ca), ('ensenada-costa', co)):
    open(os.path.join(os.path.dirname(OUT), name + '.svg'), 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb(d)}"><path fill="currentColor" fill-rule="evenodd" d="{d}"/></svg>')
print('ok', len(T))
