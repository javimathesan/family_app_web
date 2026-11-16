# Family App — sitio web

Sitio del producto Family App: qué es, cómo funciona, herramientas para toda la casa, familias amigas, Family App Plus, lo que viene, preguntas frecuentes, formulario "Avisame" y páginas legales.

- **Publicado en:** https://javimathesan.github.io/family_app_web/
- **Repo de la app:** https://github.com/javimathesan/family_app
- **Contacto oficial:** familyapps.oficial@gmail.com · Instagram [@familyapps.oficial](https://www.instagram.com/familyapps.oficial/)

Sitio estático: HTML + CSS + JS, sin dependencias ni paso de compilación. Lo que está en `main` es lo que se publica.

## Estructura

```
index.html          Página principal
privacidad.html     Política de privacidad (URL para Google Play)
terminos.html       Términos y condiciones
borrar-datos.html   Cómo borrar los datos (URL de borrado para Google Play)
404.html            Página de error
styles.css          Estilos de todo el sitio
main.js             Menú, planilla del inicio, formulario y año del pie
sitemap.xml         Lista de páginas para los buscadores
assets/
  favicon.svg, icono-180.png, icono-512.png   Íconos
  og-image-v2.jpg                             Imagen al compartir el link
  capturas/                                   Capturas de la app (.webp)
```

## De dónde sale cada dato

La web no inventa nada: todo lo que afirma sale de la app. Cuando cambie la app, revisá estos lugares.

| En la web | Fuente en el repo de la app |
| --- | --- |
| Funciones ("Cómo funciona", "Para toda la casa", juegos) | `README.md`, tabla "Qué tiene hoy" |
| "Lo que viene" | `docs/hoja-de-ruta.md` |
| Edades (Peques 4 a 8, Junior 9 a 12, Teen 13 a 17) | `app/lib/models/models.dart`, `AgeMode` |
| Privacidad y términos | pantallas `privacy_screen.dart` y `terms_screen.dart`, y `docs/legal/` |
| Borrar mis datos | `docs/legal/borrar-datos.md` |

**Regla:** la app, `docs/legal/` y la web tienen que decir lo mismo. Si cambia un texto legal en un lugar, cambialo en los tres y actualizá la línea "Versión AAAA-MM" de la página.

## Tareas frecuentes

### Cambiar el encabezado o el pie

El encabezado (`<header class="top">`) y el pie (`<footer class="foot">`) son **idénticos en las cinco páginas**. Para cambiarlos en todas a la vez, en VS Code: **Ctrl + Shift + H**, buscá el texto viejo, escribí el nuevo y tocá "Reemplazar todo". Después revisá que las cinco páginas hayan cambiado.

Los enlaces del menú usan `./#seccion` para que funcionen desde cualquier página.

### Agregar una sección a la página principal

1. Copiá un bloque `<section class="section" id="...">` de `index.html` y cambiale el `id`.
2. Si tiene que estar en el menú, agregá el enlace `./#id` en el encabezado de las cinco páginas.

### Agregar una página

1. Copiá `terminos.html`, cambiá `<title>`, la descripción, el `canonical` y el contenido de `<main>`.
2. Agregala a `sitemap.xml` y, si corresponde, al pie de las cinco páginas.

### Cambiar una pregunta frecuente

Cada pregunta es un bloque `<details>` en `index.html`, con la pregunta en `<summary>` y la respuesta en `<p>`.

### Reemplazar capturas

Están en `assets/capturas/` (formato .webp, 540×1120). Para reemplazar una, guardá la nueva con el **mismo nombre**:

- `ajustes-hogar.webp`, `palabras.webp`, `juegos.webp`, `personalizar.webp` → sección "Así se ve la app"
- `reglas-de-juego.webp` → sección de juegos
- `avatar.webp` → sección Plus

Recortá la barra de estado del teléfono (hora, batería). **No subas capturas con nombres reales:** el historial de Git las conserva aunque después las reemplaces. Usá el hogar de demostración.

### Cambiar la imagen para compartir

`assets/og-image-v2.jpg` (1200×630) es la vista previa de WhatsApp, Instagram, Facebook y X. Las apps la guardan en caché: si la cambiás, guardala con otro nombre (`og-image-v3.jpg`) y actualizá `og:image` en `index.html`. Lo importante va en el cuadrado del centro, porque algunas apps la recortan.

## Formulario "Avisame" (Formspree)

El formulario manda los correos a [Formspree](https://formspree.io), que los reenvía por mail y los guarda en un panel. El código del formulario está en `main.js`, en `FORMSPREE_ID`.

- La casilla "Quiero probarla antes" llega como `tester: si`. Esos correos son los que se cargan como testers en Play Console.
- Revisá cada tanto la pestaña **Spam** de Submissions: Formspree guarda ahí los envíos dudosos y no avisa por mail.
- Para exportar la lista: panel del formulario → Submissions → Export (CSV).

## Publicar

Cada `git push` a `main` actualiza la web en uno o dos minutos (GitHub → Settings → Pages → `main` / root).

```powershell
git add -A
git commit -m "Qué cambió"
git push
```

Antes de subir, abrí la página en el navegador y revisala también en ancho de celular (F12 → ícono de dispositivos).

## Cuando salga la app

- [ ] Reemplazar el formulario "Avisame" por el botón oficial de Google Play (o dejarlos juntos).
- [ ] Cambiar "Pronto en Android" y las frases en futuro ("cuando salga").
- [ ] Actualizar "Lo que viene" con la hoja de ruta.
- [ ] Reemplazar las capturas por las del hogar de demostración.

## Si la web pasa a un dominio propio

Hay que cambiar `https://javimathesan.github.io/family_app_web/` por la dirección nueva en:

- `index.html`: `canonical`, `og:url`, `og:image` y el bloque de datos estructurados (`application/ld+json`).
- `privacidad.html`, `terminos.html`, `borrar-datos.html`: `canonical`.
- `sitemap.xml`: todas las direcciones.
- `404.html`: `<base href="/family_app_web/">` pasa a `<base href="/">`.
- La app: los enlaces a términos y privacidad, y la ficha de Google Play.
- Formspree: "Restrict to Domain", si está activado.

Con dominio propio conviene sumar un `robots.txt` en la raíz que apunte al sitemap. En `github.io/family_app_web/` no sirve, porque los buscadores solo lo leen en la raíz del dominio.

## Para que Google la encuentre

Registrá la web en [Google Search Console](https://search.google.com/search-console) con la cuenta oficial y enviá `sitemap.xml`. Ahí también se ve con qué búsquedas llega la gente.
