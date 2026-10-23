/* ⚠️ NO NECESITAS EDITAR ESTE ARCHIVO. Es el carrito y el envío del pedido por WhatsApp.
   Si lo cambias, el carrito puede dejar de funcionar. Los datos se editan en productos.js */
/* Carrito de compras con envío del pedido por WhatsApp */
(() => {
  const $ = (s) => document.querySelector(s);
  const dinero = (n) => "$" + n.toLocaleString("es-CO");
  const CLAVE = "samhome-carrito";

  let carrito = [];
  try { carrito = JSON.parse(localStorage.getItem(CLAVE)) || []; } catch (e) { carrito = []; }
  // Descarta productos que ya no existen en el catálogo
  carrito = carrito.filter((c) => PRODUCTOS.some((p) => p.id === c.id));

  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch (e) {} };
  const buscar = (id) => PRODUCTOS.find((p) => p.id === id);

  /* ---------- Catálogo ---------- */
  const tarjeta = (p) => `
    <article class="producto">
      <div class="producto__img tono-${p.tono}">
        ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : p.emoji}
        ${p.etiqueta ? `<span class="etiqueta">${p.etiqueta}</span>` : ""}
      </div>
      <h3>${p.nombre}</h3>
      <p class="producto__desc">${p.desc}</p>
      <div class="producto__pie">
        <strong>${dinero(p.precio)}</strong>
        <button class="boton boton--mini" data-agregar="${p.id}">Agregar</button>
      </div>
    </article>`;

  // Dibuja una lista de productos (también la usa catalogo.js)
  window.pintarProductos = (lista) => {
    const contenedor = $("#productos");
    if (contenedor) contenedor.innerHTML = lista.map(tarjeta).join("");
  };
  // En el inicio se muestran solo los destacados
  if (document.body.dataset.pagina !== "catalogo") {
    window.pintarProductos(PRODUCTOS.filter((p) => p.destacado));
  }

  /* ---------- Carrito ---------- */
  const drawer = $("#drawer"), overlay = $("#overlay");
  let ultimoFoco = null;

  function abrir() {
    ultimoFoco = document.activeElement;
    drawer.classList.add("abierto");
    overlay.classList.add("abierto");
    document.body.classList.add("sin-scroll");
    $("#cerrar").focus();
  }
  function cerrar() {
    if (!drawer.classList.contains("abierto")) return;
    drawer.classList.remove("abierto");
    overlay.classList.remove("abierto");
    document.body.classList.remove("sin-scroll");
    if (ultimoFoco) ultimoFoco.focus();
  }

  function agregar(id) {
    const item = carrito.find((c) => c.id === id);
    item ? item.cant++ : carrito.push({ id, cant: 1 });
    pintar();
  }
  function cambiar(id, delta) {
    const item = carrito.find((c) => c.id === id);
    if (!item) return;
    item.cant += delta;
    if (item.cant <= 0) carrito = carrito.filter((c) => c.id !== id);
    pintar();
  }

  const total = () => carrito.reduce((t, c) => t + buscar(c.id).precio * c.cant, 0);
  const unidades = () => carrito.reduce((t, c) => t + c.cant, 0);

  function pintar() {
    guardar();
    const n = unidades();
    $("#contador").textContent = n;
    $("#abrir-carrito").setAttribute("aria-label", `Carrito, ${n} producto${n === 1 ? "" : "s"}`);
    $("#vacio").hidden = n > 0;
    $("#pedido").hidden = n === 0;

    $("#items").innerHTML = carrito.map((c) => {
      const p = buscar(c.id);
      return `<li class="linea">
        <span class="linea__img tono-${p.tono}">${p.emoji}</span>
        <div class="linea__info">
          <strong>${p.nombre}</strong>
          <span>${dinero(p.precio)}</span>
          <div class="cantidad">
            <button data-menos="${p.id}" aria-label="Quitar una unidad de ${p.nombre}">−</button>
            <output>${c.cant}</output>
            <button data-mas="${p.id}" aria-label="Agregar una unidad de ${p.nombre}">+</button>
          </div>
        </div>
        <span class="linea__sub">${dinero(p.precio * c.cant)}</span>
      </li>`;
    }).join("");
    $("#total").textContent = dinero(total());
  }

  /* ---------- Mensaje de WhatsApp ---------- */
  function enviarPedido(e) {
    e.preventDefault();
    if (!carrito.length) return;
    const nombre = $("#nombre").value.trim();
    const direccion = $("#direccion").value.trim();
    const notas = $("#notas").value.trim();

    const lineas = carrito.map((c) => {
      const p = buscar(c.id);
      return `• ${c.cant} x ${p.nombre} - ${dinero(p.precio * c.cant)}`;
    });
    const mensaje = [
      `Hola ${TIENDA.nombre}, quiero hacer este pedido:`,
      "",
      ...lineas,
      "",
      `Total: ${dinero(total())}`,
      "",
      `Nombre: ${nombre}`,
      `Ciudad y dirección: ${direccion}`,
      notas ? `Notas: ${notas}` : null
    ].filter((l) => l !== null).join("\n");

    window.open(`https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.agregar) {
      agregar(b.dataset.agregar);
      b.textContent = "Agregado";
      setTimeout(() => (b.textContent = "Agregar"), 1200);
    }
    if (b.dataset.mas) cambiar(b.dataset.mas, 1);
    if (b.dataset.menos) cambiar(b.dataset.menos, -1);
  });
  $("#abrir-carrito").addEventListener("click", abrir);
  $("#cerrar").addEventListener("click", cerrar);
  $("#seguir").addEventListener("click", cerrar);
  overlay.addEventListener("click", cerrar);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });
  $("#pedido").addEventListener("submit", enviarPedido);

  pintar();
})();
