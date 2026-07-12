## 1. Assets

- [x] 1.1 Copiar las variantes de `el-dique`, `ensenada-centro`, `punta-lara` a `assets/`
- [x] 1.2 Copiar las variantes de `aerea-costa-punta-lara`, `fuerte-barragan` a `assets/`
- [x] 1.3 Copiar las variantes de `1911-fuerte-barragan` a `assets/historia/`

## 2. Markup

- [x] 2.1 Agregar `srcset`/`sizes` a los 3 `<img>` de `.place-media` en `index.html`
- [x] 2.2 Agregar `srcset`/`sizes` a los 4 `<img>` de `.brand-line` en `index.html` (incluida la reutilización de las variantes ya existentes de `cultura-publico.jpg`)
- [x] 2.3 Agregar `srcset`/`sizes` al `<img>` de `.youtube-lite-button` en `index.html`

## 3. Verificación

- [x] 3.1 Verificar en el navegador (viewports simulados 375/768/1280/1920px) que cada `<img>` carga la variante esperada
- [x] 3.2 Correr `npx --yes html-validate --config .htmlvalidate.json index.html` para confirmar que el markup sigue válido

## 4. Documentación

- [x] 4.1 Actualizar `docs/pendientes/performance.md`

## 5. Deploy

- [ ] 5.1 Commit + push a `main` (confirmar con el usuario antes)
- [ ] 5.2 Verificar en producción
- [ ] 5.3 Archivar el change y sincronizar la spec `responsive-hero-images`
