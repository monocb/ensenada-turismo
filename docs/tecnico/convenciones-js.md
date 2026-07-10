# Convenciones de JS

`script.js` es JS vanilla sin dependencias, organizado por selección de elementos del DOM al inicio del archivo (`data-*` attributes como hooks) y funciones de interacción después (menú mobile, carrusel, lightbox, modal de lugares, reveal on scroll).

Mantener el patrón de `data-*` attributes para nuevos hooks de JS en vez de clases CSS, para no acoplar estilos y comportamiento.
