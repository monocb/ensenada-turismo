## 1. HTML

- [x] 1.1 En `index.html`, place-card `data-place="ensenada-centro"`: cambiar `<strong>Ensenada</strong>` a `<strong>Ensenada Centro</strong>` y `data-place-title="ENSENADA"` a `data-place-title="ENSENADA CENTRO"`.

## 2. CSS

- [x] 2.1 Agregar al final de `styles.css` un bloque `@media (min-width: 1021px)` (con comentario fechado) que fije: `.place-trigger { grid-template-rows: auto 1fr; }`, `.place-summary-copy { display: flex !important; flex-direction: column !important; }`, `.place-action { margin-top: auto !important; }`. No modificar las reglas base existentes de `.place-trigger`/`.place-summary-copy`/`.place-action`.

## 3. Verificación

- [x] 3.1 Servir el sitio en local (`npx serve .`) y verificar en desktop (≥1021px) que los 3 botones "VER HISTORIA" quedan a la misma altura, con "PUNTA LARA" (título de 2 líneas) incluido. Confirmado por el usuario.
- [x] 3.2 Verificar en mobile (≤1020px, ej. simulando 375px de ancho) que el layout imagen|texto de las place-cards no cambió. Confirmado por el usuario.
- [x] 3.3 Abrir el modal de la tarjeta "Ensenada Centro" (botón "Ver historia") y confirmar que el título del modal dice "ENSENADA CENTRO". Confirmado por el usuario.
- [x] 3.4 Confirmar con `grep` que no queda `>Ensenada<` (sin "Centro") ni `data-place-title="ENSENADA"` (sin "CENTRO") en `index.html`.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar la spec `place-card-content-and-alignment` a `openspec/specs/`.
- [ ] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
