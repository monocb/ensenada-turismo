# Bug: "renglón amarillo" rompe el layout en mobile

**Verificado como resuelto / no reproducible (2026-07-10)**, con Chrome headless emulando mobile (320–430px) sobre `netlify dev`: no se detectó overflow horizontal en ningún punto de la página de inicio (`document.documentElement.scrollWidth === window.innerWidth` en los 6 anchos probados). El resaltado amarillo detrás del tagline del hero (`.hero-content p.hero-tagline span`) se ve correctamente contenido, sin romper el layout. Ver `openspec/changes/archive/2026-07-10-verify-fix-mobile-bugs/` para el detalle de la verificación.

Reportado originalmente en una auditoría previa del sitio en vivo: un elemento con franja/fondo amarillo rompía el layout en pantallas mobile.
