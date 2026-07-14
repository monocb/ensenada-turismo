## Purpose

TBD - created by syncing change update-brand-heading-copy. Update Purpose after archive.

## Requirements

### Requirement: El título y la bajada de la sección de marca muestran el copy vigente
El `<h2 id="brand-system-title">` de la sección `#marca` SHALL mostrar, en sus 4 `<span>` apilados, el texto "TU" / "LUGAR" / "PARA" / "DISFRUTAR" (en ese orden), y el `<p class="identity-stamp">` de esa misma sección SHALL mostrar el texto "Cada rincón invita a bajar el ritmo, conectar con la naturaleza y vivir Ensenada."

#### Scenario: Título de la sección de marca
- **WHEN** se carga la home y se concatena el texto de los 4 `<span>` dentro de `#brand-system-title`
- **THEN** el resultado es "TU LUGAR PARA DISFRUTAR"

#### Scenario: Bajada de la sección de marca
- **WHEN** se carga la home y se lee el texto de `.identity-stamp` dentro de `#marca`
- **THEN** el texto es "Cada rincón invita a bajar el ritmo, conectar con la naturaleza y vivir Ensenada."
