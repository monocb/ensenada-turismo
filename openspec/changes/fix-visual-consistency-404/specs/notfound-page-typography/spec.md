## ADDED Requirements

### Requirement: 404.html carga la tipografía Inter
`404.html` SHALL incluir los mismos `<link>` de Google Fonts para Inter que ya tienen `index.html` y `en-fotos/index.html` (`preconnect` a `fonts.googleapis.com`, `preconnect` a `fonts.gstatic.com`, y la hoja de estilos de Inter en los pesos 400-900), en vez de depender del fallback del navegador.

#### Scenario: Carga de la página 404
- **WHEN** se carga `404.html` directamente (sin haber visitado antes otra página del sitio)
- **THEN** el texto renderiza en Inter, no en Arial/Helvetica de fallback

#### Scenario: Consistencia con las demás páginas
- **WHEN** se compara el `<head>` de `404.html` con el de `index.html`
- **THEN** ambos incluyen los mismos 3 tags de carga de fuente Inter
