## Purpose

TBD - created by syncing change complete-social-meta-tags. Update Purpose after archive.

## Requirements

### Requirement: Todas las páginas tienen Twitter Card completo
Cada página del sitio (`index.html`, `en-fotos/index.html`) SHALL incluir las meta tags `twitter:card`, `twitter:title`, `twitter:description` y `twitter:image`.

#### Scenario: Compartir el link de En Fotos en Twitter/X
- **WHEN** se inspecciona el `<head>` de `en-fotos/index.html`
- **THEN** están presentes `twitter:card`, `twitter:title`, `twitter:description` y `twitter:image`

### Requirement: Las páginas declaran las propiedades Open Graph recomendadas
Cada página SHALL incluir `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale` y `og:site_name`.

#### Scenario: Un scraper de red social lee la metadata
- **WHEN** se inspecciona el `<head>` de cualquiera de las dos páginas
- **THEN** están presentes `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale` y `og:site_name`, con valores que corresponden a la imagen y el sitio reales
