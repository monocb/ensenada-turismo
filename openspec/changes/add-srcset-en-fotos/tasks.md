## 1. Assets

- [x] 1.1 Copiar las 38 variantes de `parroquia-el-dique` a `assets/en-fotos/parroquia-el-dique/`
- [x] 1.2 Copiar las 20 variantes de `stella-maris-punta-lara` a `assets/en-fotos/stella-maris-punta-lara/`
- [x] 1.3 Copiar las 40 variantes de `domingo-punta-lara` a `assets/en-fotos/domingo-punta-lara/`

## 2. JavaScript

- [x] 2.1 Modificar `setupPhotoReelSection()` en `script.js` para generar `srcset` (`<prefix>-<NN>-480w.webp 480w, <prefix>-<NN>-900w.webp 900w`) y `sizes="260px"` en cada `<img>` creado

## 3. Verificación

- [x] 3.1 Verificar en el navegador (viewports simulados) que las fotos de las 3 galerías cargan la variante esperada
- [x] 3.2 Confirmar que no hay 404 (todas las 98 variantes existen para las 49 fotos)
- [x] 3.3 Correr `npx --yes html-validate --config .htmlvalidate.json en-fotos/index.html` para confirmar que sigue válido

## 4. Documentación

- [x] 4.1 Actualizar `docs/pendientes/performance.md`: sin pendientes de `srcset` restantes en el sitio

## 5. Deploy

- [ ] 5.1 Commit + push a `main` (confirmar con el usuario antes)
- [ ] 5.2 Verificar en producción
- [ ] 5.3 Archivar el change y sincronizar la spec `responsive-hero-images`
