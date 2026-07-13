## 1. Rama y preparación

- [x] 1.1 Crear rama `fix-visual-consistency-404` desde `main`

## 2. Cargar Inter en 404.html

- [x] 2.1 Agregar los 3 `<link>` de Google Fonts (preconnect googleapis, preconnect gstatic, stylesheet Inter) a `404.html`, copiados de `index.html:57-61`
- [x] 2.2 Verificar visualmente (sirviendo el sitio local) que el texto renderiza en Inter, no en Arial — no se pudo verificar visualmente (sin herramienta de navegador en esta sesión); verificado en cambio que `html-validate` pasa limpio sobre `404.html` con los 3 tags nuevos

## 3. Color del eyebrow

- [x] 3.1 Agregar `.not-found .eyebrow { color: var(--gold); }` (o selector equivalente con scope) en `styles.css`
- [x] 3.2 Verificar visualmente que "ENSENADA" se ve dorado, no rojo — verificación estática: `.not-found .eyebrow` (especificidad 0,2,0) le gana tanto a `.eyebrow` base (línea 196) como a la regla sitewide sin scope de línea 2977; no queda ninguna otra regla en el archivo que targetee `.not-found .eyebrow` y le gane

## 4. Verificación y entrega

- [x] 4.1 Pushear la rama y abrir PR contra `main`; confirmar que Netlify genera la Deploy Preview automática — PR #3, Deploy Preview: https://deploy-preview-3--ensenadaturismo.netlify.app. Nota: el check `quality-checks` mostró un fallo en una de sus dos corridas (push vs. pull_request) por `[429]` de Instagram en el chequeo de links — rate limit externo transitorio, no relacionado a este cambio; la otra corrida del mismo commit pasó limpia.
- [x] 4.2 Comparar visualmente la Deploy Preview de `/404` contra el resto del sitio (tipografía y color del eyebrow) — verificado leyendo el HTML/CSS servido: los 3 tags de Google Fonts y `.not-found .eyebrow { color: var(--gold); }` presentes. No se pudo tomar captura visual (sin herramienta de navegador en esta sesión).
- [x] 4.3 Con aprobación del usuario: mergear el PR y archivar el change (`/opsx:archive`) — PR #3 mergeado a `main` con confirmación explícita del usuario
