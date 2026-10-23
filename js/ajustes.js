/* ⚠️ NO NECESITAS EDITAR ESTE ARCHIVO. Aplica en todas las páginas los datos de productos.js:
   botón flotante de WhatsApp, correo e Instagram del pie, aviso de envío gratis,
   suscripción por correo y estadísticas (Analytics / píxel de Meta). */
(() => {
  const dinero = (n) => "$" + Number(n).toLocaleString("es-CO");

  /* ---------- Botón flotante de WhatsApp ---------- */
  const mensaje = `Hola ${TIENDA.nombre}, tengo una pregunta sobre sus productos.`;
  const a = document.createElement("a");
  a.className = "wa-flotante";
  a.href = `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Escríbenos por WhatsApp");
  a.innerHTML = `
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41"/>
    </svg>
    <span>¿Te ayudamos?</span>`;
  document.body.appendChild(a);

  /* ---------- Pie de página: correo, WhatsApp e Instagram ---------- */
  document.querySelectorAll("[data-correo]").forEach((el) => {
    el.href = `mailto:${TIENDA.correo}`;
    if (!el.hasAttribute("data-solo-enlace")) el.textContent = TIENDA.correo;
  });
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = `https://wa.me/${TIENDA.whatsapp}`;
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-instagram]").forEach((el) => {
    if (TIENDA.instagram) {
      el.href = TIENDA.instagram;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.hidden = true;
    }
  });
  // Textos que mencionan datos de la tienda
  document.querySelectorAll("[data-tienda-nombre]").forEach((el) => { el.textContent = TIENDA.nombre; });
  document.querySelectorAll("[data-envio-monto]").forEach((el) => { el.textContent = dinero(TIENDA.envioGratisDesde); });

  /* ---------- Barra superior: envío gratis ---------- */
  document.querySelectorAll("[data-aviso]").forEach((el) => {
    if (Number(TIENDA.envioGratisDesde) > 0) {
      el.textContent = `Envío gratis en compras desde ${dinero(TIENDA.envioGratisDesde)}`;
    } else {
      el.hidden = true;
    }
  });
  document.querySelectorAll("[data-si-envio-gratis]").forEach((el) => {
    if (!(Number(TIENDA.envioGratisDesde) > 0)) el.hidden = true;
  });

  /* ---------- Suscripción por correo ---------- */
  const seccion = document.querySelector(".boletin");
  const form = document.querySelector("#boletin-form");
  if (seccion && !TIENDA.boletin) {
    seccion.hidden = true; // sin servicio configurado no se muestra, para no prometer lo que no existe
  } else if (form) {
    const estado = document.querySelector("#boletin-estado");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const correo = form.querySelector("input[type=email]").value.trim();
      estado.textContent = "Enviando…";
      try {
        const r = await fetch(TIENDA.boletin, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ email: correo })
        });
        if (!r.ok) throw new Error("HTTP " + r.status);
        estado.textContent = "¡Listo! Ya estás suscrito.";
        form.reset();
        if (window.gtag) window.gtag("event", "generate_lead");
        if (window.fbq) window.fbq("track", "Lead");
      } catch (err) {
        estado.textContent = "No pudimos guardar tu correo. Inténtalo de nuevo o escríbenos por WhatsApp.";
      }
    });
  }

  /* ---------- Estadísticas (solo si pones los IDs en productos.js) ---------- */
  if (TIENDA.analytics) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(TIENDA.analytics);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", TIENDA.analytics);
  }
  if (TIENDA.pixelMeta) {
    const fbq = (window.fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); });
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = [];
    const p = document.createElement("script");
    p.async = true;
    p.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(p);
    fbq("init", TIENDA.pixelMeta);
    fbq("track", "PageView");
  }
})();
