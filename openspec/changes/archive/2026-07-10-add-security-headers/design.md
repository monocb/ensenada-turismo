## Context

El sitio es estático (HTML/CSS/JS plano, sin build) y se despliega en Netlify con `netlify.toml` mínimo (`[build] publish = "."`, sin `[[headers]]`). No hay ninguna cabecera de seguridad HTTP configurada hoy. El sitio carga dos orígenes de terceros:
- Google Fonts (`fonts.googleapis.com` para el CSS, `fonts.gstatic.com` para los archivos de fuente) — referenciado en `<link>` tags en `index.html` y `en-fotos/index.html`.
- Un iframe de YouTube embed, inyectado dinámicamente por `script.js` al hacer clic en la sección de Punta Lara (`src="https://www.youtube.com/embed/..."`).

No hay formularios, no hay analytics, no hay otros scripts de terceros. No hay backend ni funciones serverless.

## Goals / Non-Goals

**Goals:**
- Aplicar cabeceras de seguridad HTTP estándar (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS) a todas las rutas del sitio.
- Que la CSP permita explícitamente los dos orígenes de terceros ya en uso (Google Fonts, YouTube embed) sin romper su funcionamiento.
- Mantener el sitio 100% estático — sin agregar build, dependencias ni `package.json`.

**Non-Goals:**
- No se agregan nuevas integraciones de terceros ni se cambia funcionalidad existente.
- No se resuelve aquí la seguridad de futuros formularios de concursos (eso es un cambio aparte cuando se construya esa feature).
- No se migra `netlify.toml` a usar `[[headers]]` — se usa el archivo `_headers`, más simple y sin tocar el build config existente.

## Decisions

**Usar `_headers` en la raíz en vez de `[[headers]]` en `netlify.toml`.**
Netlify soporta ambas formas. `_headers` es un archivo de texto plano, no requiere tocar `netlify.toml` (que hoy está deliberadamente minimalista), y es el mecanismo documentado por Netlify específicamente para sitios estáticos sin build. Alternativa considerada: `[[headers]]` en `netlify.toml` — descartada porque mezclaría configuración de build con cabeceras, sin ninguna ventaja para este caso.

**CSP en modo "allowlist explícita" en vez de `unsafe-inline`/`*` amplios.**
Se listan orígenes concretos (`fonts.googleapis.com`, `fonts.gstatic.com`, `www.youtube.com`, `www.youtube-nocookie.com`) en vez de usar wildcards. Esto es más seguro y fuerza a que cualquier futura integración de terceros pase explícitamente por esta lista, lo cual es la intención (ver Riesgos).

**`script-src 'self'` sin `unsafe-inline`.**
`script.js` es el único script del sitio y se carga como archivo externo (`<script src="script.js">`), no hay `<script>` inline con lógica (el único bloque inline es JSON-LD `application/ld+json`, que no es JavaScript ejecutable y no lo bloquea `script-src`). Esto permite una CSP estricta sin necesitar `'unsafe-inline'`.

**`frame-src` limitado a YouTube, `frame-ancestors 'none'`.**
El sitio nunca debe ser embebido en un iframe ajeno (protección anti-clickjacking), pero sí necesita poder embeber el iframe de YouTube que él mismo inyecta.

**HSTS con `max-age` conservador (6 meses) sin `preload` en esta primera iteración.**
`preload` es difícil de revertir (una vez en la lista de precarga de navegadores, sacar el dominio toma meses). Se agrega HSTS básico ahora y se puede escalar a `preload` en un cambio futuro una vez confirmado que todo el tráfico funciona bien sobre HTTPS.

## Risks / Trade-offs

- **[Riesgo] Una CSP mal configurada bloquea Google Fonts o el embed de YouTube silenciosamente (sin error visible para un usuario común, solo en la consola del navegador).** → Mitigación: verificar manualmente en el sitio desplegado (preview de Netlify) que las fuentes carguen y que el video de YouTube se reproduzca, revisando la consola del navegador por errores de CSP antes de mergear a producción.
- **[Riesgo] Cualquier integración de terceros futura (analytics, formulario de concursos, etc.) va a requerir editar la CSP explícitamente o se bloqueará.** → Mitigación aceptada como trade-off intencional: es el comportamiento deseado de una CSP allowlist-based; se documenta en el spec para que quede claro que agregar un nuevo origen externo implica tocar `_headers`.
- **[Riesgo] HSTS es difícil de revertir una vez que los navegadores lo cachean (aunque sin `preload` es reversible dejando que expire el `max-age`).** → Mitigación: usar `max-age` de 6 meses (no 1-2 años) en esta primera iteración, sin `preload`.

## Migration Plan

1. Crear `_headers` en la raíz del repo con las cabeceras definidas en el spec.
2. Verificar en un deploy preview de Netlify (o `netlify dev` local) que Google Fonts y el embed de YouTube sigan funcionando, revisando la consola por violaciones de CSP.
3. Mergear a `main` → Netlify aplica `_headers` automáticamente en el siguiente deploy, sin pasos adicionales.
4. Rollback: si algo se rompe en producción, revertir el commit que agrega `_headers` (borrar el archivo) — Netlify vuelve a servir sin cabeceras custom en el siguiente deploy. No hay estado persistente ni migración de datos involucrada.

## Open Questions

Ninguna abierta — el alcance es acotado y los orígenes a permitir ya están identificados a partir del código actual (`script.js`, `index.html`, `en-fotos/index.html`).
