## 1. HTML

- [x] 1.1 En `index.html`, reemplazar el texto de los 4 `<span>` dentro de `<h2 id="brand-system-title">` (sección `#marca`) por "TU" / "LUGAR" / "PARA" / "DISFRUTAR", en ese orden, sin tocar atributos ni estructura.
- [x] 1.2 En `index.html`, reemplazar el texto de `<p class="identity-stamp">` (misma sección) por "Cada rincón invita a bajar el ritmo, conectar con la naturaleza y vivir Ensenada."

## 2. Verificación

- [x] 2.1 Servir el sitio en local (`npx serve .`) y verificar visualmente la sección `#marca` en `index.html`: título en 4 líneas con "DISFRUTAR" como remate grande, bajada con el texto nuevo, sin desbordes ni saltos de línea raros. Confirmado por el usuario.
- [x] 2.2 Confirmar con `grep` que no quedan restos del copy anterior ("Mirar", "registrar", "y contar" como título de esta sección, "Una marca para mostrar la ciudad desde adentro.") en `index.html`.

## 3. OpenSpec

- [x] 3.1 Ejecutar `/opsx:sync` para aplicar la spec `brand-system-copy` a `openspec/specs/`.
- [ ] 3.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
