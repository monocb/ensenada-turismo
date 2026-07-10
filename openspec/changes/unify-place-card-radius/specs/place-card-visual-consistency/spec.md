## ADDED Requirements

### Requirement: Las place-cards usan un radio de esquina consistente con las demás tarjetas del sitio
Las tarjetas de la sección "Tres formas de vivir Ensenada" (`.place-card`) SHALL tener esquinas redondeadas (no `border-radius: 0`), con un valor consistente con las demás tarjetas del sitio (`.fragata-hero`, `.video-panel`, `.culture-slide`).

#### Scenario: Renderizado de las place-cards
- **WHEN** se carga la página de inicio y se llega a la sección "Tres formas de vivir Ensenada"
- **THEN** las 3 place-cards (El Dique, Ensenada Centro, Punta Lara) tienen esquinas redondeadas de 18px, no esquinas filosas

#### Scenario: La imagen de portada respeta la esquina redondeada
- **WHEN** se inspecciona visualmente una place-card
- **THEN** la imagen de portada no sobresale de la esquina redondeada del contenedor
