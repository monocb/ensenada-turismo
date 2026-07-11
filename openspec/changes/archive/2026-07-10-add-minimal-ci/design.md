## Context

No existe `.github/workflows/` en el repo — cero CI hoy. `netlify.toml` solo tiene `[build] publish = "."`, deploy estático directo sin paso de build.

Se probaron 3 herramientas contra los archivos reales del repo antes de proponer nada (vía `npx`, sin tocar el repo):

- **`html-validate`** con config `recommended` por defecto: **118 errores**, en su gran mayoría (~110) `void-style` (prefiere `<meta>` sin `/>` de cierre — es un estilo XHTML vs HTML5, ambos válidos, y el repo usa consistentemente el estilo con `/>` en las 3 páginas) y `prefer-native-element` (8 veces, exactamente sobre los `<img role="button">` del carrete de la Fragata que se agregaron a propósito en el cambio `make-fragata-reel-keyboard-accessible` para no romper el CSS existente envolviendo en `<button>`). Con esas 2 reglas desactivadas: **18 errores reales**, de los cuales 3 son el `doctype-style` (minúscula vs mayúscula, trivial) y 15 son hallazgos de accesibilidad genuinos pero nuevos (no descubiertos en el ciclo de accesibilidad anterior). Al fijar el doctype se encontraron además 4 falsos positivos adicionales no contemplados en el análisis inicial: `attribute-allowed-values` (3 veces, sobre `<img src="">`/`<img src="" alt="">` de `data-lightbox-image`/`data-place-modal-image`, placeholders que JS llena en runtime al abrir el lightbox/modal) y `empty-heading` (1 vez, sobre `<h3 data-place-modal-title></h3>`, mismo patrón — JS lo llena al abrir el modal de lugar).
- **`stylelint`** con `stylelint-config-standard`: **1960 problemas** — mayormente `selector-class-pattern` (el repo usa BEM con `__`, ej. `.place-modal__copy`, que no es kebab-case puro) y `no-duplicate-selectors`/`no-descending-specificity` (la naturaleza ya documentada y aceptada de `styles.css`: 4 bloques `:root`, docenas de selectores redeclarados por parches — exactamente lo que `docs/tecnico/convenciones-css.md` y `CLAUDE.md` piden NO reorganizar sin tests de regresión visual). Aplicar este config generaría ~2000 errores desde el primer commit — inútil como señal, entrena a ignorar CI. **Con cero reglas de estilo (`{"rules": {}}`), solo validación de sintaxis: 0 problemas** — el archivo es sintácticamente válido.
- **`linkinator`**: escaneó 38 links (internos + `fonts.googleapis.com` + referencias a `ensenadaturismo.com`) sirviendo el sitio en local — 0 links rotos.

## Goals / Non-Goals

**Goals:**
- CI que arranca en verde desde el primer commit, sin falsos positivos ni ruido de reglas de estilo que contradicen convenciones ya aceptadas del proyecto.
- Detectar HTML genuinamente inválido, CSS con errores de sintaxis, y links/imágenes rotos — el tipo de error que sí es un bug, no una preferencia.

**Non-Goals:**
- No se hace regresión visual con screenshots/baseline (alcance elegido explícitamente).
- No se arreglan ahora los 15 hallazgos de accesibilidad nuevos que aparecieron al probar `html-validate` — se documentan en `docs/pendientes/accesibilidad.md` para un cambio futuro dedicado, consistente con cómo se manejó el ciclo de accesibilidad anterior (investigar, encontrar, no necesariamente arreglar todo en el mismo momento).
- No se impone un estilo de código CSS (kebab-case, orden de propiedades, etc.) — el estado actual de `styles.css` es deuda conocida y aceptada, no algo que un lint nuevo deba empezar a bloquear retroactivamente.
- No se bloquea el deploy de Netlify con este CI — es informativo. Convertirlo en gate real es una decisión aparte (requiere configurar Netlify para depender de un check de GitHub).

## Decisions

