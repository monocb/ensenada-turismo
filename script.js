const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
const lightboxPrev = lightbox?.querySelector("[data-lightbox-prev]");
const lightboxNext = lightbox?.querySelector("[data-lightbox-next]");
const lightboxDownload = lightbox?.querySelector("[data-lightbox-download]");
const placeCards = document.querySelectorAll(".place-card");
const placeTriggers = document.querySelectorAll("[data-place-open]");
const placeGalleryImages = document.querySelectorAll(".place-photo-grid img");
const placeModal = document.querySelector("[data-place-modal]");
const placeModalPanel = document.querySelector(".place-modal__panel");
const placeModalImage = document.querySelector("[data-place-modal-image]");
const placeModalNumber = document.querySelector("[data-place-modal-number]");
const placeModalTitle = document.querySelector("[data-place-modal-title]");
const placeModalKicker = document.querySelector("[data-place-modal-kicker]");
const placeModalReview = document.querySelector("[data-place-modal-review]");
const placeModalCloseButtons = document.querySelectorAll("[data-place-modal-close]");
const photoExhibitImages = document.querySelectorAll(".photo-story-card img");
const photoReelSections = document.querySelectorAll("[data-photo-reel-section]");
const pageHero = document.querySelector(".hero, .photos-page-hero");
const revealTargets = document.querySelectorAll(
  ".brand-line, .intro-gallery > *, .photo-category, .photo-story-card, .photos-reel-section, .place-card, .heritage-copy, .video-panel"
);
const motionPhotos = document.querySelectorAll(
  ".hero-image, .brand-line img, .intro-gallery img, .photo-exhibit-hero img, .photo-story-card img, .photos-page-hero img, .place-media img, .place-photo-grid img"
);
let activeLightboxImages = [];
let activeLightboxIndex = 0;
let tickingDepth = false;
let lastHeaderScrollY = window.scrollY;
let lastPlaceTrigger = null;
let lastLightboxTrigger = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function refreshHeader() {
  const currentScrollY = window.scrollY;
  const headerHeight = header?.offsetHeight || 0;
  const headerExitPoint = pageHero
    ? Math.max(260, pageHero.offsetTop + pageHero.offsetHeight - headerHeight - 20)
    : 420;
  const scrollingDown = currentScrollY > lastHeaderScrollY + 5;
  const scrollingUp = currentScrollY < lastHeaderScrollY - 5;

  header?.classList.toggle("is-scrolled", currentScrollY > 24);

  if (header) {
    const menuIsOpen = header.classList.contains("is-open");

    if (menuIsOpen || currentScrollY <= headerExitPoint || scrollingUp) {
      header.classList.remove("is-hidden");
    } else if (scrollingDown && currentScrollY > headerExitPoint) {
      header.classList.add("is-hidden");
    }
  }

  lastHeaderScrollY = currentScrollY;
}

