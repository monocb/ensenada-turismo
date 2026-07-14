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

