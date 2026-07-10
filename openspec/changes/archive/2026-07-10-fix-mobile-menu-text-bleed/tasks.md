## 1. Aplicar el fix

- [x] 1.1 En `styles.css` (línea ~6973, dentro de `@media (max-width: 900px)`), cambiar `background: rgba(8, 11, 24, 0.96) !important;` por `background: rgba(8, 11, 24, 1) !important;` en `.main-nav`

## 2. Verificación

- [x] 2.1 Capturar el menú abierto en 320px, 375px y 414px (local) y confirmar que el "ENSENADA" fantasma desaparece y el panel es completamente opaco
- [x] 2.2 Confirmar visualmente que el panel a opacidad 1 sigue viéndose coherente con el resto del sistema visual (no "demasiado sólido")
- [x] 2.3 Confirmar que el ícono de tres líneas, `aria-expanded`, y el comportamiento de scroll del header siguen funcionando sin cambios

## 3. Deploy

- [x] 3.1 Commit + push a `main`
- [x] 3.2 Verificar en producción (`ensenadaturismo.com`) en 320/375/414px que el panel del menú es opaco
