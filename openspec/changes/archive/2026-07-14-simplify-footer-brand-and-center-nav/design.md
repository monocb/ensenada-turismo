## Context

`.footer-brand` (idéntico en `index.html`, `en-fotos/index.html`, `404.html`) tenía `<strong>ENSENADA</strong>`, un `<p>` de bajada, y `<p class="footer-credit">Administrado por NexaContenidos.</p>`. Al lado, `.footer-column` tenía el heading "GUÍA DE LA PÁGINA" y un nav `.footer-links` con 7 links a las secciones del sitio.

Se intentó primero centrar `.footer-links` (con `justify-content:center` y después con `width:fit-content; margin:0 auto; transform`), verificado dos veces por `curl` sin caché que el CSS servido era el correcto, pero el cliente reportó que visualmente no cambiaba nada en ninguno de los dos intentos. En vez de seguir iterando sobre la alineación, el cliente decidió eliminar la columna completa — la navegación a esas secciones ya existe en el menú principal del header, así que no se pierde ningún acceso.

## Goals / Non-Goals

**Goals:**
- El footer de las 3 páginas queda reducido a un solo texto: "Administrado por NexaContenidos."
- Sin código HTML/CSS huérfano tras sacar la columna de navegación.

**Non-Goals:**
- No se toca el menú principal del header — sigue teniendo todos los links (Inicio, En Fotos, Descubrí, Historia, Fragata, Redes, Contacto).
- No se investiga más la causa de por qué el centrado no se veía — quedó sin resolver porque el cliente prefirió sacar la columna en vez de seguir ajustándolo.

## Decisions

- **`.site-footer` pasa a `display:block` en vez de mantener un grid de 1 columna.** Con un solo hijo (`.footer-brand`), un grid de una columna no aporta nada sobre un bloque simple — más simple de leer y mantener.
- **Se elimina todo el CSS de `.footer-heading`/`.footer-links` (incluidas sus variantes en media queries), no se deja comentado ni oculto.** Sin ningún elemento en el HTML de las 3 páginas que use esas clases, es código muerto — sigue la convención del proyecto de no dejar CSS sin uso.

## Risks / Trade-offs

- [Riesgo: el footer pierde toda navegación secundaria — un usuario que llega al final de la página sin haber visto el menú (ej. entrando por Google a una sección específica) ya no tiene links de vuelta al resto del sitio desde el footer] → Aceptado explícitamente por el cliente; el menú principal del header sigue siendo accesible en todo momento (`position:fixed`), así que la navegación no desaparece del todo, solo se retira la redundancia en el footer.

## Migration Plan

Cambio de contenido/estructura sin estado ni datos — se aplica en una sola pasada de edición (3 páginas + CSS) y se despliega vía el flujo normal de Netlify.
