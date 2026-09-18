## 1. Assets

- [x] 1.1 Crear `assets/luna-taruma/` y convertir a `.webp` (ffmpeg/libwebp, calidad 78) las 4 ilustraciones de Mariana Ardanaz y las 2 fotos elegidas, con nombres en kebab-case: `ilustracion-paseo-costero.webp`, `ilustracion-luna-creciente-taruma.webp`, `ilustracion-luna-llena-taruma.webp`, `ilustracion-luna-llena-naranja-rio.webp`, `foto-selva-marginal.webp`, `foto-flor-de-taruma.webp`
- [x] 1.2 Generar variantes 480w y 900w de cada imagen, salvo `foto-selva-marginal` (640px nativos) que lleva solo 480w
- [x] 1.3 Verificar que ninguna imagen supera 500KB: `find assets -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -size +500k` devuelve vacío
- [x] 1.4 Confirmar los anchos reales generados con `ffprobe` y revisar visualmente cada variante contra su original (las ilustraciones en plastilina tienen textura fina, propensa a artefactos)

## 2. Franja de anuncio (lo urgente)

- [x] 2.1 Insertar la franja como último hijo de `.hero-content`, entre marcadores `LUNA-TARUMA:INICIO`/`FIN`: nombre del evento, fechas, hora, lugar, "libre y gratuito" y enlace a la sección
- [x] 2.2 Agregar el CSS de la franja al final de `styles.css`, entre marcadores, con las variables de la paleta en scope local (sin tocar ningún `:root`)
- [x] 2.3 Verificar que el enlace de la franja baja a la sección compensando la altura del header fijo, igual que el resto de los enlaces internos
- [x] 2.4 Verificar en 320, 360, 375, 390, 414 y 430px que la franja se ve completa, el `h1` del hero sigue legible y `scrollWidth === innerWidth` (sin overflow horizontal)

## 3. Sección del evento

- [x] 3.1 Insertar la sección entre `.hero` y `.brand-system`, entre marcadores, con `aria-labelledby` y un `h2`
- [x] 3.2 Escribir el relato con los textos del kit: el río que nos nombra, la Selva Marginal (bosque subtropical más austral de la Argentina), el Tarumá y el origen del nombre del evento
- [x] 3.3 Construir la agenda como `<ol>` de items `<li class="lt-night">` con estructura idéntica: noche 1 (sáb 19/9, 19:00 hs, Parque Costero de Punta Lara, cuarto creciente) y noche 2 (sáb 26/9, Paseo Costero de Punta Lara, Parador 5C — Alte. Brown y 52, Luna llena, con observación, pintura en vivo, tango, folclore, danza, música en vivo, telescopios y sabores de la costa), ambas con acceso libre y gratuito
- [x] 3.4 Presentar las 6 imágenes con `srcset` + `sizes` acordes al ancho renderizado, `loading="lazy"`, `alt` descriptivo real, `tabindex="0"`, `role="button"` y `data-download` al original; la revisión visual las distribuye en apertura, relato y galería secundaria
- [x] 3.5 Agregar la convocatoria a artistas para pintar en vivo el 26/9, con cualquier técnica admitida y el canal de inscripción por mensaje directo a `@turismoensenada_`
- [x] 3.6 Agregar los créditos: organizan Turismo Ensenada, Facultad de Ciencias Astronómicas y Geofísicas de la UNLP y Nexa Contenidos; ilustraciones de Mariana Ardanaz; aportes del Ing. Forestal Esteban Perea
- [x] 3.7 Agregar el enlace a la sección en `.main-nav`, entre marcadores, y verificar que funciona en desktop y en el menú hamburguesa

## 4. Estilos del bloque

