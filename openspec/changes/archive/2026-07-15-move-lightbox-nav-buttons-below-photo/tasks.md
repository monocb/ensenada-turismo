## 1. CSS — reposicionar y cambiar la forma de las flechas

- [x] 1.1 En `styles.css`, en `.lightbox-nav`: sacar `top:50%; transform:translateY(-50%);`, agregar `bottom: clamp(16px, 4vw, 32px);`. Cambiar `border-radius:999px` a `14px`. Cambiar `width:52px; height:52px;` a `width:64px; height:48px;` (rectangular, más ancho que alto).
- [x] 1.2 En `.lightbox-prev`: sacar `left: clamp(14px, 4vw, 42px);`, agregar `left:50%; transform: translateX(calc(-100% - 8px));`.
- [x] 1.3 En `.lightbox-next`: sacar `right: clamp(14px, 4vw, 42px);`, agregar `left:50%; transform: translateX(8px);`.
- [x] 1.4 En `.image-lightbox img`, cambiar `max-height: 92vh;` a `max-height: 78vh;`, para que quede espacio debajo de la foto sin que las flechas se superpongan.
- [x] 1.5 (Extra, encontrado durante la verificación) En la media query mobile que achica `.lightbox-nav` a 44x44px, cambiar a `width:58px; height:44px;` para que se mantenga rectangular (más ancho que alto) también en mobile, no solo en desktop.

## 2. Verificación

- [x] 2.1 Balance de llaves en `styles.css`.
- [x] 2.2 Servir el sitio en local y confirmar que el CSS nuevo se sirve correctamente.
- [ ] 2.3 Confirmación visual del cliente una vez deployado: las flechas se ven debajo de la foto (no tapándola), con forma rectangular de esquinas redondeadas, tanto en Fragata como en En Fotos.

## 3. OpenSpec

- [x] 3.1 Ejecutar `/opsx:sync` para aplicar la nueva spec `lightbox-nav-controls-layout` a `openspec/specs/`.
- [x] 3.2 Archivar el cambio con `/opsx:archive` una vez verificada la implementación.
