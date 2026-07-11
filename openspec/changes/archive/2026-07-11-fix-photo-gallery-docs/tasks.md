## 1. Limpieza de datos

- [x] 1.1 Eliminar `assets/en-fotos/manifest.json`

## 2. Documentación

- [x] 2.1 Renombrar `docs/tecnico/patron-galerias-manifest.md` → `docs/tecnico/patron-galerias-data-attributes.md` y reescribir su contenido con el mecanismo real (`data-photo-*` + numeración secuencial)
- [x] 2.2 Corregir `CLAUDE.md` ("Cómo agregar una foto a una galería") con el mecanismo y nombre de archivo correctos
- [x] 2.3 Corregir `docs/tecnico/README.md` (índice) con el nuevo nombre de archivo
- [x] 2.4 Corregir la referencia cruzada en `docs/marca/fotografia-y-composicion.md`

## 3. Verificación

- [x] 3.1 Confirmar con grep que no queda ninguna referencia a `manifest.json` como mecanismo activo (fuera de graphify-out y del historial de openspec archivado)
- [x] 3.2 Confirmar que las 3 galerías de `en-fotos/index.html` siguen renderizando correctamente en el navegador tras el borrado (no deberían verse afectadas, pero se verifica igual)

## 4. Deploy

- [x] 4.1 Commit + push a `main` (confirmar con el usuario antes)
- [ ] 4.2 Archivar el change y sincronizar la spec `technical-docs-accuracy`
