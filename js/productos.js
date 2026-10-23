/* ============================================================
   ⚙️ PANEL DE CONTROL DE LA TIENDA
   Casi todo lo que cambia con el tiempo se edita en este archivo.
   Regla de oro: cambia solo lo que está entre comillas "..." y
   no borres comas, llaves { } ni corchetes [ ].
   ============================================================ */

/* ------------------------------------------------------------
   🏪 DATOS DE LA TIENDA
   ✏️ nombre:    sale en los mensajes de WhatsApp.
   ✏️ whatsapp:  con código de país, SIN +, espacios ni guiones.
                 Colombia: 57 + celular de 10 dígitos -> "573001234567"
   ✏️ correo:    aparece en el pie de página y en la política de privacidad.
   ✏️ instagram: enlace completo, ej. "https://instagram.com/samhome".
                 Déjalo vacío "" para ocultar el enlace.
   ✏️ envioGratisDesde: monto (solo números) desde el cual el envío es gratis.
                 Pon 0 para no mostrar nada sobre envío gratis.
   ------------------------------------------------------------ */
const TIENDA = {
  nombre: "SamHome",
  whatsapp: "573006965916",
  correo: "hola@samhome.co",
  instagram: "https://instagram.com/a_ruah/samhome.co",
  /*envioGratisDesde: 15000*/

  /* ---- Funciones opcionales (vacío "" = apagado). Mira GUIA-AJUSTES-AVANZADOS ---- */
  hoja: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRhN3pQXI3JaY3DCc2BAzAkwtPbngOOFG5J5PD93tz7QpB2vE2APXYvwPphkbeOpieRmwsmrRwFDs_a/pubhtml?gid=759968168&single=true", // Enlace CSV de tu hoja de Google Sheets (catálogo editable sin código)
  boletin: "", // Enlace de Formspree para guardar correos de la suscripción (si está vacío, la sección se oculta)
  analytics: "", // ID de Google Analytics, ej. "G-ABC123XYZ"
  pixelMeta: "", // ID del píxel de Meta (Facebook/Instagram)
};

/* ------------------------------------------------------------
   📂 CATEGORÍAS
   ✏️ Puedes cambiar "nombre" y "tono" (durazno, menta, lavanda,
      mantequilla, cielo o rosa).
   ⚠️ El "id" va en minúsculas, sin espacios ni tildes, y debe ser
      igual al "categoria" de los productos. Si cambias un id,
      cámbialo también en los productos y en los enlaces del inicio.
   ➕ Para agregar una: copia una línea completa (con su coma al final).
   ------------------------------------------------------------ */
const CATEGORIAS = [
  { id: "hogar", nombre: "Hogar", tono: "durazno" },
  { id: "bienestar", nombre: "Bienestar", tono: "menta" },
  { id: "belleza", nombre: "Belleza", tono: "lavanda" },
  { id: "accesorios", nombre: "Accesorios", tono: "mantequilla" },
  { id: "regalos", nombre: "Regalos", tono: "cielo" },
];

/* ------------------------------------------------------------
   🛍️ PRODUCTOS (cada producto es una línea entre llaves { })
   ✏️ Puedes cambiar: nombre, desc, precio, emoji, tono, etiqueta.
      - precio: solo números, sin puntos ni símbolo  ->  39900
      - tono: durazno | menta | lavanda | mantequilla | cielo | rosa
      - etiqueta: texto corto opcional ("Nuevo", "-20%"). Bórrala si no quieres.
      - destacado: true  -> el producto sale también en el inicio.
      - agotado: true    -> muestra "Agotado" y no se puede agregar al carrito.
      - opciones: "Rojo|Azul|Negro"  -> el cliente elige una (color, talla, aroma...).
                  Separa cada opción con una barra vertical |
      - Con fotos: agrega  imagen: "img/productos/vela-vainilla.jpg"  en la línea.
   ⚠️ "id": único por producto, en minúsculas, sin espacios ni tildes.
   ⚠️ "categoria": debe ser el id de una categoría de arriba.
   ⚠️ Conserva las comillas "", los dos puntos : y la coma al final de cada línea.
   ➕ Para agregar uno: copia una línea completa y cambia sus datos.
   🙈 Para ocultar uno sin borrarlo: escribe // al comienzo de su línea.
   📊 Si usas Google Sheets (campo "hoja" arriba), esta lista queda de respaldo.
   ------------------------------------------------------------ */
