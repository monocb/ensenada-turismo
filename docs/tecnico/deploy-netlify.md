# Deploy en Netlify

## Datos del sitio

- Proyecto Netlify: `ensenadaturismo`
- Dominio principal: `https://ensenadaturismo.com`
- Admin: `https://app.netlify.com/projects/ensenadaturismo`
- Forms: no habilitado. Functions / Edge Functions: ninguna. Variables de entorno: ninguna.

## Estado antes de esta migración

El deploy era manual tipo **drop** (arrastrar y soltar un zip/carpeta en el dashboard de Netlify), sin repositorio Git asociado y sin `source_zip` disponible — es decir, no había forma de reconstruir el código publicado si se perdía la copia local. Esta migración a Git resuelve ese riesgo.

## Configuración de build

- `netlify.toml`: solo `[build] publish = "."` (sitio estático, sin build step).
- `_redirects`: única fuente de verdad para las reglas de redirect (`/en-fotos → /en-fotos/`, `/inicio → /index.html`). No agregar reglas de redirect en `netlify.toml` para evitar que Netlify las combine con las de `_redirects` de forma poco predecible.

## Reconectar Netlify al repo de Git (checklist)

1. Antes de conectar, comparar el HTML servido en vivo (`curl https://ensenadaturismo.com`) contra el `index.html` de este repo, por si un deploy manual posterior a esta migración introdujo un cambio que todavía no está versionado.
2. En Netlify: **Site settings → Build & deploy → Link repository** → elegir el repo `ensenada-turismo` en GitHub.
3. Publish directory: `.`
4. Build command: dejar vacío (sitio estático, sin build).
5. Deploy branch: `main`.
6. Verificar tras el primer deploy conectado: dominio activo, certificado SSL, redirects funcionando, un push a `main` dispara un nuevo deploy automáticamente.
