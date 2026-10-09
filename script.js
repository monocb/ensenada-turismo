const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
const lightboxPrev = lightbox?.querySelector("[data-lightbox-prev]");
const lightboxNext = lightbox?.querySelector("[data-lightbox-next]");
const lightboxDownload = lightbox?.querySelector("[data-lightbox-download]");
const lightboxStatus = lightbox?.querySelector("[data-lightbox-status]");
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
// Cada elemento declara su entrada en el marcado con data-anim. Antes se
// elegia por una lista de selectores y el retardo salia de la posicion en esa
// lista, que es lo que producia el mismo gesto repetido en toda la pagina.
const revealTargets = document.querySelectorAll("[data-anim]");
// Ojo: el marcador de la seccion y el estado del documento tienen nombres
// distintos a proposito. Con el mismo, querySelector encuentra el <html>, que
// es donde el estado se escribe, y no la seccion.
const emblemaSeccion = document.querySelector("[data-emblema-seccion]");
const emblemaMarca = document.querySelector(".emblema-marca");
const emblemaSeguir = document.querySelector("[data-emblema-seguir]");
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
// Calesita de En Fotos: lenta a proposito, el carrete es para mirar.
const REEL_VELOCIDAD = 24; // pixeles por segundo
const REEL_PAUSA_MS = 4000; // cuanto se queda quieto tras un toque o una flecha

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

// El emblema de la portada se va con el scroll. El avance del cierre es la
// posicion del scroll y no un cronometro: asi la velocidad la pone quien baja,
// y el movimiento no puede quedar ni muy rapido ni muy lento.
//
// Nada de esto es necesario para que la pagina funcione: sin JavaScript la
// seccion mide una pantalla y el emblema se va scrolleando, que es el valor
// seguro. Bajar siempre tiene que llevar al contenido.
let emblemaQuieto = false;

function setupEmblema() {
  if (!emblemaSeccion || !emblemaMarca || reduceMotion) return;
  document.documentElement.dataset.emblema = "sigue";
  actualizarEmblema();
}

function actualizarEmblema() {
  if (!emblemaSeccion || !emblemaMarca) return;
  if (document.documentElement.dataset.emblema !== "sigue") return;

  const caja = emblemaSeccion.getBoundingClientRect();

  // Ya quedo atras: se deja en su estado final y se corta el calculo.
  if (caja.bottom <= 0) {
    if (!emblemaQuieto) {
      emblemaMarca.style.setProperty("opacity", "0");
      if (emblemaSeguir) emblemaSeguir.style.setProperty("opacity", "0");
      document.documentElement.style.setProperty("--emblema-logo", "1");
      emblemaQuieto = true;
    }
    return;
  }
  emblemaQuieto = false;

  const recorrido = emblemaSeccion.offsetHeight - window.innerHeight;
  const avance = recorrido > 0 ? Math.min(1, Math.max(0, -caja.top / recorrido)) : 0;

  // Crece con aceleracion: lento al principio, como algo que se viene
  // acercando. Una curva de salida haria que arranque de golpe, que es
  // justamente lo que se sentia como un salto.
  const escala = 1 + 3.4 * Math.pow(avance, 2.1);
  // Se mantiene opaco mientras se acerca y se desvanece recien al pasar:
  // desvanecerlo antes esconderia el movimiento que se quiere mostrar.
  const opacidad = avance < 0.5 ? 1 : Math.max(0, 1 - (avance - 0.5) / 0.42);

  emblemaMarca.style.setProperty("transform", `scale(${escala.toFixed(3)})`);
  emblemaMarca.style.setProperty("opacity", opacidad.toFixed(3));
  // La invitacion se apaga apenas se empieza a bajar: ya cumplio.
  if (emblemaSeguir) {
    emblemaSeguir.style.setProperty("opacity", Math.max(0, 1 - avance * 3).toFixed(3));
  }
  // El lettering del encabezado se enciende con el mismo avance: el logotipo
  // se traspasa del grande al chico en vez de verse dos veces.
  document.documentElement.style.setProperty(
    "--emblema-logo",
    Math.min(1, avance * 1.8).toFixed(3)
  );
}

setupEmblema();

