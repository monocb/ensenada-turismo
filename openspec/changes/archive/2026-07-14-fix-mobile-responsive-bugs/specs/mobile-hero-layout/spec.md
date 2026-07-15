## MODIFIED Requirements

### Requirement: El menú mobile es funcional, usa un ícono de tres líneas, y se transforma en X al abrirse
El botón de menú mobile SHALL mostrarse como un ícono estándar de tres líneas (no seis) en reposo, y SHALL alternar `aria-expanded` entre `"false"` y `"true"` al hacer clic, mostrando la navegación. Cuando el menú está abierto (`.site-header.is-open`), el ícono SHALL transformarse visualmente en una X (no seguir mostrando las mismas tres líneas sin cambios).

#### Scenario: Abrir el menú mobile
- **WHEN** un usuario hace clic en el botón `[data-menu-button]` con `aria-expanded="false"`
- **THEN** el atributo cambia a `aria-expanded="true"` y la navegación `[data-menu]` se vuelve visible

#### Scenario: El ícono se transforma en X al abrir
- **WHEN** el menú mobile pasa a estar abierto (`.site-header.is-open`)
- **THEN** el ícono del botón se ve como una X (líneas rotadas formando una cruz), no como las mismas tres líneas horizontales del estado cerrado