function setupNarrativeReveal() {
  revealTargets.forEach((target, index) => {
    target.classList.add("reveal-on-scroll");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
  });

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function updatePhotoDepth() {
  tickingDepth = false;
  if (reduceMotion) return;

  const viewportHeight = window.innerHeight || 1;

  motionPhotos.forEach((photo) => {
    const rect = photo.getBoundingClientRect();
    if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

    const center = rect.top + rect.height / 2;
    const progress = (center - viewportHeight / 2) / viewportHeight;
    const shift = Math.max(-18, Math.min(18, progress * -22));
    photo.style.setProperty("--depth-shift", `${shift.toFixed(2)}px`);
  });
}

function requestPhotoDepth() {
  if (tickingDepth || reduceMotion) return;
  tickingDepth = true;
  window.requestAnimationFrame(updatePhotoDepth);
}

function prepareMediaForPublicView() {
  document.querySelectorAll("img").forEach((image) => {
    if (!image.closest(".hero-gallery") && !image.hasAttribute("loading")) {
      image.loading = "lazy";
    }
    if (!image.hasAttribute("decoding")) {
      image.decoding = "async";
    }
  });
}

function setMenuOpen(isOpen) {
  if (!menu || !header || !menuButton) return;
  menu.classList.toggle("is-open", isOpen);
  header.classList.toggle("is-open", isOpen);
  if (isOpen) header.classList.remove("is-hidden");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(!menu?.classList.contains("is-open"));
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

function humanizeSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function setupPhotoReelSection(section) {
  const photoReel = section.querySelector("[data-photo-reel]");
  const folder = section.dataset.photoFolder;
  const prefix = section.dataset.photoPrefix;
  const count = Number(section.dataset.photoCount || 0);
  const title = section.dataset.photoTitle || "";
  const location = section.dataset.photoLocation || "";

  if (!photoReel || !folder || !prefix || !count) return;

  if (!photoReel.children.length) {
    for (let index = 1; index <= count; index += 1) {
      const number = String(index).padStart(2, "0");
      const button = document.createElement("button");
      const image = document.createElement("img");

      button.className = "photos-reel-card";
      button.type = "button";
      button.setAttribute(
        "aria-label",
        title ? `Ampliar foto ${number} de ${title}` : `Ampliar foto ${number}`
      );

      image.loading = "lazy";
      const photoBase = `/assets/en-fotos/${folder}/${prefix}-${number}`;
      image.src = `${photoBase}.webp`;
      image.srcset = `${photoBase}-480w.webp 480w, ${photoBase}-900w.webp 900w`;
      image.sizes = "260px";
      image.dataset.lightboxSrc = `${photoBase}.webp`;
      const altBase = title || humanizeSlug(prefix || folder);
      const includesLocation = location && altBase.toLowerCase().includes(location.toLowerCase());
      image.alt = location && !includesLocation
        ? `${altBase} en ${location}, foto ${number}`
        : `${altBase}, foto ${number}`;

      button.appendChild(image);
      photoReel.appendChild(button);
    }
  }

  const movePhotoReel = (direction) => {
    const firstSlide = photoReel.querySelector(":scope > *");
    const gap = parseFloat(window.getComputedStyle(photoReel).columnGap) || 0;
    const distance = firstSlide
      ? firstSlide.getBoundingClientRect().width + gap
      : photoReel.clientWidth * 0.86;
    photoReel.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  section.querySelector("[data-photo-reel-prev]")?.addEventListener("click", () => movePhotoReel(-1));
  section.querySelector("[data-photo-reel-next]")?.addEventListener("click", () => movePhotoReel(1));

  section.querySelectorAll(".photos-reel-card").forEach((card) => {
    const image = card.querySelector("img");
    card.addEventListener("click", () => {
      if (!image) return;
      const gallery = photoReel.querySelectorAll(".photos-reel-card img");
      openLightbox(image, gallery);
    });
  });
}

photoReelSections.forEach(setupPhotoReelSection);


function scrollToElement(element) {
  if (!element) return;
  const headerOffset = header?.offsetHeight || 0;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset - 18;
  window.scrollTo({ top, behavior: "smooth" });
}


function renderLightboxImage() {
  if (!lightbox || !lightboxImage) return;
  const image = activeLightboxImages[activeLightboxIndex];
  if (!image) return;
  const downloadSrc = image.dataset.download || "";

  lightboxImage.src = image.dataset.lightboxSrc || image.dataset.download || image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Imagen ampliada";
  if (lightboxDownload) {
    if (downloadSrc) {
      lightboxDownload.href = downloadSrc;
      lightboxDownload.hidden = false;
    } else {
      lightboxDownload.removeAttribute("href");
      lightboxDownload.hidden = true;
    }
  }
}

function getLightboxFocusable() {
  if (!lightbox) return [];
  return Array.from(
    lightbox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
}

function openLightbox(image, galleryImages = [image], trigger = null) {
  if (!lightbox || !lightboxImage) return;
  lastLightboxTrigger = trigger || document.activeElement;
  activeLightboxImages = Array.from(galleryImages);
  activeLightboxIndex = Math.max(0, activeLightboxImages.indexOf(image));
  renderLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.inert = false;
  document.body.classList.add("has-lightbox");
  window.requestAnimationFrame(() => {
    const focusable = getLightboxFocusable();
    (focusable[0] || lightboxClose)?.focus();
  });
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.inert = true;
  document.body.classList.remove("has-lightbox");
  lightboxImage.src = "";
  activeLightboxImages = [];
  activeLightboxIndex = 0;
  if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === "function") {
    lastLightboxTrigger.focus();
  }
  lastLightboxTrigger = null;
}

function trapLightboxFocus(event) {
  if (!lightbox?.classList.contains("is-open") || event.key !== "Tab") return;
  const focusable = getLightboxFocusable();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function moveLightbox(direction) {
  if (!activeLightboxImages.length) return;
  activeLightboxIndex =
    (activeLightboxIndex + direction + activeLightboxImages.length) % activeLightboxImages.length;
  renderLightboxImage();
}

function getPlaceModalFocusable() {
  if (!placeModal) return [];
  return Array.from(
    placeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);
}

function openPlaceModal(card, trigger = null) {
  if (!placeModal || !card) return;
  lastPlaceTrigger = trigger || document.activeElement;

  const accent = window.getComputedStyle(card).getPropertyValue("--place-color").trim();
  placeModal.style.setProperty("--place-modal-color", accent || "var(--gold)");
  placeModal.dataset.place = card.dataset.place || "";

  if (placeModalNumber) placeModalNumber.textContent = card.dataset.placeNumber || "";
  if (placeModalTitle) placeModalTitle.textContent = card.dataset.placeTitle || "";
  if (placeModalKicker) placeModalKicker.textContent = card.dataset.placeKicker || "";
  if (placeModalReview) placeModalReview.textContent = card.dataset.placeReview || "";
  if (placeModalImage) {
    placeModalImage.src = card.dataset.placeImage || "";
    placeModalImage.alt = card.dataset.placeTitle
      ? `Imagen de ${card.dataset.placeTitle}`
      : "Imagen de Ensenada";
  }

  placeModal.classList.add("is-open");
  placeModal.setAttribute("aria-hidden", "false");
  placeModal.inert = false;
  document.body.classList.add("has-place-modal", "modal-open");
  document.documentElement.classList.add("has-place-modal");
  window.requestAnimationFrame(() => {
    const focusable = getPlaceModalFocusable();
    (focusable[0] || placeModalPanel)?.focus();
  });
}

function closePlaceModal() {
  if (!placeModal?.classList.contains("is-open")) return;
  placeModal.classList.remove("is-open");
  placeModal.setAttribute("aria-hidden", "true");
  placeModal.inert = true;
  document.body.classList.remove("has-place-modal", "modal-open");
  document.documentElement.classList.remove("has-place-modal");
  if (placeModalImage) {
    placeModalImage.src = "";
  }
  if (lastPlaceTrigger && typeof lastPlaceTrigger.focus === "function") {
    lastPlaceTrigger.focus();
  }
  lastPlaceTrigger = null;
}

function trapPlaceModalFocus(event) {
  if (!placeModal?.classList.contains("is-open") || event.key !== "Tab") return;
  const focusable = getPlaceModalFocusable();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}



placeGalleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    const gallery = image.closest(".place-photo-grid")?.querySelectorAll("img") || [image];
    openLightbox(image, gallery);
  });
});

