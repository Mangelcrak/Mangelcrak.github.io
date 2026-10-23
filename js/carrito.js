/* ⚠️ NO NECESITAS EDITAR ESTE ARCHIVO. Es el carrito y el envío del pedido por WhatsApp.
   Si lo cambias, el carrito puede dejar de funcionar. Los datos se editan en productos.js */
LISTO.then(() => {
  const $ = (s) => document.querySelector(s);
  const dinero = (n) => "$" + n.toLocaleString("es-CO");
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const CLAVE = "samhome-carrito";
  const buscar = (id) => PRODUCTOS.find((p) => p.id === id);
  const opcionesDe = (p) => (p.opciones ? String(p.opciones).split("|").map((o) => o.trim()).filter(Boolean) : []);
  const llave = (c) => `${c.id}|${c.op || ""}`;

  let carrito = [];
  try { carrito = JSON.parse(localStorage.getItem(CLAVE)) || []; } catch (e) { carrito = []; }
  // Descarta productos que ya no existen o que se agotaron
  carrito = carrito.filter((c) => { const p = buscar(c.id); return p && !p.agotado && c.cant > 0; });
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch (e) {} };

  /* ---------- Catálogo ---------- */
  const tarjeta = (p) => {
    const ops = opcionesDe(p);
    const insignia = p.agotado
      ? `<span class="etiqueta etiqueta--agotado">Agotado</span>`
      : p.etiqueta ? `<span class="etiqueta">${esc(p.etiqueta)}</span>` : "";
    return `
    <article class="producto${p.agotado ? " producto--agotado" : ""}">
      <div class="producto__img tono-${esc(p.tono)}">
        ${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy">` : esc(p.emoji)}
        ${insignia}
      </div>
      <h3>${esc(p.nombre)}</h3>
      <p class="producto__desc">${esc(p.desc)}</p>
      ${ops.length ? `<label class="sr" for="op-${esc(p.id)}">Opción de ${esc(p.nombre)}</label>
      <select class="producto__op" id="op-${esc(p.id)}">${ops.map((o) => `<option>${esc(o)}</option>`).join("")}</select>` : ""}
      <div class="producto__pie">
        <strong>${dinero(p.precio)}</strong>
        ${p.agotado
          ? `<button class="boton boton--mini" disabled>Agotado</button>`
          : `<button class="boton boton--mini" data-agregar="${esc(p.id)}">Agregar</button>`}
      </div>
    </article>`;
  };

  // Dibuja una lista de productos (también la usa catalogo.js)
  window.pintarProductos = (lista) => {
    const contenedor = $("#productos");
    if (contenedor) contenedor.innerHTML = lista.map(tarjeta).join("");
  };
  // En el inicio se muestran los destacados (o los primeros 8 si no hay ninguno marcado)
  if ($("#productos") && document.body.dataset.pagina !== "catalogo") {
    let destacados = PRODUCTOS.filter((p) => p.destacado);
    if (!destacados.length) destacados = PRODUCTOS.slice(0, 8);
    window.pintarProductos(destacados);
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

  function agregar(id, op) {
    const item = carrito.find((c) => c.id === id && (c.op || "") === op);
    item ? item.cant++ : carrito.push({ id, op, cant: 1 });
    pintar();
  }
  function cambiar(clave, delta) {
    const item = carrito.find((c) => llave(c) === clave);
    if (!item) return;
    item.cant += delta;
    if (item.cant <= 0) carrito = carrito.filter((c) => c !== item);
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
      const k = esc(llave(c));
      return `<li class="linea">
        <span class="linea__img tono-${esc(p.tono)}">${esc(p.emoji)}</span>
        <div class="linea__info">
          <strong>${esc(p.nombre)}</strong>
          ${c.op ? `<span>Opción: ${esc(c.op)}</span>` : ""}
          <span>${dinero(p.precio)}</span>
          <div class="cantidad">
            <button data-menos="${k}" aria-label="Quitar una unidad de ${esc(p.nombre)}">−</button>
            <output>${c.cant}</output>
            <button data-mas="${k}" aria-label="Agregar una unidad de ${esc(p.nombre)}">+</button>
          </div>
        </div>
        <span class="linea__sub">${dinero(p.precio * c.cant)}</span>
      </li>`;
    }).join("");
    $("#total").textContent = dinero(total());

    // Aviso de envío gratis
    const envio = $("#envio");
    if (envio) {
      const meta = Number(TIENDA.envioGratisDesde) || 0;
      envio.hidden = meta <= 0;
      if (meta > 0) {
        const falta = meta - total();
        envio.textContent = falta > 0 ? `Te faltan ${dinero(falta)} para el envío gratis` : "¡Tu envío es gratis! 🎉";
      }
    }
  }

  /* ---------- Mensaje de WhatsApp ---------- */
  function enviarPedido(e) {
    e.preventDefault();
    if (!carrito.length) return;
    const nombre = $("#nombre").value.trim();
    const direccion = $("#direccion").value.trim();
    const notas = $("#notas").value.trim();
    const meta = Number(TIENDA.envioGratisDesde) || 0;

    const lineas = carrito.map((c) => {
      const p = buscar(c.id);
      return `• ${c.cant} x ${p.nombre}${c.op ? ` (${c.op})` : ""} - ${dinero(p.precio * c.cant)}`;
    });
    const mensaje = [
      `Hola ${TIENDA.nombre}, quiero hacer este pedido:`,
      "",
      ...lineas,
      "",
      `Total productos: ${dinero(total())}`,
      meta > 0 && total() >= meta ? "Envío: gratis" : "Envío: confírmame el valor por este chat",
      "",
      `Nombre: ${nombre}`,
      `Ciudad y dirección: ${direccion}`,
      notas ? `Notas: ${notas}` : null
    ].filter((l) => l !== null).join("\n");

    // Estadísticas (solo si activaste Analytics o el píxel de Meta)
    if (window.gtag) window.gtag("event", "begin_checkout", { currency: "COP", value: total() });
    if (window.fbq) window.fbq("track", "InitiateCheckout", { currency: "COP", value: total() });

    window.open(`https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.agregar) {
      const select = b.closest(".producto").querySelector(".producto__op");
      agregar(b.dataset.agregar, select ? select.value : "");
      b.textContent = "Agregado";
      setTimeout(() => (b.textContent = "Agregar"), 1200);
    }
    if (b.dataset.mas) cambiar(b.dataset.mas, 1);
    if (b.dataset.menos) cambiar(b.dataset.menos, -1);
  });
  $("#abrir-carrito").addEventListener("click", abrir);
  $("#cerrar").addEventListener("click", cerrar);
  $("#seguir").addEventListener("click", () => { cerrar(); });
  overlay.addEventListener("click", cerrar);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });
  $("#pedido").addEventListener("submit", enviarPedido);

  pintar();
});
