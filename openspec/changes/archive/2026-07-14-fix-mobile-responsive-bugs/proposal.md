## Why

El cliente mandó capturas desde un iPhone real (~375-390px) mostrando la sección Fragata con el título y el párrafo cortados a mitad de palabra/frase, y pidió una pasada general de responsive mobile en todo el sitio. Una auditoría a fondo de `styles.css` (que tiene muchos parches fechados superpuestos, donde reglas posteriores en el archivo le ganan en cascada a reglas anteriores mejor pensadas para mobile) confirmó la causa raíz de ese bug y encontró 3 problemas reales más: fragilidad silenciosa en el `<h1>` del hero, una caja de foto desproporcionadamente alta en la ruleta de Historia, y el ícono del menú hamburguesa que no se convierte en X al abrir.

## What Changes

- **Fragata (bug confirmado)**: `.fragata-hero-copy` tenía `left: 20px; right: 20px;` en un elemento `position:relative` (≤560px) — en ese contexto eso desplaza la caja 20px a la derecha sin achicarla (en vez de acotar su ancho, como sí haría en un elemento `absolute`), y como `.fragata-hero` tiene `overflow:hidden`, el excedente se recortaba. Se eliminan esas dos líneas.
- **Hero `<h1>ENSENADA</h1>`**: se eliminan 5 bloques de media queries muertos (nunca se aplicaban, pisados en cascada por una regla posterior más genérica) y se saca el `white-space: nowrap` forzado de la regla que sí gana, para que el texto pueda pasar a una segunda línea como red de seguridad en vez de recortarse invisiblemente si alguna vez no entra en una línea — sin cambiar ningún tamaño de fuente actual.
- **`.timeline-stage` (Historia)**: la altura en mobile (≤560px) pasa de un valor fijo de `600px` (más alto que el propio desktop, 456px) a un valor proporcional al viewport (`clamp(240px, 64vw, 380px)`), para no ocupar ~90% de la pantalla en un iPhone SE.
- **Ícono del menú hamburguesa**: al abrir el menú, el ícono ahora se transforma visualmente en una X (rotación de las líneas) en vez de seguir mostrando 3 líneas sin cambios. La función de abrir/cerrar y `aria-expanded` ya andaban bien, es un ajuste puramente visual.
- **`.route-section`/`.place-accordion` ("Identidad")**: investigado a fondo, confirmado sano — no se toca. El indicador de scroll que aparecía en la segunda captura del cliente pertenece a `.timeline-years` (la ruleta de años de Historia), que tiene scroll horizontal intencional.

## Capabilities

### New Capabilities
- `mobile-layout-robustness`: el sitio no debe recortar ni desproporcionar contenido en viewports mobile angostos (320-430px) — cubre Fragata y la caja de foto de la ruleta de Historia.

### Modified Capabilities
- `mobile-hero-layout`: se agrega el requirement de que el ícono del menú mobile se transforme visualmente en X al abrirse (hoy solo se especificaba que usa un ícono de 3 líneas en reposo).

## Impact

- `styles.css`: ediciones puntuales en 4 zonas ya identificadas por línea (Fragata, hero h1, timeline-stage, ícono del menú) — sin reorganizar el archivo.
- `openspec/specs/mobile-hero-layout/spec.md` (modificada), `openspec/specs/mobile-layout-robustness/spec.md` (nueva).
