## 1. CSS

- [x] 1.1 Eliminar la regla `.route-section::after` (base, ~línea 987) de `styles.css`, incluido su `background: url("assets/identidad/icono-velero.png")...`.
- [x] 1.2 Eliminar la regla `.route-section::after { opacity: 0.045; }` (override, ~línea 3070) de `styles.css`.

## 2. Assets

- [x] 2.1 Confirmar con `grep -rn "icono-velero"` sobre todo el repo que no queda ninguna referencia.
- [x] 2.2 Borrar `assets/identidad/icono-velero.png`.

## 3. Verificación

- [x] 3.1 Servir el sitio en local (`npx serve .`) y verificar visualmente que la sección `#recorrido` ya no muestra el watermark del velero. Confirmado por el usuario.
- [x] 3.2 Confirmar con `grep -n "route-section::after" styles.css` que no queda ninguna coincidencia.

## 4. OpenSpec

- [x] 4.1 Ejecutar `/opsx:sync` para aplicar la spec `recorrido-section-background` a `openspec/specs/`.
- [ ] 4.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
