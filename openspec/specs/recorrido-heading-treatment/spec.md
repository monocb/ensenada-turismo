## Purpose

TBD - created by syncing change restyle-recorrido-identidad-heading. Update Purpose after archive.

## Requirements

### Requirement: El heading de la sección #recorrido muestra "IDENTIDAD" con el tratamiento visual del eyebrow
El `<h2>` dentro de `.route-copy` (sección `#recorrido` de `index.html`) SHALL mostrar el texto "IDENTIDAD" y SHALL renderizarse en color `#b8440b`, `font-weight: 900`, `text-transform: uppercase`, con un `font-size` que escale entre 44px y 88px según el viewport. No SHALL existir ningún `<p class="eyebrow">` (ni el texto "ENSENADA") dentro de `.route-copy`. El `<h2>` SHALL tener una barra decorativa corta (`::before`) del mismo color `#b8440b`, centrada horizontalmente sobre la palabra, con un ancho que nunca iguale ni supere el ancho del texto "IDENTIDAD".

#### Scenario: Texto del heading de #recorrido
- **WHEN** se carga la home y se lee el texto del `<h2>` dentro de `.route-copy`
- **THEN** el texto es "IDENTIDAD"

#### Scenario: Color del heading de #recorrido
- **WHEN** se inspecciona el color computado del `<h2>` dentro de `.route-copy`
- **THEN** el color es `#b8440b`

#### Scenario: No queda ningún eyebrow en #recorrido
- **WHEN** se inspecciona `.route-copy` dentro de la sección `#recorrido`
- **THEN** no existe ningún elemento `<p class="eyebrow">` ni el texto "ENSENADA"

#### Scenario: Barra corta centrada arriba de "IDENTIDAD"
- **WHEN** se inspecciona el `::before` del `<h2>` dentro de `.route-copy`
- **THEN** es un bloque de color `#b8440b`, centrado horizontalmente, con un ancho notablemente menor al ancho renderizado de "IDENTIDAD" (no un subrayado de ancho completo)

#### Scenario: La sección conserva un heading semántico
- **WHEN** se inspecciona la estructura de encabezados de la sección `#recorrido`
- **THEN** existe un `<h2>` visible con texto no vacío (no se eliminó el heading sin reemplazo)
