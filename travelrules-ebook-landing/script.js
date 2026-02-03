(() => {
  const gumroadUrl = document.body.dataset.gumroadUrl || "https://gumroad.com/l/REPLACE_ME";

  // Wire all Buy buttons
  const buyIds = ["headerBuy", "mobileBuy", "heroBuy", "systemBuy", "finalBuy"];
  buyIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = gumroadUrl;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      drawer.hidden = expanded;
    });
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        drawer.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCaption");

  function openLightbox(src, caption) {
    if (!lb || !lbImg || !lbCap) return;
    lbImg.src = src;
    lbImg.alt = caption || "Preview image";
    lbCap.textContent = caption || "";
    lb.hidden = false;
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lb || !lbImg) return;
    lb.hidden = true;
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  // Click handlers
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lightbox]");
    if (btn) {
      const src = btn.getAttribute("data-lightbox");
      const caption = btn.getAttribute("data-caption") || "";
      openLightbox(src, caption);
      return;
    }

    if (e.target.closest("[data-close]")) {
      closeLightbox();
    }
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb && !lb.hidden) closeLightbox();
  });

  
  // Protect bonus images (best-effort: disable lightbox, right-click, and dragging)
  document.querySelectorAll(".protected-media").forEach((el) => {
    el.addEventListener("contextmenu", (e) => e.preventDefault());
    el.addEventListener("dragstart", (e) => e.preventDefault());
    el.addEventListener("mousedown", (e) => e.preventDefault());
  });

  // Guard: if Gumroad URL is not replaced, show console hint
  if (gumroadUrl.includes("REPLACE_ME")) {
    console.warn("[Travel Rules landing] Replace data-gumroad-url on <body> with your Gumroad product link.");
  }
})(); 
