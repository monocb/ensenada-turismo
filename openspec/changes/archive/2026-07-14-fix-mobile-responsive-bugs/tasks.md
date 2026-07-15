## 1. Fragata — corregir corte de texto en mobile

- [x] 1.1 En `styles.css`, dentro de `@media (max-width: 560px)`, eliminar `left: 20px; right: 20px;` de `.fragata-hero-copy` (re-grep antes de editar, confirmar línea exacta).

## 2. Hero `<h1>` — limpiar CSS muerto y sacar el nowrap forzado

- [x] 2.1 Eliminar los 5 bloques de media query muertos para `.hero h1` (≤390px, ≤430px ×2, ≤370px) — re-grep cada uno antes de borrar, confirmando que efectivamente no son la regla ganadora.
- [x] 2.2 En la regla ganadora (`@media (max-width: 760px)`, la que fuerza `white-space: nowrap !important` junto con `max-width`/`font-size`), sacar `white-space: nowrap !important` sin tocar `font-size` ni `max-width`.

## 3. `.timeline-stage` — altura proporcional en mobile

- [x] 3.1 En `styles.css`, dentro de `@media (max-width: 560px)`, cambiar `.timeline-stage { height: 600px; }` a `height: clamp(240px, 64vw, 380px);`.

## 4. Ícono del menú hamburguesa — transformar en X al abrir

- [x] 4.1 En `.site-header.is-open .nav-toggle::before`, rotar la línea central 45° y sacar el `box-shadow` (las líneas de arriba/abajo).
- [x] 4.2 Reactivar `.site-header.is-open .nav-toggle::after` (hoy `content:none !important` en la regla base `.nav-toggle::after`) como segunda barra, rotada -45°, superpuesta al centro — formando la X junto con `::before`. También se agregó `position:absolute; inset:0; margin:auto;` a `::before` para que ambas barras se centren de forma consistente sin depender del modo grid/flex del botón.

## 5. Verificación

- [x] 5.1 Balance de llaves en `styles.css` tras cada edición.
- [x] 5.2 Servir el sitio en local (`npx serve .`) y confirmar por `curl` que los 4 cambios están en el CSS servido.
- [ ] 5.3 Confirmación visual del usuario (con capturas de su celular, como en el reporte original).

## 6. OpenSpec

- [x] 6.1 Ejecutar `/opsx:sync` para aplicar la nueva spec `mobile-layout-robustness` y el MODIFIED de `mobile-hero-layout` a `openspec/specs/`.
- [x] 6.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
