## ADDED Requirements

### Requirement: Todos los eyebrows del home renderizan en el color dorado de marca
Los elementos `.eyebrow` dentro de `.heritage` (sección Historia de `index.html`) SHALL renderizar en el color dorado de marca (`var(--gold)`/`var(--brand-yellow)`) igual que los demás eyebrows del sitio, sin que reglas CSS más específicas para el texto de párrafo circundante les sobrescriban el color.

#### Scenario: Eyebrow de la sección Historia
- **WHEN** se carga `index.html` y se llega a la sección Historia
- **THEN** el texto "ENSENADA HISTORIA" se ve en el color dorado de marca, no en el gris apagado de `--text-muted`

#### Scenario: Reglas de párrafo con guard consistente
- **WHEN** se inspecciona la regla CSS que colorea los párrafos de `.heritage` (`--text-muted`)
- **THEN** esa regla excluye explícitamente `.eyebrow` (`.heritage p:not(.eyebrow)`), igual que su regla hermana `.route-copy p:not(.eyebrow)`
