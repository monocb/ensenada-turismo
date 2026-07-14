## ADDED Requirements

### Requirement: El heading de la sección Historia muestra "HISTORIA" en su color de marca
El `<h2>` dentro de `.heritage-copy` (sección `#historia` de `index.html`) SHALL mostrar el texto "HISTORIA" y SHALL renderizarse en color `#173f78` (`var(--brand-doc)`), `font-weight: 900`, `text-transform: uppercase`, con un `font-size` que escale entre 44px y 88px según el viewport. No SHALL existir ningún `<p class="eyebrow">` (ni el texto "ENSENADA") dentro de `.heritage-copy`. El `<h2>` SHALL tener una barra decorativa corta (`::before`) del mismo color, alineada a la izquierda, con un ancho que nunca iguale ni supere el ancho del texto "HISTORIA". El texto "Fuerte Barragán" SHALL aparecer como subtítulo (`<p class="heritage-subtitle">`) inmediatamente debajo del `<h2>`.

#### Scenario: Texto del heading de Historia
- **WHEN** se carga la home y se lee el texto del `<h2>` dentro de `.heritage-copy`
- **THEN** el texto es "HISTORIA"

#### Scenario: Color del heading de Historia
- **WHEN** se inspecciona el color computado del `<h2>` dentro de `.heritage-copy`
- **THEN** el color es `#173f78`

#### Scenario: No queda ningún eyebrow en Historia
- **WHEN** se inspecciona `.heritage-copy` dentro de la sección `#historia`
- **THEN** no existe ningún elemento `<p class="eyebrow">` ni el texto "ENSENADA"

#### Scenario: Barra decorativa alineada a la izquierda
- **WHEN** se inspecciona el `::before` del `<h2>` dentro de `.heritage-copy`
- **THEN** es un bloque del mismo color que el título, alineado a la izquierda (no centrado), con un ancho notablemente menor al ancho renderizado de "HISTORIA"

#### Scenario: "Fuerte Barragán" como subtítulo
- **WHEN** se carga la home y se lee el texto del `<p class="heritage-subtitle">` dentro de `.heritage-copy`
- **THEN** el texto es "Fuerte Barragán" y aparece entre el `<h2>` y el párrafo de descripción

#### Scenario: La sección conserva un heading semántico
- **WHEN** se inspecciona la estructura de encabezados de la sección `#historia`
- **THEN** existe un `<h2>` visible con texto no vacío (no se eliminó el heading sin reemplazo)