photoExhibitImages.forEach((image) => {
  image.addEventListener("click", () => {
    const gallery = image.closest(".photo-category")?.querySelectorAll(".photo-story-card img") || [image];
    openLightbox(image, gallery);
  });
});

document.querySelectorAll(".fragata-hero-slide").forEach((image) => {
  image.addEventListener("click", () => {
    const gallery = image.closest(".fragata-gallery")?.querySelectorAll(".fragata-hero-slide") || [image];
    openLightbox(image, gallery);
  });
  image.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    const gallery = image.closest(".fragata-gallery")?.querySelectorAll(".fragata-hero-slide") || [image];
    openLightbox(image, gallery);
  });
});

/* LUNA-TARUMA:INICIO / bloque temporal del evento Luna Tarumá. Publicado 2026-09-18,
   baja prevista despues del 26/09/2026.
   Procedimiento de baja: docs/pendientes/baja-bloque-luna-taruma.md
   Si el HTML del bloque ya no esta, querySelectorAll devuelve vacio y esto no hace nada. */
document.querySelectorAll(".luna-taruma [data-lt-image]").forEach((image) => {
  const abrir = () => {
    const gallery = image.closest(".luna-taruma")?.querySelectorAll("[data-lt-image]") || [image];
    openLightbox(image, gallery, image);
  };
  image.addEventListener("click", abrir);
  image.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    abrir();
  });
});
/* Juego "Florece el Tarumá". Todo va dentro de un IIFE: script.js es alcance global de
   punta a punta y el juego define nombres muy genericos ($, Q, i, score, end, show, pick).
   El guard de arranque hace que retirar el markup alcance para desactivarlo, sin errores. */
