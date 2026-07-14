## Why

El cliente pidió actualizar el copy de la sección de marca (`#marca`, "Mirar, registrar y contar Ensenada") en el home: quiere un título más orientado a la acción del visitante ("TU LUGAR PARA DISFRUTAR") y una bajada que hable de la experiencia en el lugar en vez de describir la marca en sí.

## What Changes

- El `<h2 id="brand-system-title">` de la sección `#marca` pasa de las 4 líneas apiladas "Mirar," / "registrar" / "y contar" / "Ensenada" a 4 líneas apiladas "TU" / "LUGAR" / "PARA" / "DISFRUTAR", conservando la misma estructura de 4 `<span>` (la última línea sigue siendo el remate visual grande, por el CSS existente `.brand-system-copy h2 span:last-child`).
- El párrafo `<p class="identity-stamp">` pasa de "Una marca para mostrar la ciudad desde adentro." a "Cada rincón invita a bajar el ritmo, conectar con la naturaleza y vivir Ensenada."
- Cambio de solo texto en `index.html` — no se toca `styles.css`, `script.js` ni ningún asset.

## Capabilities

### New Capabilities
- `brand-system-copy`: el título y la bajada de la sección de marca (`#marca`) muestran el texto vigente definido por el cliente.

### Modified Capabilities
(ninguna)

## Impact

- `index.html`: texto del `<h2 id="brand-system-title">` y del `<p class="identity-stamp">` dentro de la sección `#marca`.
