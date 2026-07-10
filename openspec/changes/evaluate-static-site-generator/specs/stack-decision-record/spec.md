## ADDED Requirements

### Requirement: El proyecto tiene una recomendación documentada sobre generadores estáticos
`docs/tecnico/` SHALL contener un documento que compare explícitamente Astro, Eleventy y mantener el stack actual, con una recomendación explícita (no ambigua) y la fecha de la investigación.

#### Scenario: Alguien evalúa si migrar el stack
- **WHEN** un colaborador busca contexto sobre si conviene adoptar un generador estático
- **THEN** encuentra `docs/tecnico/evaluacion-generador-estatico.md` con una recomendación concreta (qué herramienta, y qué NO hacer todavía)

### Requirement: La recomendación define condiciones concretas de activación
El documento SHALL listar condiciones concretas y verificables (no subjetivas) bajo las cuales corresponde iniciar la migración, en vez de dejarlo a criterio ambiguo.

#### Scenario: Se evalúa si es momento de migrar
- **WHEN** se arranca formalmente "páginas por lugar" o el "sistema de datos de concursos" documentados en `docs/proyecto/funcionalidades-futuras.md`
- **THEN** el documento indica que ese es el punto para iniciar un `/opsx:propose` de migración, y no antes

### Requirement: El documento está enlazado desde el índice técnico
`docs/tecnico/README.md` SHALL enlazar el nuevo documento de evaluación, siguiendo la convención existente de índice por caso de uso.

#### Scenario: Alguien navega la documentación técnica
- **WHEN** un colaborador abre `docs/tecnico/README.md`
- **THEN** ve una entrada en la tabla que enlaza a `evaluacion-generador-estatico.md`
