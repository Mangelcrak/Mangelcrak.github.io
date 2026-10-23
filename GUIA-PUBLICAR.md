# Cómo publicar la tienda SamHome en GitHub Pages

GitHub Pages es gratis para repositorios públicos. Tu tienda quedará en internet con una dirección como `https://tuusuario.github.io/`.

---

## 1. Entiende cómo se forma tu URL

| Tipo de repositorio | Nombre del repositorio | URL final |
|---|---|---|
| **Sitio de usuario (recomendado)** | `tuusuario.github.io` | `https://tuusuario.github.io/` |
| Sitio de proyecto | `samhome` (cualquier nombre) | `https://tuusuario.github.io/samhome/` |

Usa el **sitio de usuario**. La tienda queda en la raíz de la dirección, y `robots.txt` y `sitemap.xml` solo funcionan así.

Tu nombre de usuario de GitHub pasa a ser parte de la dirección, así que escógelo corto y sin espacios, por ejemplo `nubetienda`. Si quieres cambiarlo después, la URL cambia.

---

## 2. Antes de subir: revisa estos 3 puntos

1. **Número de WhatsApp, correo e Instagram** en `productos.js` (bloque `TIENDA`): cambia `573000000000` por el tuyo (código de país, sin `+` ni espacios).
2. **Productos y precios** en `productos.js`.
3. **El dominio de ejemplo** `https://www.tudominio.com`: se reemplaza por tu URL real **después** del paso 5, cuando ya sepas la dirección.

---

## 3. Crea la cuenta y el repositorio

1. Entra a **github.com** y crea una cuenta gratis (si ya tienes, inicia sesión).
2. Toca el botón **+** (arriba a la derecha) → **New repository**.
3. En **Repository name** escribe exactamente `tuusuario.github.io` (con tu usuario real).
4. Déjalo en **Public**.
5. Marca **Add a README file** y toca **Create repository**.

---

## 4. Sube los archivos (sin usar comandos)

1. Dentro del repositorio toca **Add file → Upload files**.
2. Arrastra **el contenido** de la carpeta de la tienda, no la carpeta misma. En la raíz del repositorio deben quedar:
   `index.html`, `catalogo.html`, `styles.css`, `productos.js`, `carrito.js`, `catalogo.js`, `menu.js`, `whatsapp.js`, `robots.txt`, `sitemap.xml`
   y la carpeta `img/` cuando tengas fotos.
3. Abajo, en **Commit changes**, escribe un mensaje como "Primera versión" y toca **Commit changes**.

> **Importante:** `index.html` debe quedar en la raíz, no dentro de una subcarpeta. GitHub distingue mayúsculas de minúsculas, así que `Index.html` no funciona.

### Alternativa con comandos (Git)

Si ya tienes Git instalado, desde la carpeta de la tienda:

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/tuusuario/tuusuario.github.io.git
git push -u origin main
```

---

## 5. Activa GitHub Pages

1. En el repositorio entra a **Settings**.
2. En el menú izquierdo toca **Pages**.
3. En **Build and deployment** → **Source** elige **Deploy from a branch**.
4. En **Branch** elige `main` y la carpeta `/ (root)`, y toca **Save**.
5. Espera unos minutos (puede tardar hasta 10). Al terminar, arriba aparece el mensaje *"Your site is live at…"* con tu URL.

Abre `https://tuusuario.github.io/` y prueba: carrito, catálogo, menú en celular y botón de WhatsApp.

---

## 6. Pon tu URL real en el SEO

Cuando tu página ya abra, reemplaza `https://www.tudominio.com` por tu URL real (sin barra al final), por ejemplo `https://tuusuario.github.io`.

Se encuentra en **4 archivos**: `index.html`, `catalogo.html`, `robots.txt` y `sitemap.xml`.

- **Con VS Code:** Ctrl+Mayús+H (Cmd+Mayús+H en Mac) → buscar en todos los archivos → reemplazar todo.
- **Desde GitHub:** abre cada archivo → ícono del lápiz → edita → **Commit changes**.

---

## 7. Registra tu tienda en Google

1. Entra a **search.google.com/search-console** e inicia sesión con tu cuenta de Google.
2. Agrega tu URL como propiedad y sigue los pasos de verificación.
3. En **Sitemaps** escribe `sitemap.xml` y envíalo.

Google puede tardar días o semanas en mostrar la página en los resultados. Es normal.

---

## 8. Cómo actualizar la tienda después

- **Cambiar productos o precios:** abre `productos.js` en GitHub → ícono del lápiz → edita → **Commit changes**. En 1 a 2 minutos se ve en la página.
- **Agregar fotos:** sube las imágenes a una carpeta `img/` y agrega `imagen: "img/nombre.jpg"` al producto.
- Si no ves el cambio, recarga sin caché (Ctrl+Mayús+R) o espera unos minutos.

---

## 9. (Opcional) Dominio propio, por ejemplo `samhome.co`

1. Compra el dominio en un registrador (Namecheap, GoDaddy, Cloudflare, Hostinger, etc.).
2. En GitHub: **Settings → Pages → Custom domain**, escribe tu dominio y guarda.
3. En el panel de tu registrador, crea los registros DNS que indica la [documentación de GitHub](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site) (cambian con el tiempo, revísalos ahí).
4. Cuando GitHub lo valide, marca **Enforce HTTPS**.
5. Repite el paso 6 con tu dominio nuevo.

---

## Problemas frecuentes

| Problema | Solución |
|---|---|
| Aparece error 404 | `index.html` no está en la raíz o el nombre del repositorio no es `tuusuario.github.io`. |
| La página se ve sin estilos | Revisa que `styles.css` esté en la raíz y escrito en minúsculas. |
| No aparecen los productos | Revisa que `productos.js` y `carrito.js` estén subidos. |
| El pedido abre WhatsApp con otro número | Revisa el número en `productos.js`. |
| Hice un cambio y no se ve | Espera 2 a 10 minutos y recarga con Ctrl+Mayús+R. |
