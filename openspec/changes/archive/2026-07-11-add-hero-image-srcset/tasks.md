## 1. Assets

- [x] 1.1 Copiar las 24 variantes generadas (`*-480w.webp`, `*-900w.webp`, `*-1400w.webp`) a `assets/portada-home/`

## 2. Markup

- [x] 2.1 Agregar `srcset` (480w/900w/1400w + original) y `sizes="100vw"` a los 8 `<img class="hero-image hero-slide">` en `index.html`

## 3. Verificación

- [x] 3.1 Verificar en el navegador (DevTools, viewports simulados 375px/430px DPR1-3, tablet, desktop) que cada uno carga la variante esperada
- [x] 3.2 Confirmar visualmente que no hay degradación de calidad, especialmente `portada-03-camino-noche`
- [x] 3.3 Correr `npx --yes html-validate --config .htmlvalidate.json index.html` para confirmar que el markup sigue válido

## 4. Documentación

- [x] 4.1 Actualizar `docs/pendientes/performance.md`: marcar `srcset` del hero como resuelto, aclarar que el resto del sitio queda pendiente
- [x] 4.2 Documentar el comando de `ffmpeg` para regenerar variantes en `docs/tecnico/`

## 5. Deploy

- [x] 5.1 Commit + push a `main` (confirmar con el usuario antes, dispara deploy automático en Netlify)
- [x] 5.2 Verificar en producción (ensenadaturismo.com) que el hero carga correctamente
- [ ] 5.3 Archivar el change y sincronizar la spec `responsive-hero-images`
