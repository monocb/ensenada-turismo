## 1. Sección nueva `#redes` en `index.html`

- [x] 1.1 Agregar `<section class="feature-section redes-section" id="redes" aria-labelledby="redes-title">` en `index.html`, inmediatamente después del `</section>` que cierra `.fragata-section` y antes de `.image-lightbox`.
- [x] 1.2 Dentro: `.redes-section-aura` (aura de fondo neutral), 3 `.redes-section-wash--{instagram,facebook,tiktok}` (capas de color ocultas), `.redes-section-inner` con `<h2 id="redes-title" class="redes-section-title">Seguinos</h2>` y `<ul class="social-badges" role="list">` con los 3 `<li><a class="social-badge social-badge--{instagram,facebook,tiktok}">`, reutilizando verbatim URLs/handles/SVG del footer anterior, con `sr-only` prefijando el nombre de la red en cada link.
- [x] 1.3 Actualizar el nav principal y el footer nav de `index.html`: el link "Redes" apunta a `/#redes`.

## 2. Reversión de la página standalone `/redes/`

- [x] 2.1 Eliminar `redes/index.html` y la carpeta `redes/`.
- [x] 2.2 Revertir `_redirects`: sacar la línea `/redes /redes/ 301`.
- [x] 2.3 Revertir `sitemap.xml`: sacar la entrada `<url>` de `/redes`.
- [x] 2.4 En `en-fotos/index.html` (main-nav y footer nav) y `404.html` (footer nav): cambiar el link "Redes" de `/redes/` a `/#redes`.

## 3. CSS — vidrio esmerilado y cambio de color de fondo de sección

- [x] 3.1 `.redes-section`: `order: 21` (para quedar después de `.fragata-section`, que usa `order: 20`, dentro del `<main>` flex), `position:relative; isolation:isolate; overflow:hidden;`, fondo base `var(--brand-night)`.
- [x] 3.2 `.redes-section-aura`: 3 `radial-gradient` borrosos en `--brand-cyan`/`--brand-blue`/`--brand-violet` (estado neutral de reposo).
- [x] 3.3 `.redes-section-wash` + variantes por red: capa a pantalla completa, `transform: translateX(-105%)` en reposo, color `color-mix(in srgb, var(--brand-X) 58%, #04101f 42%)`.
- [x] 3.4 `.redes-section:has(.social-badge--instagram:hover) .redes-section-wash--instagram` (y análogos para `:focus-visible`, Facebook, TikTok): `transform: translateX(0)`.
- [x] 3.5 `.social-badge`: vidrio esmerilado puro (`background: rgba(8,11,24,0.28)`, `backdrop-filter: blur(18px) saturate(160%)` + `-webkit-backdrop-filter`, borde, `box-shadow`) — sin `::before` ni color propio por red (se eliminó de la iteración anterior).
- [x] 3.6 `.social-badge-icon`/`.social-badge-label`: ícono de Instagram con `fill:none; stroke:#fff`, Facebook/TikTok con `fill:#fff`.
- [x] 3.7 Responsive: `@media (max-width: 640px)` para que los 3 badges reduzcan tamaño y sigan centrados/envueltos.
- [x] 3.8 Verificar contraste del texto blanco sobre los 3 colores de "wash" (cálculo WCAG): cyan 4.84:1, azul 10.05:1, violeta 8.80:1 — los 3 pasan AA.
- [x] 3.9 `.redes-section`: `min-height: 100svh` (ocupa toda la pantalla, no una franja acotada).
- [x] 3.10 Unificar el color de fondo entre el final de Fragata y el inicio de Redes: en el bloque `.fragata-section` que gana la cascada (`styles.css` ~línea 2377), cambiar el stop final del gradiente de `#0b1933` a `var(--brand-night)` (igual al fondo base de `.redes-section`).
- [x] 3.11 En `.redes-section-aura`, extender el fade sólido de `transparent 22%` a `transparent 42%` y atenuar los 3 `radial-gradient` (de 34-38% a 24-26%), para que la sección entre en tono sólido (igual al de Fragata) y se disuelva mucho más gradualmente hacia el aura de color — confirmado visualmente por el cliente como el ajuste correcto.
- [x] 3.12 Bug encontrado y corregido: una regla preexistente y ajena a este cambio, `main > section:not(.hero) { min-height: auto !important; }` (styles.css ~línea 3634), anulaba el `min-height: 100svh` de `.redes-section` por especificidad/`!important`, haciendo que la sección se achicara a su contenido pese a que el CSS servido era correcto. Se agregó `#redes { min-height: 100svh !important; }` (selector de ID, especificidad suficiente para ganarle) sin tocar la regla genérica preexistente.
- [x] 3.13 Scroll-snap entre Fragata y Redes (encastre de pantalla completa al scrollear): se probaron `scroll-snap-type` a nivel documento (`html`, `proximity` y luego `mandatory`, con `overflow-y: scroll` explícito) y un contenedor de scroll dedicado (`.snap-scroll-zone` envolviendo ambas secciones). Ninguno de los dos conformó al cliente visualmente — se revirtió por completo, quedando `.fragata-section`/`.redes-section` como hijas directas de `<main>` con sus `order: 20`/`21` originales, sin ninguna propiedad `scroll-snap-*`. Alcance final: sin scroll-snap.

## 4. Limpiar CSS huérfano en `styles.css`

- [x] 4.1 Eliminar `.instagram-link .social-icon`, `.instagram-link .social-icon svg`, `.facebook-link .social-icon`, `.facebook-link .social-icon svg`, `.tiktok-link .social-icon`, `.tiktok-link .social-icon svg`.
- [x] 4.2 Eliminar `.footer-social { justify-self }` y `.footer-social-links { justify-content }`, variante desktop y variante dentro de `@media (max-width: 900px)`.
- [x] 4.3 Eliminar `.footer-social-links a`, `.footer-social-links .social-icon`, `.footer-social-links .social-icon svg`, `.footer-social-links a strong`, `.footer-social-links a:hover/:focus-visible`.
- [x] 4.4 `.site-footer { grid-template-columns: ... }` (el único de los bloques `.site-footer {}` del archivo que declara `grid-template-columns`) pasa de 3 a 2 tracks.

## 5. Verificación

- [x] 5.1 Servir el sitio en local (`npx serve .`) y abrir `index.html`: confirmar que `#redes` aparece después de `#fragata`, los 3 badges centrados, vidrio esmerilado visible.
- [x] 5.2 Confirmar que `/redes/` ya no existe como página (404) y que `index.html`, `en-fotos/index.html`, `404.html` ya no muestran redes en el footer; el link "Redes" en nav/footer de las 3 páginas lleva a `/#redes`.
- [x] 5.3 Confirmación visual del usuario en navegador: hover sobre cada badge cambia el color de fondo de toda la sección (no solo el badge), entrando desde un costado. También confirmados: pantalla completa y degrade suave con Fragata. Descartado (ver 3.13): el encastre de scroll por sección, que el cliente pidió pero no le convenció ninguna implementación probada.
- [x] 5.4 Verificar contraste (ver 3.8).
- [x] 5.5 Confirmar con `node --check script.js` (no cambió) y balance de llaves en `styles.css`.

## 6. OpenSpec

- [x] 6.1 Ejecutar `/opsx:sync` para aplicar la nueva spec `home-social-links-section`, el MODIFIED de `site-footer-coverage`, y el REMOVED de `footer-social-badges` a `openspec/specs/`.
- [x] 6.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