function setupNarrativeReveal() {
  // El escalonado se calcula dentro del grupo de hermanos, no sobre la lista
  // global: asi una grilla de cuatro piezas escalona sus cuatro y no arrastra
  // el retardo de todo lo que vino antes en la pagina. Los contenedores que
  // agrupan hermanos envueltos en <li> lo declaran con data-anim-grupo.
  const grupos = new Map();

  revealTargets.forEach((target) => {
    const grupo = target.closest("[data-anim-grupo]") || target.parentElement;
    const hermanos = grupos.get(grupo) || [];
    hermanos.push(target);
    grupos.set(grupo, hermanos);
  });

  grupos.forEach((hermanos) => {
    hermanos.forEach((target, indice) => {
      // La clase la pone el JS a proposito: el contenido es visible por
      // defecto y la entrada solo existe si hay JavaScript.
      target.classList.add("reveal-on-scroll");
      target.style.setProperty("--reveal-delay", `${Math.min(indice, 4) * 90}ms`);
    });
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

// Todos los enlaces del encabezado, no sólo los del nav con [data-menu]: el
// encabezado partido de la home tiene dos navegaciones, y con la primera sola
// los enlaces de la derecha navegaban dejando el menu abierto y el scroll
// bloqueado. Incluye la marca, que tambien deberia cerrar.
(header ?? menu)?.querySelectorAll("a").forEach((link) => {
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

  if (!photoReel || !folder || !prefix || !count) return null;

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

  // Ancho de una tarjeta mas el hueco: la unidad con la que se mueve todo.
  const pasoDeTarjeta = () => {
    const primera = photoReel.firstElementChild;
    if (!primera) return 0;
    const gap = parseFloat(window.getComputedStyle(photoReel).columnGap) || 0;
    return primera.getBoundingClientRect().width + gap;
  };

  // La calesita no duplica tarjetas. Cuando la primera termina de salir por
  // la izquierda se manda al final y se le descuenta su ancho al scroll: el
  // salto es invisible y sigue habiendo una sola copia de cada foto, asi que
  // ni el visor ni el orden de tabulacion ven doble.
  // El avance se lleva en un acumulador propio y no en scrollLeft: el
  // navegador redondea scrollLeft a pixel entero, asi que sumarle los 0.4px
  // que tocan por cuadro no movia absolutamente nada.
  let desplazamiento = 0;

  const rotarAdelante = () => {
    let paso = pasoDeTarjeta();
    while (paso > 0 && desplazamiento >= paso) {
      photoReel.appendChild(photoReel.firstElementChild);
      desplazamiento -= paso;
      photoReel.scrollLeft = desplazamiento;
      paso = pasoDeTarjeta();
    }
  };

  // Lo mismo al reves, para que la flecha de atras tenga siempre algo a la
  // izquierda y el carrete gire para los dos lados.
  const rotarAtras = () => {
    if (!photoReel.lastElementChild) return;
    photoReel.insertBefore(photoReel.lastElementChild, photoReel.firstElementChild);
    photoReel.scrollLeft += pasoDeTarjeta();
    desplazamiento = photoReel.scrollLeft;
  };

  let punteroEncima = false;
  let focoAdentro = false;
  let quietoHasta = 0;

  const estaDetenido = () =>
    punteroEncima ||
    focoAdentro ||
    Date.now() < quietoHasta ||
    document.body.classList.contains("has-lightbox");

  const movePhotoReel = (direction) => {
    if (direction < 0 && photoReel.scrollLeft < pasoDeTarjeta()) rotarAtras();
    const distance = pasoDeTarjeta() || photoReel.clientWidth * 0.86;
    photoReel.scrollBy({ left: distance * direction, behavior: reduceMotion ? "auto" : "smooth" });
    // Al usar las flechas el carrete se queda quieto un rato, si no el
    // avance automatico pelea con el scroll suave.
    quietoHasta = Date.now() + REEL_PAUSA_MS;
  };

  section.querySelector("[data-photo-reel-prev]")?.addEventListener("click", () => movePhotoReel(-1));
  section.querySelector("[data-photo-reel-next]")?.addEventListener("click", () => movePhotoReel(1));

  photoReel.addEventListener("pointerenter", () => {
    punteroEncima = true;
  });
  photoReel.addEventListener("pointerleave", () => {
    punteroEncima = false;
  });
  // En telefono no hay hover: el dedo frena el carrete un rato para dar
  // tiempo a elegir una foto y abrirla.
  photoReel.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") quietoHasta = Date.now() + REEL_PAUSA_MS;
  });
  section.addEventListener("focusin", () => {
    focoAdentro = true;
  });
  section.addEventListener("focusout", (event) => {
    if (!section.contains(event.relatedTarget)) focoAdentro = false;
  });

  section.querySelectorAll(".photos-reel-card").forEach((card) => {
    const image = card.querySelector("img");
    card.addEventListener("click", () => {
      if (!image) return;
      const gallery = photoReel.querySelectorAll(".photos-reel-card img");
      openLightbox(image, gallery);
    });
  });

  return {
    avanzar(segundos) {
      if (estaDetenido()) {
        // Mientras esta frenado manda la posicion real, asi al retomar sigue
        // desde donde lo dejaron las flechas, el dedo o el scroll.
        desplazamiento = photoReel.scrollLeft;
        return;
      }
      // Si las fotos entran todas en pantalla no hay nada que girar.
      if (photoReel.scrollWidth <= photoReel.clientWidth + 1) return;
      // Y si el carrete no se ve, no se gasta nada en moverlo.
      const caja = photoReel.getBoundingClientRect();
      if (caja.bottom < 0 || caja.top > window.innerHeight) return;
      desplazamiento += REEL_VELOCIDAD * segundos;
      photoReel.scrollLeft = desplazamiento;
      rotarAdelante();
    },
  };
}

const carretes = Array.from(photoReelSections).map(setupPhotoReelSection).filter(Boolean);

// Un solo bucle para los tres carretes, no uno por carrete.
if (carretes.length && !reduceMotion) {
  let cuadroAnterior = 0;
  const girarCarretes = (tiempo) => {
    // El tope de 50ms evita el salton cuando la pestana vuelve del fondo.
    const segundos = cuadroAnterior ? Math.min((tiempo - cuadroAnterior) / 1000, 0.05) : 0;
    cuadroAnterior = tiempo;
    carretes.forEach((carrete) => carrete.avanzar(segundos));
    window.requestAnimationFrame(girarCarretes);
  };
  window.requestAnimationFrame(girarCarretes);
}


function scrollToElement(element) {
  if (!element) return;
  const headerOffset = header?.offsetHeight || 0;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset - 18;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}


function renderLightboxImage() {
  if (!lightbox || !lightboxImage) return;
  const image = activeLightboxImages[activeLightboxIndex];
  if (!image) return;
  const downloadSrc = image.dataset.download || "";

  lightboxImage.src = image.dataset.lightboxSrc || image.dataset.download || image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Imagen ampliada";
  /* Al navegar con las flechas cambia la foto sin recargar: sin esto, un lector de
     pantalla no se entera de que el contenido del dialogo cambio. */
  if (lightboxStatus) {
    const total = activeLightboxImages.length;
    const pos = activeLightboxIndex + 1;
    lightboxStatus.textContent = total > 1
      ? `Foto ${pos} de ${total}. ${lightboxImage.alt}`
      : lightboxImage.alt;
  }
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

/* Las fotos de fondo de la Fragata son <button> con la <img> adentro: el boton aporta
   el nombre de la accion y resuelve Enter y Espacio por si mismo, asi que ya no hace
   falta el keydown manual. Al lightbox se le sigue pasando la imagen, que es de donde
   lee src, alt y la ruta de descarga. */
document.querySelectorAll(".fragata-hero-button").forEach((boton) => {
  boton.addEventListener("click", () => {
    const imagen = boton.querySelector("img");
    if (!imagen) return;
    const galeria = boton.closest(".fragata-gallery")?.querySelectorAll(".fragata-hero-button img");
    openLightbox(imagen, galeria?.length ? galeria : [imagen], boton);
  });
});

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

  /* La galeria se cicla sola cada 48s. Las guidelines piden poder frenar cualquier
     movimiento automatico que dure mas de 5 segundos junto a otro contenido. El control
     se inyecta aca y no en el HTML a proposito: si hay movimiento reducido no entramos
     a este bloque, y entonces no se ofrece pausar algo que no se mueve. */
  const galeria = document.querySelector(".fragata-gallery");
  if (galeria) {
    const pausa = document.createElement("button");
    pausa.type = "button";
    pausa.className = "fragata-pausa";
    let pausado = false;
    const pintar = () => {
      pausa.textContent = pausado ? "Reanudar" : "Pausar";
      pausa.setAttribute("aria-label", pausado
        ? "Reanudar el cambio automatico de fotos"
        : "Pausar el cambio automatico de fotos");
      pausa.setAttribute("aria-pressed", pausado ? "true" : "false");
    };
    pausa.addEventListener("click", () => {
      pausado = !pausado;
      fragataSlidesForPointerEvents.forEach((slide) => {
        slide.style.animationPlayState = pausado ? "paused" : "running";
      });
      pintar();
    });
    pintar();
    galeria.parentElement?.appendChild(pausa);
  }
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
    actualizarEmblema();
  },
  { passive: true }
);

// Al cambiar el tamano cambia el recorrido del cierre.
window.addEventListener("resize", actualizarEmblema, { passive: true });
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
      /* El iframe se pide recien al hacer clic: abrimos la conexion un instante antes. */
      ["https://www.youtube.com", "https://i.ytimg.com"].forEach((origen) => {
        if (document.querySelector(`link[rel="preconnect"][href="${origen}"]`)) return;
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = origen;
        document.head.appendChild(link);
      });

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
