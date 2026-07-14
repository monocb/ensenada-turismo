## Purpose

TBD - created by syncing change fix-visual-consistency-home. Update Purpose after archive.

## Requirements

### Requirement: El eyebrow de la página 404 renderiza en el color dorado de marca
El elemento `.eyebrow` de `404.html` ("ENSENADA") SHALL renderizar en el color dorado de marca (`var(--gold)`), no en el rojo de alerta reservado para la línea "En Vivo", con una regla de scope propio que no dependa del orden de otras reglas sitewide sobre `.eyebrow`.

#### Scenario: Color del eyebrow en la página 404
- **WHEN** se carga `404.html`
- **THEN** el texto "ENSENADA" se ve en dorado, no en rojo

#### Scenario: Independencia de reglas sitewide
- **WHEN** una regla sitewide sin scope (ej. `.eyebrow, .feature-kicker, .story-label`) cambia de color en el futuro
- **THEN** el eyebrow de `404.html` no se ve afectado, porque tiene su propia regla con scope (`.not-found .eyebrow`)
