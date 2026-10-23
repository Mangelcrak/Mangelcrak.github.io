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
   ✏️ correo:    aparece en el pie de página.
   ✏️ instagram: enlace completo, ej. "https://instagram.com/samhome".
                 Déjalo vacío "" para ocultar el enlace.
   ------------------------------------------------------------ */
const TIENDA = {
  nombre: "SamHome",
  whatsapp: "573006965914",
  correo: "hola@samhome.co",
  instagram: ""
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
  { id: "hogar",       nombre: "Hogar",       tono: "durazno" },
  { id: "bienestar",   nombre: "Bienestar",   tono: "menta" },
  { id: "belleza",     nombre: "Belleza",     tono: "lavanda" },
  { id: "accesorios",  nombre: "Accesorios",  tono: "mantequilla" },
  { id: "regalos",     nombre: "Regalos",     tono: "cielo" }
];

/* ------------------------------------------------------------
   🛍️ PRODUCTOS (cada producto es una línea entre llaves { })
   ✏️ Puedes cambiar: nombre, desc, precio, emoji, tono, etiqueta.
      - precio: solo números, sin puntos ni símbolo  ->  39900
      - tono: durazno | menta | lavanda | mantequilla | cielo | rosa
      - etiqueta: texto corto opcional ("Nuevo", "-20%"). Bórrala si no quieres.
      - destacado: true  -> el producto sale también en el inicio.
      - Con fotos: agrega  imagen: "img/vela.jpg"  en la línea.
   ⚠️ "id": único por producto, en minúsculas, sin espacios ni tildes.
   ⚠️ "categoria": debe ser el id de una categoría de arriba.
   ⚠️ Conserva las comillas "", los dos puntos : y la coma al final de cada línea.
   ➕ Para agregar uno: copia una línea completa y cambia sus datos.
   🙈 Para ocultar uno sin borrarlo: escribe // al comienzo de su línea.
   ------------------------------------------------------------ */
const PRODUCTOS = [
  { id: "vela-vainilla",   categoria: "hogar",      nombre: "Vela de soya aroma vainilla",   desc: "Dura hasta 40 horas",    precio: 39900, emoji: "🕯️", tono: "durazno",     etiqueta: "Nuevo", destacado: true },
  { id: "maceta-ceramica", categoria: "hogar",      nombre: "Maceta de cerámica mediana",    desc: "Con plato incluido",     precio: 44900, emoji: "🪴", tono: "menta",       etiqueta: "-20%",  destacado: true },
  { id: "crema-manos",     categoria: "belleza",    nombre: "Crema hidratante de manos",     desc: "Con karité, 75 ml",      precio: 24900, emoji: "🧴", tono: "lavanda",     destacado: true },
  { id: "bolso-tela",      categoria: "accesorios", nombre: "Bolso de tela con cierre",      desc: "Lavable, tres colores",  precio: 59900, emoji: "👜", tono: "mantequilla", destacado: true },
  { id: "taza-ceramica",   categoria: "hogar",      nombre: "Taza de cerámica esmaltada",    desc: "Capacidad 350 ml",       precio: 29900, emoji: "☕", tono: "cielo",       destacado: true },
  { id: "caja-regalo",     categoria: "regalos",    nombre: "Caja de regalo sorpresa",       desc: "Incluye 4 productos",    precio: 89900, emoji: "🎀", tono: "rosa",        etiqueta: "Regalo", destacado: true },
  { id: "jabones",         categoria: "bienestar",  nombre: "Set de jabones artesanales",    desc: "Pack de 3 aromas",       precio: 34900, emoji: "🧼", tono: "menta",       destacado: true },
  { id: "gafas-sol",       categoria: "accesorios", nombre: "Gafas de sol con filtro UV",    desc: "Montura ligera",         precio: 49900, emoji: "🕶️", tono: "durazno",     destacado: true },
  { id: "difusor",         categoria: "bienestar",  nombre: "Difusor de aromas con varillas", desc: "Fragancia floral, 100 ml", precio: 42900, emoji: "🌸", tono: "rosa" },
  { id: "te-hierbas",      categoria: "bienestar",  nombre: "Té de hierbas relajante",       desc: "20 bolsitas",            precio: 19900, emoji: "🍵", tono: "menta" },
  { id: "labial-rosa",     categoria: "belleza",    nombre: "Labial cremoso tono rosa",      desc: "Acabado satinado",       precio: 22900, emoji: "💄", tono: "rosa" },
  { id: "brochas",         categoria: "belleza",    nombre: "Set de 5 brochas de maquillaje", desc: "Con estuche",           precio: 54900, emoji: "🖌️", tono: "lavanda" },
  { id: "pulsera",         categoria: "accesorios", nombre: "Pulsera de cuentas hecha a mano", desc: "Ajustable",            precio: 27900, emoji: "📿", tono: "cielo" },
  { id: "cojin-lino",      categoria: "hogar",      nombre: "Cojín decorativo de lino",      desc: "45 x 45 cm",             precio: 38900, emoji: "🛋️", tono: "mantequilla" },
  { id: "cuaderno",        categoria: "regalos",    nombre: "Cuaderno de tapa dura",         desc: "160 hojas, punto",       precio: 32900, emoji: "📓", tono: "lavanda" }
];
