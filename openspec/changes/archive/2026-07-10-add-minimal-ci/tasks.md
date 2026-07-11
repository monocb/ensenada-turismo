## 1. Fix trivial requerido

- [x] 1.1 Corregir `<!doctype html>` → `<!DOCTYPE html>` en `index.html`, `en-fotos/index.html`, `404.html`

## 2. Configuración de linting

- [x] 2.1 Crear `.htmlvalidate.json` extendiendo `html-validate:recommended` con `void-style`, `prefer-native-element`, `attribute-allowed-values`, `empty-heading`, `aria-label-misuse`, `hidden-focusable` y `unique-landmark` desactivadas
- [x] 2.2 Documentar los 3 hallazgos de accesibilidad (aria-label-misuse, hidden-focusable, unique-landmark) en `docs/pendientes/accesibilidad.md` con archivo:línea exactos (aprovechado para también marcar los 5 ítems ya resueltos que no se habían actualizado en el archivo)

## 3. Workflow de GitHub Actions

- [x] 3.1 Crear `.github/workflows/ci.yml` con trigger en `push` y `pull_request`
- [x] 3.2 Step de validación HTML: `npx html-validate --config .htmlvalidate.json index.html en-fotos/index.html 404.html`
- [x] 3.3 Step de validación de sintaxis CSS: `npx stylelint styles.css` (config `.stylelintrc.json` con `{"rules": {}}` — `stylelint --config` no acepta JSON inline como sí hace `html-validate`, se descubrió al verificar el comando exacto antes de subir)
- [x] 3.4 Step de link checking: `npx linkinator . --recurse --skip "..."` — cambiado en el camino (ver nota abajo): la primera versión levantaba un servidor manual (`serve` + loop de `curl`) y falló 2 veces seguidas en GitHub Actions sin poder ver el log detallado (sin auth de `gh`); se simplificó a que `linkinator` escanee la carpeta local directamente, sin servidor manual — elimina toda la clase de problemas de timing/binding de puerto

## 4. Verificación y deploy

- [x] 4.1 Correr los 3 comandos localmente contra el estado final del repo (post-fixes) y confirmar 0 errores en los 3 (encontrado y corregido en el camino: `stylelint --config` con JSON inline no funciona, se necesitaba `.stylelintrc.json`)
- [x] 4.2 Commit + push a `main`
- [x] 4.3 Confirmar en GitHub Actions que el workflow corrió y quedó en verde (tras 2 iteraciones: la versión original con servidor manual falló 2 veces en el runner sin poder ver el log detallado; simplificar a `linkinator .` sin servidor propio lo resolvió)
