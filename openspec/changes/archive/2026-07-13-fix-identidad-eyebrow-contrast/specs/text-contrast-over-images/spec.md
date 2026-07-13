## ADDED Requirements

### Requirement: El eyebrow "Identidad" cumple contraste WCAG AA
El texto de `.route-copy .eyebrow` ("ENSENADA IDENTIDAD") SHALL tener un contraste de al menos 4.5:1 contra el fondo real de `.route-section`, medido con muestreo de píxeles reales, no estimado contra blanco puro.

#### Scenario: Medición de contraste del eyebrow Identidad
- **WHEN** se mide el contraste del texto de `.route-copy .eyebrow` contra el fondo compuesto de `.route-section` (overlay casi opaco sobre la foto fija)
- **THEN** el resultado es igual o mayor a 4.5:1
