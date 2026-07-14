## Purpose

TBD - created by syncing change fix-place-card-copy-and-alignment. Update Purpose after archive.

## Requirements

### Requirement: La tarjeta de Ensenada Centro muestra su nombre completo
La place-card `data-place="ensenada-centro"` dentro de `#recorrido` SHALL mostrar el texto "Ensenada Centro" (visible como "ENSENADA CENTRO" por el `text-transform: uppercase` existente), tanto en el `<strong>` visible como en el atributo `data-place-title`.

#### Scenario: Texto visible de la tarjeta
- **WHEN** se carga la home y se lee el texto del `<strong>` dentro de la place-card `data-place="ensenada-centro"`
- **THEN** el texto es "Ensenada Centro"

#### Scenario: Título del modal coincide con la tarjeta
- **WHEN** un usuario abre el modal de esa place-card (botón "Ver historia")
- **THEN** el título del modal muestra "ENSENADA CENTRO", igual que la tarjeta, no "ENSENADA"

### Requirement: Los botones de acción de las place-cards quedan alineados en desktop
En un viewport de escritorio (`min-width: 1021px`, donde `.place-accordion` es un grid de 3 columnas), los 3 botones `.place-action` ("Ver historia") de las place-cards de una misma fila SHALL quedar a la misma altura vertical, sin importar cuántas líneas ocupe el título de cada tarjeta.

#### Scenario: Alineación con título de una línea vs. dos líneas
- **WHEN** se carga la home en un viewport ≥1021px y una tarjeta de la fila tiene un título de una sola línea (ej. "El Dique") mientras otra tiene un título de dos líneas (ej. "Punta Lara")
- **THEN** los botones `.place-action` de ambas tarjetas están a la misma distancia del borde inferior de su tarjeta

#### Scenario: Layout mobile no afectado
- **WHEN** se carga la home en un viewport ≤1020px
- **THEN** el layout de la place-card (imagen a la izquierda, texto a la derecha) se mantiene sin cambios respecto al comportamiento previo