- [x] 4.1 Escribir el CSS de la sección al final de `styles.css`, dentro del mismo bloque de marcadores, con todas las clases prefijadas (`lt-`/`luna-`) y sin editar ninguna regla existente
- [x] 4.2 Aplicar el reparto de roles de color del design: fondo río de noche, tarjetas índigo, texto crema, dorado solo como acento, CTA dorado con texto río de noche (nunca crema sobre dorado)
- [x] 4.3 Verificar que `git diff styles.css` no muestra cambios en ninguno de los 4 bloques `:root`
- [x] 4.4 Verificar que la sección y la agenda se leen bien de 320px a desktop, y que la agenda mantiene el mismo tratamiento visual si se le agrega un tercer item de prueba

## 5. Comportamiento

- [x] 5.1 Enganchar las imágenes al lightbox existente en `script.js`, entre marcadores, con listeners de `click` y `keydown` (Enter/Espacio); la revisión visual usa `closest(".luna-taruma")` y `[data-lt-image]` para acotar las seis imágenes
- [x] 5.2 Verificar que el lightbox abre la imagen correcta, que las flechas recorren solo las 6 del evento, que Escape cierra y devuelve el foco al disparador, y que el foco es visible al tabular
- [x] 5.3 Verificar que no hay errores en consola con el bloque presente, y que tampoco los hay si se quita el HTML del bloque dejando el JS

## 6. Verificación integral

- [x] 6.1 Correr la validación de HTML del repo (incluido el preset `html-validate:a11y`) y dejarla en verde
- [x] 6.2 Medir el contraste real del texto del bloque (crema sobre los fondos usados y texto sobre el CTA dorado) y confirmar ≥4.5:1 en texto normal y ≥3:1 en texto grande
- [x] 6.3 Revisar el orden de encabezados de `index.html` con el bloque puesto: sin saltos de nivel
- [x] 6.4 Verificar que las imágenes fuera del viewport inicial cargan diferido y que en 375px se descargan las variantes chicas, no los originales

## 7. Documentación y baja

- [x] 7.1 Crear `docs/pendientes/baja-bloque-luna-taruma.md` con el inventario completo (archivos, marcadores, assets, enlace de navegación) y los pasos exactos de retiro
- [x] 7.2 Agregar la línea correspondiente en el índice de `docs/pendientes/README.md` y en `docs/README.md` si corresponde
- [x] 7.3 Documentar en la misma página qué material del kit quedó sin usar (videos, placas, historias, convocatoria, tipografía Archivo) y dónde está el kit original, para que un cambio posterior no tenga que redescubrirlo
- [x] 7.4 Verificar que `grep -rn "LUNA-TARUMA" index.html styles.css script.js` devuelve todos los pares de marcadores, sin ninguno huérfano
- [x] 7.5 Correr `graphify update .` para reflejar los cambios en el grafo

## 8. Revisión visual solicitada el 18/09/2026

- [x] 8.1 Actualizar propuesta, diseño y requisitos antes del código, incluyendo orden móvil y lightbox común de seis imágenes
- [x] 8.2 Crear apertura con ilustración protagonista y agenda previa al relato; destacar días/mes, separar horario y eliminar contadores
- [x] 8.3 Reorganizar relato sin tarjetas repetidas, con fotos junto a sus textos; conservar las obras sin recortes y ajustar `sizes`
- [x] 8.4 Mover convocatoria antes de la galería y agregar botón "Quiero participar" con foco visible
- [x] 8.5 Adaptar el enganche del lightbox a las seis imágenes distribuidas por la sección, manteniendo teclado, navegación y retorno de foco
- [x] 8.6 Verificar composición en escritorio y 320/360/375/390/414/430px, sin desbordes internos ni recortes; comprobar una tercera noche de prueba
- [x] 8.7 Ejecutar HTML, CSS, enlaces, sintaxis JS y OpenSpec; comprobar lightbox y baja tolerante; documentar resultados y cualquier fallo previo
- [x] 8.8 Actualizar procedimiento de baja y grafo, revisar diff y cerrar el cambio según el flujo OpenSpec
