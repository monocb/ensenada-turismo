# Bug: menú hamburguesa mostrando seis líneas

**Verificado como resuelto / no reproducible (2026-07-10)**, con Chrome headless emulando mobile (320–430px) sobre `netlify dev`: el botón `[data-menu-button]` muestra un ícono estándar de tres líneas, y al hacer clic alterna correctamente `aria-expanded` entre `"false"` y `"true"`, mostrando la navegación (`[data-menu]`). Ver `openspec/changes/archive/2026-07-10-verify-fix-mobile-bugs/` para el detalle de la verificación.

Reportado originalmente en una auditoría previa del sitio en vivo: el botón de menú mobile mostraba seis líneas en vez de un ícono claro de tres líneas (hamburguesa estándar).
