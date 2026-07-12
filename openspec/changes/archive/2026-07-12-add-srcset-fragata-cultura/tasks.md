## 1. Assets

- [x] 1.1 Copiar las 24 variantes de Fragata (`*-480w.webp`, `*-900w.webp`, `*-1400w.webp`) a `assets/fragata/`
- [x] 1.2 Copiar las 18 variantes de Cultura a `assets/` (junto a los `cultura-*.jpg` originales)

## 2. Markup

- [x] 2.1 Agregar `srcset`/`sizes` al `<img>` de `.fragata-hero` en `index.html`
- [x] 2.2 Agregar `srcset`/`sizes` a los 8 `<img>` de `.fragata-reel` en `index.html`
- [x] 2.3 Agregar `srcset`/`sizes` a los 6 `<img>` de `.culture-slide` en `index.html`

## 3. Verificación

- [x] 3.1 Verificar en el navegador (DevTools, viewports simulados 375/768/1280/1920px) que cada `<img>` carga la variante esperada
- [x] 3.2 Correr `npx --yes html-validate --config .htmlvalidate.json index.html` para confirmar que el markup sigue válido

## 4. Documentación

- [x] 4.1 Actualizar `docs/pendientes/performance.md`: marcar Fragata y Cultura como resueltas, aclarar que en-fotos y el resto quedan pendientes

## 5. Deploy

- [x] 5.1 Commit + push a `main` (confirmar con el usuario antes, dispara deploy automático en Netlify)
- [x] 5.2 Verificar en producción
- [x] 5.3 Archivar el change y sincronizar la spec `responsive-hero-images`