(() => {
  const raiz = document.querySelector(".ltg");
  if (!raiz) return;

  const $ = (id) => document.getElementById(id);

  const PREGUNTAS = [
    { q: "¿Qué es el Tarumá?", o: ["Un árbol autóctono de la Selva Marginal", "Una playa de Punta Lara", "Una constelación de primavera", "Un pez del Río de la Plata"], a: 0, f: "<b>Es un árbol.</b> Autóctono, ensenadense, y cada primavera florece con flores amarillas y perfumadas a la orilla del río." },
    { q: "¿Por qué el evento se llama Luna Tarumá?", o: ["Por una leyenda guaraní", "Porque la primera Luna llena de la primavera coincide con la floración del Tarumá", "Por el nombre de un barco hundido", "Porque así se llama el parador"], a: 1, f: "<b>Un encuentro.</b> El Tarumá florece y la primera Luna llena de la primavera se posa sobre nuestro río: a eso le pusimos nombre." },
    { q: "¿Qué tiene de especial la Selva Marginal de Punta Lara?", o: ["Es la más grande de la provincia", "Fue plantada en 1950", "Es el bosque subtropical más austral de la Argentina", "Tiene el árbol más alto del país"], a: 2, f: "<b>La selva que no debería estar aquí.</b> Es el bosque subtropical más austral del país, y está en Ensenada." },
    { q: "¿Quién sembró la Selva Marginal?", o: ["Los primeros pobladores", "Un vivero municipal", "La Universidad", "Nadie: la trajo el río, semilla a semilla"], a: 3, f: "<b>Nadie.</b> Las semillas bajaron flotando desde el norte por el Paraná y el Río de la Plata y prendieron en la costa." },
    { q: "¿Cómo va a estar la Luna el sábado 19 de septiembre?", o: ["Nueva", "En cuarto creciente", "Llena", "En cuarto menguante"], a: 1, f: "<b>Creciente.</b> La primera noche es la de la Luna que crece, mientras el Tarumá empieza a florecer." },
    { q: "¿Y el sábado 26?", o: ["Llena, la primera de la primavera", "Nueva", "En eclipse", "No sale ese día"], a: 0, f: "<b>Llena.</b> La segunda noche es la noche de Luna Tarumá: la primera Luna llena de la primavera sobre el río." },
    { q: "¿Dónde es Luna Tarumá?", o: ["En el Fuerte Barragán", "En la Isla Santiago", "En el Paseo Costero de Punta Lara, Parador 5C", "En la plaza central de Ensenada"], a: 2, f: "<b>Parador 5C.</b> Paseo Costero de Punta Lara, en Alte. Brown y 52, frente al río." },
    { q: "¿Qué hay la noche del 26 además de la observación?", o: ["Pintura en vivo", "Tango, folclore y danza", "Sabores de la costa", "Todo eso"], a: 3, f: "<b>Todo eso.</b> Telescopios, pintura en vivo, tango, folclore, danza, música y sabores de la costa. Elegancia frente a la Luna." },
    { q: "¿Con qué se observa la Luna en el evento?", o: ["Con telescopios, guiados por astrónomos", "Solo a simple vista", "Con binoculares que hay que traer", "Con una pantalla gigante"], a: 0, f: "<b>Telescopios.</b> Con la Facultad de Ciencias Astronómicas y Geofísicas de la UNLP, que organiza junto a Turismo Ensenada y Nexa Contenidos." },
    { q: "¿Cuánto cuesta la entrada?", o: ["Una entrada general", "Un bono contribución", "Nada: es libre y gratuito", "Depende de la noche"], a: 2, f: "<b>Libre y gratuito.</b> Las dos noches. Vení a vivir Luna Tarumá." },
  ];

  /* Donde se abre cada flor sobre la copa del arbol, en coordenadas del viewBox. */
  const POSICIONES = [[52, 100], [84, 116], [120, 54], [146, 66], [196, 80], [222, 96], [40, 166], [60, 180], [214, 150], [236, 164]];

  const NIVELES = [
    { min: 10, titulo: "Luna Tarumá", texto: "Floreciste entero: sos de acá, o merecés serlo. Te esperamos las dos noches." },
    { min: 7, titulo: "En flor", texto: "Casi todo el árbol abierto. La Luna llena del 26 te va a encontrar preparado." },
    { min: 4, titulo: "Brote", texto: "Ya empezaste a florecer. Lo que falta se aprende mirando el cielo el 19." },
    { min: 0, titulo: "Semilla", texto: "Todavía bajo tierra, como la selva antes de que el río la trajera. Vení y florecé con nosotros." },
  ];

  const SVG_NS = "http://www.w3.org/2000/svg";
  let indice = 0;
  let aciertos = 0;
  let respondida = false;

  /* Cielo estrellado con random sembrado: la escena se ve igual en cada visita. */
  const estrellas = $("ltg-stars");
  let semilla = 7;
  const azar = () => {
    semilla = (semilla * 9301 + 49297) % 233280;
    return semilla / 233280;
  };
  for (let k = 0; k < 70; k += 1) {
    const c = document.createElementNS(SVG_NS, "circle");
    c.setAttribute("cx", azar() * 500);
    c.setAttribute("cy", azar() * 240);
    c.setAttribute("r", (azar() * 1.4 + 0.4).toFixed(2));
    c.setAttribute("fill", "#F5F3EC");
    c.setAttribute("opacity", (azar() * 0.6 + 0.25).toFixed(2));
    estrellas.appendChild(c);
  }

  /* n flores: la Luna sube y su sombra se corre hasta salir del disco (llena en 10). */
  function luna(n) {
    $("ltg-moonG").setAttribute("transform", `translate(${390 - n * 4},${300 - n * 17})`);
    $("ltg-moonShadow").setAttribute("cx", 12 + n * 6.5);
    $("ltg-reflect").setAttribute("opacity", 0.2 + n * 0.06);
  }

  function flor(n) {
    const [x, y] = POSICIONES[n];
    const g = document.createElementNS(SVG_NS, "g");
    const petalos = [0, 72, 144, 216, 288]
      .map((a) => `<ellipse rx="2.6" ry="5" cy="-4.5" fill="#F2C14E" transform="rotate(${a})"/>`)
      .join("");
    g.innerHTML = `<circle r="9" fill="#F2C14E" opacity=".35"/>${petalos}<circle r="2" fill="#D65A3C"/>`;
    $("ltg-flowers").appendChild(g);

    if (reduceMotion) {
      g.setAttribute("transform", `translate(${x},${y}) scale(1)`);
      return;
    }
    g.setAttribute("transform", `translate(${x},${y}) scale(0)`);
    g.style.transition = "transform .5s cubic-bezier(.34,1.56,.64,1)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        g.setAttribute("transform", `translate(${x},${y}) scale(1)`);
      });
    });
  }

  function mostrarPregunta() {
    respondida = false;
    const actual = PREGUNTAS[indice];
    $("ltg-qn").textContent = `Pregunta ${indice + 1} de ${PREGUNTAS.length}`;
    $("ltg-q").textContent = actual.q;
    $("ltg-prog").style.width = `${(indice / PREGUNTAS.length) * 100}%`;
    $("ltg-fact").hidden = true;
    $("ltg-next").hidden = true;

    const contenedor = $("ltg-opts");
    contenedor.innerHTML = "";
    actual.o.forEach((texto, k) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "ltg-opt";
      boton.innerHTML = `<i aria-hidden="true">${"ABCD"[k]}</i><span></span>`;
      boton.querySelector("span").textContent = texto;
      boton.addEventListener("click", () => responder(k, boton));
      contenedor.appendChild(boton);
    });
  }

  function responder(elegida, boton) {
    if (respondida) return;
    respondida = true;

    const actual = PREGUNTAS[indice];
    const botones = [...$("ltg-opts").children];
    botones.forEach((b) => {
      b.disabled = true;
    });

    if (elegida === actual.a) {
      boton.classList.add("is-ok");
      aciertos += 1;
      $("ltg-score").textContent = aciertos;
      flor(aciertos - 1);
      luna(aciertos);
    } else {
      boton.classList.add("is-bad");
      botones[actual.a].classList.add("is-ok");
      botones.forEach((b, j) => {
        if (j !== elegida && j !== actual.a) b.classList.add("is-dim");
      });
    }

    $("ltg-fact").innerHTML = actual.f;
    $("ltg-fact").hidden = false;
    $("ltg-next").hidden = false;
    $("ltg-next").textContent = indice === PREGUNTAS.length - 1 ? "Ver resultado" : "Siguiente";
    /* preventScroll: el foco va al boton para seguir con el teclado, pero sin que el
       navegador mueva la pagina por su cuenta. El boton aparece pegado a las opciones
       que la persona acaba de tocar, asi que ya esta a la vista. */
    $("ltg-next").focus({ preventScroll: true });
  }

  function mostrarResultado() {
    $("ltg-game").hidden = true;
    $("ltg-end").hidden = false;
    $("ltg-prog").style.width = "100%";
    const nivel = NIVELES.find((n) => aciertos >= n.min);
    $("ltg-title").textContent = nivel.titulo;
    $("ltg-sub").textContent = `${aciertos} de ${PREGUNTAS.length} flores. ${nivel.texto}`;
  }

  /* El juego no scrollea la pagina en ningun momento: las tres tarjetas (intro,
     pregunta y resultado) ocupan el mismo lugar, asi que la siguiente aparece donde
     estaba la anterior y mover la vista solo lograba sacar la escena de pantalla. */

  $("ltg-start").addEventListener("click", () => {
    $("ltg-intro").hidden = true;
    $("ltg-game").hidden = false;
    mostrarPregunta();
  });

  $("ltg-next").addEventListener("click", () => {
    indice += 1;
    if (indice < PREGUNTAS.length) {
      mostrarPregunta();
      return;
    }
    mostrarResultado();
  });

  $("ltg-again").addEventListener("click", () => {
    indice = 0;
    aciertos = 0;
    $("ltg-score").textContent = "0";
    $("ltg-flowers").innerHTML = "";
    luna(0);
    $("ltg-end").hidden = true;
    $("ltg-game").hidden = false;
    mostrarPregunta();
  });

  $("ltg-share").addEventListener("click", async () => {
    const texto = `Florecí ${aciertos}/${PREGUNTAS.length} en "Florecé el Tarumá" 🌕 Luna Tarumá, 19 y 26 de septiembre en Punta Lara. Jugá vos: ensenadaturismo.com/#luna-taruma`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Florecé el Tarumá", text: texto });
        return;
      }
      await navigator.clipboard.writeText(texto);
      $("ltg-share").textContent = "Copiado";
    } catch (e) {
      /* la persona cancelo el compartir, o el navegador nego el portapapeles */
    }
  });

  luna(0);
})();
/* LUNA-TARUMA:FIN */

