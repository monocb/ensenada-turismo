## 1. Rama y preparación

- [x] 1.1 Crear rama `fix-visual-consistency-en-fotos` desde `main`
- [x] 1.2 Leer `.place-card::before` (`styles.css:6385-6396`) como referencia del patrón de barra superior a reutilizar

## 2. Reemplazar el side-stripe por barra superior

- [x] 2.1 Reescribir `.photos-reel-section::before` (`styles.css:5612-5618`) como barra superior en vez de franja lateral, siguiendo la estructura de `.place-card::before`
- [x] 2.2 Verificar visualmente que la tarjeta no queda con espaciado/recorte roto tras el cambio de posición del acento — encontrado y corregido al implementar: `.photos-reel-heading` tenía `padding-left: 8px` compensando específicamente el ancho del side-stripe viejo; se quitó porque ya no aplica con la barra superior. Sin herramienta de navegador disponible para confirmar visualmente en esta sesión, pero el análisis del box model (ambos acentos son `position: absolute`, fuera del flujo) no muestra riesgo de recorte.

## 3. Tokens de color de la línea Fotos

- [x] 3.1 Reemplazar el color decorativo de la barra (`#14bce5`) por `var(--brand-cyan)` (y/o `var(--brand-lime)` si aplica un acento secundario) — implementado como gradiente `linear-gradient(90deg, var(--brand-cyan), var(--brand-lime))`
- [x] 3.2 Definir un tono más oscuro de la familia cyan para el texto del eyebrow y aplicarlo a `.photos-reel-eyebrow` en vez de `#009fd1` — se usó `#007ba3`
- [x] 3.3 Medir el contraste final del eyebrow con una herramienta de contraste (no solo estimarlo) y confirmar ≥4.5:1 — medido contra el fondo real compuesto (`.photos-reel-section` `rgba(255,255,255,0.76)` sobre el stop más oscuro del gradiente del body, `#eef8fb`): **4.73:1**, cumple AA

## 4. Normalizar literales de dorado

- [x] 4.1 Reemplazar los literales `#ffcf2f` dentro de las reglas `.photos-*` por `var(--brand-yellow, #ffcf2f)` — 8 ocurrencias normalizadas (`.photos-back-link`, `.photos-reel-number`, `.photos-reel-controls button:hover` ×2, `.photos-reel` scrollbar, `.photos-reel-card:focus-visible`, `.photos-page-hero .section-kicker` ×2, `.photos-back-link` border). Se dejó sin tocar la única ocurrencia fuera de scope (`a:focus-visible` global, línea 7454 — no es específica de esta página).

## 5. Verificación y entrega

- [x] 5.1 Pushear la rama y abrir PR contra `main`; confirmar que Netlify genera la Deploy Preview automática — PR #2, Deploy Preview: https://deploy-preview-2--ensenadaturismo.netlify.app
- [x] 5.2 Comparar visualmente la Deploy Preview contra `ensenadaturismo.com/en-fotos` (producción) — verificado leyendo el CSS servido: barra superior con `--brand-cyan`/`--brand-lime` y eyebrow en `#007ba3` presentes. No se pudo tomar captura visual (sin herramienta de navegador en esta sesión).
- [ ] 5.3 Con aprobación del usuario: mergear el PR y archivar el change (`/opsx:archive`)
