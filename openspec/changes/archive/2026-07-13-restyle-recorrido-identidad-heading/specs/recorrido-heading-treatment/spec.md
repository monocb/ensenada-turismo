## ADDED Requirements

### Requirement: El heading de la sección #recorrido muestra "IDENTIDAD" con el tratamiento visual del eyebrow
El `<h2>` dentro de `.route-copy` (sección `#recorrido` de `index.html`) SHALL mostrar el texto "IDENTIDAD" y SHALL renderizarse en color `#b8440b`, `font-weight: 900`, `text-transform: uppercase`, con un `font-size` que escale entre 44px y 88px según el viewport. El `<p class="eyebrow">` que lo precede SHALL mostrar únicamente el texto "ENSENADA".

#### Scenario: Texto del heading de #recorrido
- **WHEN** se carga la home y se lee el texto del `<h2>` dentro de `.route-copy`
- **THEN** el texto es "IDENTIDAD"

#### Scenario: Color del heading de #recorrido
- **WHEN** se inspecciona el color computado del `<h2>` dentro de `.route-copy`
- **THEN** el color es `#b8440b`, el mismo que usa `.route-copy .eyebrow`

#### Scenario: Texto del eyebrow de #recorrido
- **WHEN** se carga la home y se lee el texto del `<p class="eyebrow">` dentro de `.route-copy`
- **THEN** el texto es "ENSENADA" (sin "IDENTIDAD")

#### Scenario: La sección conserva un heading semántico
- **WHEN** se inspecciona la estructura de encabezados de la sección `#recorrido`
- **THEN** existe un `<h2>` visible con texto no vacío (no se eliminó el heading sin reemplazo)