const fragataSlidesForPointerEvents = document.querySelectorAll(".fragata-gallery .fragata-hero-slide");
if (fragataSlidesForPointerEvents.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const FRAGATA_CYCLE_MS = 48000;
  const fragataStart = performance.now();
  const updateFragataPointerEvents = () => {
    const elapsed = performance.now() - fragataStart;
    fragataSlidesForPointerEvents.forEach((slide, index) => {
      const delay = index * 6000;
      const local = ((elapsed - delay) % FRAGATA_CYCLE_MS + FRAGATA_CYCLE_MS) % FRAGATA_CYCLE_MS;
      const pct = (local / FRAGATA_CYCLE_MS) * 100;
      slide.style.pointerEvents = pct >= 4 && pct <= 14 ? "auto" : "none";
    });
  };
  updateFragataPointerEvents();
  setInterval(updateFragataPointerEvents, 250);
}

placeTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const card = trigger.closest(".place-card");
    openPlaceModal(card, trigger);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => moveLightbox(-1));
lightboxNext?.addEventListener("click", () => moveLightbox(1));
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});
lightbox?.addEventListener("keydown", trapLightboxFocus);

placeModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closePlaceModal);
});
placeModal?.addEventListener("click", (event) => {
  if (event.target === placeModal || event.target.hasAttribute("data-place-modal-close")) {
    closePlaceModal();
  }
});
placeModal?.addEventListener("keydown", trapPlaceModalFocus);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closePlaceModal();
    if (menu?.classList.contains("is-open")) {
      setMenuOpen(false);
      menuButton?.focus();
    }
  }
  if (lightbox?.classList.contains("is-open") && event.key === "ArrowLeft") {
    moveLightbox(-1);
  }
  if (lightbox?.classList.contains("is-open") && event.key === "ArrowRight") {
    moveLightbox(1);
  }
});

window.addEventListener(
  "scroll",
  () => {
    refreshHeader();
    requestPhotoDepth();
  },
  { passive: true }
);
window.addEventListener("load", () => {
  refreshHeader();
  prepareMediaForPublicView();
  setupNarrativeReveal();
  updatePhotoDepth();
});

  document.querySelectorAll("[data-youtube-lite]").forEach((lite) => {
    const button = lite.querySelector("button");
    button?.addEventListener("click", () => {
      const videoId = lite.dataset.videoId;
      if (!videoId) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = button.getAttribute("aria-label") || "Video de Turismo Ensenada";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      lite.replaceChildren(iframe);
      iframe.focus();
    });
  });
