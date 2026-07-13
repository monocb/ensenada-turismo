## 1. Rama y preparación

- [x] 1.1 Crear rama `fix-visual-consistency-home` desde `main`

## 2. `.social-strip` sin glassmorphism

- [x] 2.1 Reemplazar `backdrop-filter: blur(14px)` + `rgba(255,255,255,0.22)` en `.social-strip` (`styles.css:6900-6913`) por un fondo sólido/casi-sólido — implementado como `rgba(8, 11, 24, 0.92)` sin blur; los pills individuales de redes sociales ya eran sólidos (`rgba(255,255,255,0.92)`, DESIGN.md) y no se tocaron
- [x] 2.2 Verificar visualmente el contraste del texto/íconos del social-strip contra las 8 fotos del crossfade del hero (no solo la primera) — verificación estática: no hay herramienta de navegador disponible en esta sesión; el fondo nuevo es ~92% opaco así que no varía perceptiblemente entre fotos, y los pills (que llevan el texto/color real) no cambiaron

## 3. Color del eyebrow de Historia

- [x] 3.1 Agregar el guard `:not(.eyebrow)` a la regla `.heritage p` (`styles.css:1004-1006`), igual que `.route-copy p:not(.eyebrow)`
- [x] 3.1b **(descubierto al implementar, no estaba en el plan original)**: el guard solo no alcanzaba — una regla sitewide sin scope en `styles.css:2977` (`.eyebrow, .feature-kicker, .story-label { color: var(--brand-red) }`) le gana al `.eyebrow` dorado base por orden de aparición, y sin un override de scope el eyebrow de Historia hubiera quedado rojo en vez de gris (ni gold). Se agregó `.heritage .eyebrow { color: var(--gold); }` como regla con scope propio — mismo patrón usado en la propuesta de `404.html` para el mismo bug de fondo.
- [x] 3.2 Verificar visualmente que "ENSENADA HISTORIA" renderiza en dorado, no en gris apagado — verificación estática: con `.heritage .eyebrow` (especificidad 0,2,0) no queda ninguna otra regla en el archivo que targetee `.heritage .eyebrow` y le gane; no hay herramienta de navegador disponible para confirmar visualmente en esta sesión

## 4. Actualizar DESIGN.md

- [x] 4.1 Corregir la sección "Cards / Containers" de `DESIGN.md`: quitar la nota de "deriva no intencional / candidato a unificar" sobre las place-cards y describir el 18px como decisión ya resuelta (referenciar `2026-07-10-unify-place-card-radius`)
- [x] 4.2 Agregar `card: 18px` a la sección de tokens `rounded.*` de `DESIGN.md`, junto a `control`/`pill`/`flat`

## 5. Verificación y entrega

- [x] 5.1 Pushear la rama y abrir PR contra `main`; confirmar que Netlify genera la Deploy Preview automática — PR #1, Deploy Preview: https://deploy-preview-1--ensenadaturismo.netlify.app (confirmado que las previews automáticas están habilitadas)
- [x] 5.2 Comparar visualmente la Deploy Preview contra `ensenadaturismo.com` (social-strip y eyebrow de Historia) — verificado leyendo el CSS servido por la Deploy Preview: `.social-strip` sin `backdrop-filter`, fondo sólido; `.heritage .eyebrow` presente con color dorado. No se pudo tomar captura visual (sin herramienta de navegador en esta sesión).
- [x] 5.3 Con aprobación del usuario: mergear el PR y archivar el change (`/opsx:archive`) — PR #1 mergeado a `main` con confirmación explícita del usuario