const PRODUCTOS = [
  {
    id: "vela-vainilla",
    categoria: "hogar",
    nombre: "Vela de soya aroma vainilla",
    desc: "Dura hasta 40 horas",
    precio: 39900,
    emoji: "🕯️",
    tono: "durazno",
    etiqueta: "Nuevo",
    destacado: true,
  },
  {
    id: "maceta-ceramica",
    categoria: "hogar",
    nombre: "Maceta de cerámica mediana",
    desc: "Con plato incluido",
    precio: 44900,
    emoji: "🪴",
    tono: "menta",
    etiqueta: "-20%",
    destacado: true,
  },
  {
    id: "crema-manos",
    categoria: "belleza",
    nombre: "Crema hidratante de manos",
    desc: "Con karité, 75 ml",
    precio: 24900,
    emoji: "🧴",
    tono: "lavanda",
    destacado: true,
  },
  {
    id: "bolso-tela",
    categoria: "accesorios",
    nombre: "Bolso de tela con cierre",
    desc: "Lavable, tres colores",
    precio: 59900,
    emoji: "👜",
    tono: "mantequilla",
    opciones: "Beige|Rosado|Verde menta",
    destacado: true,
  },
  {
    id: "taza-ceramica",
    categoria: "hogar",
    nombre: "Taza de cerámica esmaltada",
    desc: "Capacidad 350 ml",
    precio: 29900,
    emoji: "☕",
    tono: "cielo",
    destacado: true,
  },
  {
    id: "caja-regalo",
    categoria: "regalos",
    nombre: "Caja de regalo sorpresa",
    desc: "Incluye 4 productos",
    precio: 89900,
    emoji: "🎀",
    tono: "rosa",
    etiqueta: "Regalo",
    destacado: true,
  },
  {
    id: "jabones",
    categoria: "bienestar",
    nombre: "Set de jabones artesanales",
    desc: "Pack de 3 aromas",
    precio: 34900,
    emoji: "🧼",
    tono: "menta",
    destacado: true,
  },
  {
    id: "gafas-sol",
    categoria: "accesorios",
    nombre: "Gafas de sol con filtro UV",
    desc: "Montura ligera",
    precio: 49900,
    emoji: "🕶️",
    tono: "durazno",
    destacado: true,
  },
  {
    id: "difusor",
    categoria: "bienestar",
    nombre: "Difusor de aromas con varillas",
    desc: "Fragancia floral, 100 ml",
    precio: 42900,
    emoji: "🌸",
    tono: "rosa",
  },
  {
    id: "te-hierbas",
    categoria: "bienestar",
    nombre: "Té de hierbas relajante",
    desc: "20 bolsitas",
    precio: 19900,
    emoji: "🍵",
    tono: "menta",
  },
  {
    id: "labial-rosa",
    categoria: "belleza",
    nombre: "Labial cremoso tono rosa",
    desc: "Acabado satinado",
    precio: 22900,
    emoji: "💄",
    tono: "rosa",
  },
  {
    id: "brochas",
    categoria: "belleza",
    nombre: "Set de 5 brochas de maquillaje",
    desc: "Con estuche",
    precio: 54900,
    emoji: "🖌️",
    tono: "lavanda",
  },
  {
    id: "pulsera",
    categoria: "accesorios",
    nombre: "Pulsera de cuentas hecha a mano",
    desc: "Ajustable",
    precio: 27900,
    emoji: "📿",
    tono: "cielo",
  },
  {
    id: "cojin-lino",
    categoria: "hogar",
    nombre: "Cojín decorativo de lino",
    desc: "45 x 45 cm",
    precio: 38900,
    emoji: "🛋️",
    tono: "mantequilla",
  },
  {
    id: "cuaderno",
    categoria: "regalos",
    nombre: "Cuaderno de tapa dura",
    desc: "160 hojas, punto",
    precio: 32900,
    emoji: "📓",
    tono: "lavanda",
  },
];

/* ============================================================
   ⚠️ DESDE AQUÍ: NO NECESITAS EDITAR
   Lee el catálogo desde Google Sheets (si configuraste "hoja").
   Si algo falla, la tienda usa la lista de arriba y sigue funcionando.
   ============================================================ */
const LISTO = (async () => {
  if (!TIENDA.hoja) return;
  try {
    const respuesta = await fetch(TIENDA.hoja, { cache: "no-store" });
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    const lista = filasAProductos(leerCSV(await respuesta.text()));
    if (lista.length) {
      PRODUCTOS.length = 0;
      PRODUCTOS.push(...lista);
    }
  } catch (error) {
    console.warn(
      "No se pudo leer la hoja de cálculo; se usa el catálogo local.",
      error,
    );
  }
})();

function sinTildes(t) {
  return String(t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Lee texto CSV (maneja comillas, comas y saltos de línea dentro de una celda)
function leerCSV(texto) {
  const filas = [];
  let fila = [],
    campo = "",
    comillas = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (comillas) {
      if (c === '"' && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (c === '"') comillas = false;
      else campo += c;
    } else if (c === '"') comillas = true;
    else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else campo += c;
  }
  if (campo !== "" || fila.length) {
    fila.push(campo);
    filas.push(fila);
  }
  const utiles = filas.filter((f) => f.some((x) => x.trim() !== ""));
  if (utiles.length < 2) return [];
  const claves = utiles[0].map((h) => sinTildes(h).replace(/[^a-z]/g, ""));
  return utiles
    .slice(1)
    .map((f) =>
      Object.fromEntries(claves.map((k, i) => [k, (f[i] || "").trim()])),
    );
}

// Convierte las filas de la hoja en productos de la tienda
function filasAProductos(filas) {
  const TONOS = ["durazno", "menta", "lavanda", "mantequilla", "cielo", "rosa"];
  const si = (v) =>
    ["si", "true", "1", "x", "verdadero", "yes"].includes(sinTildes(v));
  const no = (v) => ["no", "false", "0", "falso"].includes(sinTildes(v));
  const slug = (t) =>
    sinTildes(t)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const usados = new Set();
  const lista = [];
  for (const f of filas) {
    const precio = Number(String(f.precio || "").replace(/[^\d]/g, ""));
    if (!f.nombre || !precio || no(f.activo)) continue;
    let id = slug(f.id || f.nombre) || "producto";
    while (usados.has(id)) id += "-2";
    usados.add(id);
    const p = {
      id,
      categoria: sinTildes(f.categoria).replace(/[^a-z0-9]+/g, "-") || "hogar",
      nombre: f.nombre,
      desc: f.descripcion || f.desc || "",
      precio,
      emoji: f.emoji || "🎁",
      tono: TONOS.includes(sinTildes(f.tono)) ? sinTildes(f.tono) : "lavanda",
    };
    if (f.etiqueta) p.etiqueta = f.etiqueta;
    if (f.imagen) p.imagen = f.imagen;
    if (f.opciones) p.opciones = f.opciones;
    if (si(f.destacado)) p.destacado = true;
    if (si(f.agotado)) p.agotado = true;
    lista.push(p);
  }
  return lista;
}
