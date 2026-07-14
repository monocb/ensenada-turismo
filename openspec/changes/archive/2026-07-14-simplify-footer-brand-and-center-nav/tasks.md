## 1. HTML — simplificar `.footer-brand` en las 3 páginas

- [x] 1.1 En `index.html`, dentro de `.footer-brand`, eliminar `<strong>ENSENADA</strong>` y el `<p>Turismo Ensenada · Río, cultura e historia.</p>`, dejando solo `<p class="footer-credit">Administrado por NexaContenidos.</p>`.
- [x] 1.2 Aplicar el mismo cambio en `en-fotos/index.html`.
- [x] 1.3 Aplicar el mismo cambio en `404.html`.

## 2. HTML — eliminar la columna `.footer-column` (heading + nav) en las 3 páginas

- [x] 2.1 En `index.html`, eliminar `<div class="footer-column">...</div>` completo (heading "Guía de la página" + nav de 7 links).
- [x] 2.2 Aplicar el mismo cambio en `en-fotos/index.html`.
- [x] 2.3 Aplicar el mismo cambio en `404.html`.

## 3. CSS — limpiar y simplificar

- [x] 3.1 `.site-footer`: cambiar de `display:grid` con `grid-template-columns` a `display:block` (un solo hijo).
- [x] 3.2 Eliminar el `@media (max-width: 900px) { .site-footer { grid-template-columns: 1fr !important; } }` (ya no aplica, sin grid).
- [x] 3.3 Eliminar `.footer-brand strong` — huérfana tras sacar `<strong>ENSENADA</strong>`.
- [x] 3.4 Eliminar `.footer-heading` y todas las variantes de `.footer-links` (base, `a`, media queries) — huérfanas tras sacar `.footer-column` de las 3 páginas.

## 4. Verificación

- [x] 4.1 Servir el sitio en local (`npx serve .`) y confirmar en las 3 páginas: el footer solo muestra "Administrado por NexaContenidos.", sin columna de navegación.
- [x] 4.2 `node --check script.js` (no cambió) y balance de llaves en `styles.css`.
- [x] 4.3 Confirmación visual del usuario en navegador.

## 5. OpenSpec

- [x] 5.1 Ejecutar `/opsx:sync` para aplicar la nueva spec `footer-brand-content` a `openspec/specs/`. También se corrigieron `site-footer-coverage` y `home-social-links-section` (cambios anteriores), que mencionaban el nav del footer ahora eliminado.
- [ ] 5.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
