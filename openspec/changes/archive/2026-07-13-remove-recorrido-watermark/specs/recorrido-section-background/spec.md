## ADDED Requirements

### Requirement: La sección #recorrido no muestra ningún watermark decorativo de fondo
La sección `.route-section` (`#recorrido` de `index.html`) SHALL NOT renderizar ningún ícono o imagen decorativa de fondo vía pseudo-elemento (`::before`/`::after`).

#### Scenario: Sin watermark de velero
- **WHEN** se inspecciona el CSS computado de `.route-section::after`
- **THEN** no tiene `background-image` ni contenido visible (la regla no existe o no aplica ningún ícono)
