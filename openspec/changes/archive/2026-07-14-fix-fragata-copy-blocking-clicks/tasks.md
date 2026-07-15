## 1. CSS — dejar pasar los clicks a través del panel de texto

- [x] 1.1 En `styles.css`, agregar `pointer-events: none;` a `.fragata-hero-copy`.
- [x] 1.2 En `styles.css`, agregar `pointer-events: auto;` a `.fragata-cta` (para que siga siendo clickeable pese a heredar `pointer-events:none` de su contenedor padre).

## 2. Verificación

- [x] 2.1 Balance de llaves en `styles.css`.
- [x] 2.2 Servir el sitio en local y confirmar que el CSS nuevo se sirve correctamente.
- [ ] 2.3 Confirmación del cliente en su celular una vez deployado: tocar cualquier punto de una foto de Fragata (no solo el borde izquierdo) abre el lightbox, y el link de crédito sigue funcionando.

## 3. OpenSpec

- [x] 3.1 Ejecutar `/opsx:sync` para aplicar el MODIFIED de `fragata-background-gallery` a `openspec/specs/`.
- [x] 3.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