**Hallazgos de accesibilidad nuevos, desactivados en la config de CI pero documentados, no arreglados en este cambio:**
- `aria-label-misuse` (4 veces): `<div aria-label="...">` en `.brand-line-grid`, `.fragata-reel`, `.place-accordion`, `.video-panel` (`index.html:149,211,280,419`) — un `<div>` sin `role` no expone `aria-label` de forma confiable a todos los lectores de pantalla; necesitaría `role="region"` o similar.
- `hidden-focusable` (7 veces): `.image-lightbox[aria-hidden="true"]` (`index.html:260`, `en-fotos/index.html:170`) contiene botones (`lightbox-close`, `lightbox-prev`, `lightbox-next`) que siguen siendo alcanzables por Tab aunque el contenedor esté marcado `aria-hidden="true"` — a confirmar si el CSS ya evita el foco cuando está cerrado (no verificado en este cambio) antes de decidir el fix.
- `unique-landmark` (1 vez): `<nav class="main-nav">` (`index.html:78`) sin nombre accesible único — hay un solo `<nav>` en la página así que el impacto real es bajo, pero la regla lo señala igual.

**Por qué desactivar en vez de arreglar ahora:** el alcance que elegiste es "mínimo" — agregar CI. Mezclar 3 fixes de accesibilidad no relacionados (uno de los cuales requiere verificar comportamiento CSS antes de tocar nada) infla este cambio más allá de su propósito. Quedan documentados con archivo:línea exactos para no perderlos.

**`stylelint` sin `stylelint-config-standard`, solo sintaxis.** Ver Context — el config estándar genera ~2000 problemas contra convenciones ya aceptadas del proyecto. Alternativa descartada: usar `stylelint-config-standard` con cientos de reglas desactivadas una por una — más frágil y menos legible que simplemente no extender ningún config.

**Herramientas invocadas vía `npx` en el workflow, sin `package.json` en el repo.** Consistente con `CLAUDE.md`: la restricción de "sin build/dependencias" es sobre el sitio que Netlify despliega, no sobre herramientas de CI que corren en un runner de GitHub Actions y nunca tocan el sitio servido. Trade-off aceptado: cada corrida de CI descarga las herramientas de nuevo (sin caché de versión fijada) — aceptable para un chequeo mínimo, se puede optimizar después con `actions/cache` si el tiempo de CI se vuelve un problema.

**Trigger: `push` y `pull_request`, sin gate de deploy.** El repo no usa un flujo de PRs hoy (historial de commits directos a `main`, un solo mantenedor) — el CI en `push` funciona como una red de seguridad post-commit, no como un gate previo. Se incluye `pull_request` igual por si el flujo de trabajo cambia en el futuro.

## Risks / Trade-offs

- **[Riesgo] Sin versiones fijadas (`npx` siempre trae la última versión de cada herramienta), una actualización de `html-validate`/`stylelint`/`linkinator` podría cambiar el comportamiento y romper CI sin que nadie haya tocado el sitio.** → Mitigación aceptada como trade-off del alcance mínimo sin `package.json`; si se vuelve un problema, se puede fijar versión con `npx html-validate@X.Y.Z` explícito.
- **[Riesgo] Los 15 hallazgos de accesibilidad quedan silenciados en la config de CI — alguien podría asumir que no existen.** → Mitigación: quedan documentados con archivo:línea exacto en `docs/pendientes/accesibilidad.md`, mismo patrón que otros hallazgos de esta sesión.
- **[Riesgo] Ninguno para el sitio en producción** — el CI corre en GitHub Actions, no en el pipeline de deploy de Netlify.

## Migration Plan

1. Corregir el doctype en las 3 páginas.
2. Crear `.htmlvalidate.json` con las reglas desactivadas documentadas arriba.
3. Crear `.github/workflows/ci.yml` con 3 jobs (o 3 steps): `html-validate`, `stylelint` (solo sintaxis), `linkinator` (contra el sitio servido con `npx serve .` en el runner).
4. Documentar los 3 hallazgos de accesibilidad nuevos en `docs/pendientes/accesibilidad.md`.
5. Commit + push a `main` → el workflow corre por primera vez, debería quedar en verde.
6. Rollback: borrar `.github/workflows/ci.yml` si por algún motivo genera falsos positivos persistentes — no afecta el sitio en producción de ninguna forma.

## Open Questions

Ninguna.
