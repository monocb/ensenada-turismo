# Historial de migración

Este repositorio se creó en julio de 2026 a partir del sitio real publicado en `ensenadaturismo.com` (deploy manual/drop en Netlify, sin Git hasta ese momento). El código y los assets llegaron por Google Drive.

## Sobre la carpeta `EXPORTACION_PROYECTO` (no incluida en este repo)

Antes de esta migración existió un intento previo, generado por una sesión de ChatGPT que **no tenía acceso al código ni a los assets reales** del sitio (solo al deploy público de Netlify). Ese intento produjo una reconstrucción de relleno — HTML/CSS/JS placeholder, no el código real — junto con documentación de contexto de negocio bastante completa, generada a partir del sitio público y la conversación con el cliente.

Esta migración reemplaza esa reconstrucción por el código real (recuperado directamente, sin intermediarios) y **destila la documentación útil de aquel intento** hacia la estructura atómica de `docs/` de este repo (`docs/proyecto/`, `docs/pendientes/`), en vez de copiarla textual. El código placeholder de esa carpeta nunca se incorporó a este repo, para no reintroducir confusión entre "cuál es el código real".

Si se necesita consultar el material original de aquel intento, no forma parte de este repositorio — quedó en el entorno de trabajo del desarrollador que hizo esta migración.
