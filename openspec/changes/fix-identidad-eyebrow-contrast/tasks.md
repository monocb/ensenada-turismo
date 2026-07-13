## 1. Rama y preparación

- [x] 1.1 Crear rama `fix-identidad-eyebrow-contrast` desde `main`

## 2. Corregir el color

- [x] 2.1 Cambiar `.route-copy .eyebrow { color: var(--brand-orange); }` (styles.css:3601-3603) a `color: #b8440b;`
- [x] 2.2 Verificar que no hay otra regla más específica que targetee `.route-copy .eyebrow` y gane la cascada — confirmado, es la única ocurrencia del selector en el archivo

## 3. Verificación y entrega

- [x] 3.1 `npx --yes stylelint styles.css` sin errores
- [ ] 3.2 Pushear la rama y abrir PR contra `main`; confirmar Deploy Preview de Netlify
- [ ] 3.3 Comparar visualmente el eyebrow "ENSENADA IDENTIDAD" en la Deploy Preview contra producción
- [ ] 3.4 Con aprobación del usuario: mergear el PR y archivar el change (`/opsx:archive`)
