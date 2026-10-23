/* Filtros, búsqueda y orden del catálogo */
(() => {
  const $ = (s) => document.querySelector(s);
  const limpio = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const params = new URLSearchParams(location.search);
  const estado = {
    cat: CATEGORIAS.some((c) => c.id === params.get("cat")) ? params.get("cat") : "todas",
    q: params.get("q") || "",
    orden: "relevancia"
  };

  const nombreCat = (id) => (CATEGORIAS.find((c) => c.id === id) || {}).nombre || "";

  function pintarChips() {
    const opciones = [{ id: "todas", nombre: "Todas", tono: "cielo" }, ...CATEGORIAS];
    $("#chips").innerHTML = opciones.map((c) => {
      const n = c.id === "todas" ? PRODUCTOS.length : PRODUCTOS.filter((p) => p.categoria === c.id).length;
      return `<button class="chip tono-${c.tono}" data-cat="${c.id}" aria-pressed="${estado.cat === c.id}">${c.nombre} <span>${n}</span></button>`;
    }).join("");
  }

  function filtrar() {
    const q = limpio(estado.q.trim());
    let lista = PRODUCTOS.filter((p) => {
      const enCat = estado.cat === "todas" || p.categoria === estado.cat;
      const texto = limpio(`${p.nombre} ${p.desc} ${nombreCat(p.categoria)}`);
      return enCat && (!q || q.split(/\s+/).every((w) => texto.includes(w)));
    });
    if (estado.orden === "menor") lista.sort((a, b) => a.precio - b.precio);
    if (estado.orden === "mayor") lista.sort((a, b) => b.precio - a.precio);
    if (estado.orden === "nombre") lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    return lista;
  }

  function actualizar() {
    const lista = filtrar();
    document.title = estado.cat === "todas" ? "Catálogo · Nube" : `${nombreCat(estado.cat)} · Catálogo · Nube`;
    pintarProductos(lista);
    pintarChips();
    $("#sin-resultados").hidden = lista.length > 0;
    $("#productos").hidden = lista.length === 0;
    $("#resultado").textContent = lista.length
      ? `${lista.length} producto${lista.length === 1 ? "" : "s"}`
      : "";

    // Mantiene la URL compartible (?cat=hogar&q=vela)
    try {
      const p = new URLSearchParams();
      if (estado.cat !== "todas") p.set("cat", estado.cat);
      if (estado.q.trim()) p.set("q", estado.q.trim());
      history.replaceState(null, "", p.toString() ? `?${p}` : location.pathname);
    } catch (e) {}
  }

  $("#chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    estado.cat = b.dataset.cat;
    actualizar();
    $(`[data-cat="${estado.cat}"]`).focus();
  });
  $("#buscar").addEventListener("input", (e) => { estado.q = e.target.value; actualizar(); });
  $("#orden").addEventListener("change", (e) => { estado.orden = e.target.value; actualizar(); });
  $("#limpiar").addEventListener("click", () => {
    estado.cat = "todas"; estado.q = ""; $("#buscar").value = "";
    actualizar();
  });

  $("#buscar").value = estado.q;
  actualizar();
})();
