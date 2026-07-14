## MODIFIED Requirements

### Requirement: Los contenedores con aria-label tienen un rol que lo soporta
Todo `<div aria-label="...">` SHALL tener un `role` (ej. `group`) que garantice que el nombre accesible se exponga de forma confiable a tecnología asistiva.

#### Scenario: Un lector de pantalla anuncia el panel de video de Historia
- **WHEN** un usuario de lector de pantalla navega hasta `.video-panel` (sección Historia, `#historia`)
- **THEN** el lector anuncia su `aria-label` ("Video sobre el Fuerte Barragán") porque el elemento tiene `role="group"`
