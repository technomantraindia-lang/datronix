const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

const closeMenu = () => {
  if (!mainNav || !navToggle) return;
  mainNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

const ensureInquiryModal = () => {
  let modal = document.getElementById("inquiry-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "inquiry-modal";
  modal.className = "inquiry-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "inquiry-modal-title");
  modal.innerHTML =
    `<div class="inquiry-modal-backdrop inquiry-modal-dismiss" tabindex="-1" aria-hidden="true"></div>
    <div class="inquiry-modal-dialog">
      <button type="button" class="inquiry-modal-close inquiry-modal-dismiss" aria-label="Close">&times;</button>
      <div class="inquiry-modal-head">
        <h2 id="inquiry-modal-title">Product inquiry</h2>
        <p>Tell us what you need. We usually reply quickly on WhatsApp.</p>
      </div>
      <div id="inquiry-modal-success" class="inquiry-modal-success">
        <p>Thank you. Your inquiry text should open in WhatsApp. If it did not, use the WhatsApp button below.</p>
        <a class="inquiry-modal-wa-link inquiry-modal-after-wa" id="inquiry-wa-after-submit" href="https://wa.me/919724467330" target="_blank" rel="noreferrer noopener">Open WhatsApp</a>
        <button type="button" class="inquiry-modal-done">Close</button>
      </div>
      <form id="inquiry-form" class="inquiry-form" novalidate>
        <label>Full name<span class="sr-only"> (required)</span>
          <input type="text" name="name" id="inquiry-name" autocomplete="name" placeholder="Your name" required>
        </label>
        <label>Phone<span class="sr-only"> (required)</span>
          <input type="tel" name="phone" id="inquiry-phone" autocomplete="tel" placeholder="+91 ..." required>
        </label>
        <label>Email
          <input type="email" name="email" id="inquiry-email" autocomplete="email" placeholder="you@example.com">
        </label>
        <label>Product
          <select name="product" id="inquiry-product" aria-label="Product">
            <option value="">General inquiry / product not listed</option>
            <option value="DAS528 DaTo Diagnostic Car Scanner">DAS528 DaTo Diagnostic Car Scanner</option>
            <option value="DAS722 Da To Diagnostic Car Scanner">DAS722 Da To Diagnostic Car Scanner</option>
            <option value="DAS X-G3 IMMO Programming">DAS X-G3 IMMO Programming</option>
            <option value="DaTo DAS701 Super Scanner">DaTo DAS701 Super Scanner</option>
            <option value="DaTo DAS723 PRO ULTRA">DaTo DAS723 PRO ULTRA</option>
            <option value="DaTo DASG3 Key Programmer">DaTo DASG3 Key Programmer</option>
            <option value="Bluetooth OBD2 Scanner DAS1026">Bluetooth OBD2 Scanner DAS1026</option>
            <option value="ADAS RADAR Trio Cipher Calibration">ADAS RADAR Trio Cipher Calibration</option>
            <option value="DAS825 PRO MAX">DAS825 PRO MAX</option>
            <option value="EV SCANNER DaTo DAS623">EV SCANNER DaTo DAS623</option>
            <option value="DaTo DIGD603 GDI &amp; Piezo Injector Cleaner and Tester">DaTo DIGD603 GDI &amp; Piezo Injector Cleaner and Tester</option>
            <option value="DaTo PTIW1001 Air Impact Wrench">DaTo PTIW1001 Air Impact Wrench</option>
            <option value="DaTo PTIW1011 Heavy Duty Air Impact Wrench">DaTo PTIW1011 Heavy Duty Air Impact Wrench</option>
            <option value="DaTo CSST10I15 CSST10I10 Screw Air Compressor">DaTo CSST10I15 CSST10I10 Screw Air Compressor</option>
            <option value="DaTo DHP 2050 Shop Press 50 Ton">DaTo DHP 2050 Shop Press 50 Ton</option>
          </select>
        </label>
        <label>Message<span class="sr-only"> (required)</span>
          <textarea name="message" id="inquiry-message" placeholder="Which product / how can we help?" required></textarea>
        </label>
        <div class="inquiry-form-actions">
          <button type="submit" class="inquiry-submit">Send inquiry</button>
          <a class="inquiry-modal-wa-link" id="inquiry-wa-plain" href="https://wa.me/919724467330" target="_blank" rel="noreferrer noopener">WhatsApp</a>
        </div>
        <p class="inquiry-modal-note">Sending opens WhatsApp with your message prefilled.</p>
      </form>
    </div>`;

  document.body.appendChild(modal);

  const style = document.createElement("style");
  style.textContent =
    `.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}`;
  document.head.appendChild(style);

  const form = modal.querySelector("#inquiry-form");
  const success = modal.querySelector("#inquiry-modal-success");
  const waPlain = modal.querySelector("#inquiry-wa-plain");
  const waAfterSubmit = modal.querySelector("#inquiry-wa-after-submit");

  const defaultWaHref = "https://wa.me/919724467330";
  let activeWaUrl = defaultWaHref;

  const setWaLinks = () => {
    waPlain.href = activeWaUrl;
    waAfterSubmit.href = activeWaUrl;
  };

  modal._configureInquiryWa = (triggerEl) => {
    const candidate = triggerEl?.dataset?.waUrl?.trim?.();
    activeWaUrl =
      typeof candidate === "string" && /^https:\/\/wa\.me\//i.test(candidate)
        ? candidate
        : defaultWaHref;
    setWaLinks();
  };

  modal.addEventListener("click", (event) => {
    if (event.target.closest(".inquiry-modal-dismiss")) {
      closeInquiryModal();
    }
  });

  modal.querySelector(".inquiry-modal-done")?.addEventListener("click", () => {
    closeInquiryModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameEl = modal.querySelector("#inquiry-name");
    const phoneEl = modal.querySelector("#inquiry-phone");
    const emailEl = modal.querySelector("#inquiry-email");
    const productEl = modal.querySelector("#inquiry-product");
    const msgEl = modal.querySelector("#inquiry-message");
    const name = (nameEl.value || "").trim();
    const phone = (phoneEl.value || "").trim();
    const email = (emailEl.value || "").trim();
    const product = (productEl?.value || "").trim();
    const message = (msgEl.value || "").trim();
    if (!name || !phone || !message) return;

    const body =
      "*Product inquiry — Datronix Autotech*" +
      "\n\n" +
      "Name: " +
      name +
      "\n" +
      "Phone: " +
      phone +
      (email ? "\nEmail: " + email : "") +
      (product ? "\nProduct: " + product : "") +
      "\n\n" +
      "Message:\n" +
      message;

    let base = activeWaUrl || "https://wa.me/919724467330";
    try {
      const u = new URL(base, window.location.href);
      u.searchParams.set("text", body);
      window.open(u.toString(), "_blank", "noopener,noreferrer");
    } catch {
      const sep = base.includes("?") ? "&" : "?";
      window.open(base + sep + "text=" + encodeURIComponent(body), "_blank", "noopener,noreferrer");
    }

    success.classList.add("is-visible");
    form.hidden = true;
  });

  modal._resetPanel = () => {
    success.classList.remove("is-visible");
    form.hidden = false;
    form.reset();
    setWaLinks();
  };

  setWaLinks();
  return modal;
};

let inquiryLastFocus = null;

const closeInquiryModal = () => {
  const modal = document.getElementById("inquiry-modal");
  if (!modal?.classList.contains("is-open")) return false;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("inquiry-modal-open");
  modal._resetPanel?.();
  inquiryLastFocus?.focus?.({ preventScroll: false });
  inquiryLastFocus = null;
  return true;
};

const openInquiryModal = (trigger) => {
  const modal = ensureInquiryModal();

  inquiryLastFocus = document.activeElement;
  modal._configureInquiryWa?.(trigger);
  modal._resetPanel?.();

  const presetProduct = trigger?.dataset?.inquiryProduct?.trim?.();
  if (presetProduct) {
    const productSelect = modal.querySelector("#inquiry-product");
    if (productSelect && [...productSelect.options].some((option) => option.value === presetProduct)) {
      productSelect.value = presetProduct;
    }
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("inquiry-modal-open");
  closeMenu();

  requestAnimationFrame(() => {
    const first = modal.querySelector("#inquiry-name");
    first?.focus?.({ preventScroll: true });
  });
};

document.body.addEventListener("click", (event) => {
  const opener = event.target.closest(".inquiry-open-btn");
  if (!opener) return;
  event.preventDefault();
  openInquiryModal(opener);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (closeInquiryModal()) {
    event.preventDefault();
    return;
  }

  closeMenu();
});

document.querySelectorAll(".newsletter form, .newsletter-form").forEach((newsletterForm) => {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterForm.reset();
  });
});

document.querySelectorAll(".contact-form").forEach((contactForm) => {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const product = String(formData.get("product") || "").trim();

    if (!name || !email || !phone || !subject || !message) {
      return;
    }

    let body =
      "Name: " +
      name +
      "\nEmail: " +
      email +
      "\nPhone: " +
      phone +
      (product ? "\nProduct: " + product : "") +
      "\n\nMessage:\n" +
      message;

    const mailtoHref =
      "mailto:info@datronixautotech.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailtoHref;
  });
});

