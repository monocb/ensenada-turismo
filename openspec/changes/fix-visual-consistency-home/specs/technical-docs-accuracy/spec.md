## ADDED Requirements

### Requirement: DESIGN.md describe con precisión el estado resuelto del radio de las place-cards
`DESIGN.md` SHALL describir el radio de 18px de las place-cards (`.place-card`) como una decisión de marca ya resuelta (change archivado `2026-07-10-unify-place-card-radius`), documentada como el radio nombrado de "card" compartido con `.fragata-hero`, `.video-panel` y `.culture-slide` — no como una deriva no intencional pendiente de unificar.

#### Scenario: Un colaborador lee DESIGN.md sobre el radio de las place-cards
- **WHEN** un colaborador lee la sección "Cards / Containers" de `DESIGN.md`
- **THEN** encuentra que el radio de 18px es la decisión vigente y documentada, no una nota de "candidato a unificar en una futura pasada"

#### Scenario: Un colaborador busca los radios nombrados del sistema
- **WHEN** un colaborador lee la sección de tokens de `DESIGN.md` (`rounded.*`)
- **THEN** encuentra un token de "card" (18px) además de `control` (10px), `pill` (999px) y `flat` (0px)
