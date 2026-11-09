# Family App — sitio web

Página del producto Family App: qué es, cómo funciona, familias amigas, Family App Plus, lo que viene y un formulario para avisar del lanzamiento.

Sitio estático: HTML + CSS + JS, sin dependencias ni build.

## Estructura

```
index.html        Página
styles.css        Estilos
main.js           Planilla interactiva del hero + formulario
assets/favicon.svg
```

## Verlo en local

Abrí `index.html` en el navegador, o desde la carpeta:

```powershell
npx serve .
```

## Formulario "Avisame" (Formspree)

El formulario manda los correos a [Formspree](https://formspree.io), que te los reenvía por mail y los guarda en un panel.

1. Creá una cuenta gratis en formspree.io.
2. Tocá **+ New Form**, ponele de nombre "Avisame Family App" y elegí el correo donde querés recibir los avisos.
3. Formspree te da una dirección como `https://formspree.io/f/xyzabcde`. Copiá solo el código final (`xyzabcde`).
4. En `main.js`, pegalo en `const FORMSPREE_ID = "xyzabcde";`, guardá y hacé push.
5. Probalo desde la web publicada con tu propio correo. El primer envío te pide confirmar el formulario por mail.
6. Opcional, en Settings del formulario: en **Restrict to Domain** poné `javimathesan.github.io`, así nadie puede usar tu formulario desde otro sitio.

Para exportar la lista cuando salga la app: panel del formulario → Submissions → Export (CSV).

Mientras `FORMSPREE_ID` esté vacío, el formulario avisa que todavía no está conectado.

## Capturas de la app

Están en `assets/capturas/` (formato .webp, 540×1120). Para reemplazar una, guardá la nueva con el **mismo nombre** y listo:

- `ajustes-hogar.webp`, `palabras.webp`, `juegos.webp`, `personalizar.webp` → sección "Así se ve la app"
- `reglas-de-juego.webp` → sección de juegos
- `avatar.webp` → sección Plus

Recortá la barra de estado del teléfono (hora, batería) antes de guardarlas. No subas capturas con nombres reales: el historial de Git las conserva aunque después las reemplaces.

## Imagen para compartir

`assets/og-image-v2.jpg` (1200×630) es la vista previa que muestran WhatsApp, Facebook y X. Las etiquetas `og:` en `index.html` la apuntan con la URL completa; si la web pasa a un dominio propio, actualizá `og:url` y `og:image`.

WhatsApp y Teams guardan la vista previa en caché. Si cambiás la imagen, guardala con otro nombre (por ejemplo `og-image-v3.jpg`) y actualizá `og:image`, así la vuelven a leer. Todo lo importante va en el cuadrado del centro, porque algunas apps la recortan en cuadrado.

## Publicar con GitHub Pages

1. Subí los archivos al repo `javimathesan/family_app_web` (rama `main`).
2. En GitHub: Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.
3. Queda en `https://javimathesan.github.io/family_app_web/`.
