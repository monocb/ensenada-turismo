# Bug: sección Cultura sin mostrar fotos correctamente

**Verificado como resuelto / no reproducible (2026-07-10)**, con Chrome headless emulando mobile sobre `netlify dev`: las 6 fotos del carrusel (`.culture-carousel[data-carousel]`) cargan y se muestran correctamente (`naturalWidth > 0`, sin espacios en blanco) al navegar con los controles `[data-carousel-prev]`/`[data-carousel-next]`. Ver `openspec/changes/archive/2026-07-10-verify-fix-mobile-bugs/` para el detalle de la verificación.

Reportado originalmente en una auditoría previa del sitio en vivo: la sección "Cultura música y encuentros" fue reportada sin mostrar sus fotos correctamente.
