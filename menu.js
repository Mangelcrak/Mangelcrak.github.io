/* Menú hamburguesa para celular */
(() => {
  const btn = document.querySelector("#menu-btn");
  const menu = document.querySelector("#menu");
  if (!btn || !menu) return;

  const abierto = () => btn.getAttribute("aria-expanded") === "true";
  const poner = (valor) => {
    menu.classList.toggle("abierto", valor);
    btn.setAttribute("aria-expanded", String(valor));
    btn.setAttribute("aria-label", valor ? "Cerrar menú" : "Abrir menú");
  };

  btn.addEventListener("click", () => poner(!abierto()));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) poner(false); });
  document.addEventListener("click", (e) => {
    if (abierto() && !menu.contains(e.target) && !btn.contains(e.target)) poner(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && abierto()) { poner(false); btn.focus(); }
  });
  // Al pasar a pantalla grande, el menú vuelve a su estado normal
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) poner(false); });
  document.querySelector("#abrir-carrito")?.addEventListener("click", () => poner(false));
})();