document.querySelectorAll(".product-gallery").forEach((gallery) => {
  const mainImage = gallery.querySelector(".main-product-image");
  const thumbs = Array.from(gallery.querySelectorAll(".thumb"));
  const prevButton = gallery.querySelector(".gallery-arrow:first-of-type");
  const nextButton = gallery.querySelector(".gallery-arrow:last-of-type");

  if (!mainImage || thumbs.length === 0) return;

  let activeIndex = Math.max(0, thumbs.findIndex((thumb) => thumb.classList.contains("active")));

  const showImage = (index) => {
    activeIndex = (index + thumbs.length) % thumbs.length;
    const activeThumb = thumbs[activeIndex];
    const thumbImage = activeThumb.querySelector("img");

    if (!thumbImage) return;

    mainImage.src = thumbImage.src;
    mainImage.alt = activeThumb.getAttribute("aria-label") || thumbImage.alt || "Product image";

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("active", thumbIndex === activeIndex);
    });
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showImage(index));
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => showImage(activeIndex - 1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => showImage(activeIndex + 1));
  }
});

document.querySelectorAll(".related-carousel").forEach((carousel) => {
  const prevButton = carousel.querySelector(".related-arrow.prev");
  const nextButton = carousel.querySelector(".related-arrow.next");

  const getCards = () => Array.from(carousel.querySelectorAll(".related-product-card"));

  const moveCards = (direction) => {
    const cards = getCards();
    if (cards.length < 2) return;

    if (direction === "next") {
      carousel.insertBefore(cards[0], nextButton);
      return;
    }

    carousel.insertBefore(cards[cards.length - 1], cards[0]);
  };

  prevButton?.addEventListener("click", () => moveCards("prev"));
  nextButton?.addEventListener("click", () => moveCards("next"));

  getCards().forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;

      const href = card.dataset.href;
      if (href) window.location.href = href;
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      const href = card.dataset.href;
      if (!href) return;

      event.preventDefault();
      window.location.href = href;
    });
  });
});
