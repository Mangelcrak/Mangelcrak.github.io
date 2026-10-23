/* ============================================================
   CONFIGURACIÓN Y CATÁLOGO
   Aquí editas todo sin tocar el resto del código.
   ============================================================ */

const TIENDA = {
  nombre: "Nube",
  // Número de WhatsApp con código de país, sin + ni espacios (Colombia = 57)
  whatsapp: "573000000000"
};

const CATEGORIAS = [
  { id: "hogar",       nombre: "Hogar",       tono: "durazno" },
  { id: "bienestar",   nombre: "Bienestar",   tono: "menta" },
  { id: "belleza",     nombre: "Belleza",     tono: "lavanda" },
  { id: "accesorios",  nombre: "Accesorios",  tono: "mantequilla" },
  { id: "regalos",     nombre: "Regalos",     tono: "cielo" }
];

// tono: durazno | menta | lavanda | mantequilla | cielo | rosa
// destacado: true  -> aparece en el inicio.   etiqueta: opcional.
// Cuando tengas fotos, agrega  imagen: "img/vela.jpg"
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
