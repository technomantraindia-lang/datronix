const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navDropdowns = document.querySelectorAll(".nav-dropdown");
const heroVideo = document.querySelector(".hero-video");
const LEAD_FORM_ACCESS_KEY = "60e456bc-7da3-4123-8204-01a7a0fe804e";
const LEAD_FORM_ENDPOINT = "https://api.web3forms.com/submit";

if (heroVideo) {
  heroVideo.playbackRate = 0.75;
}

const submitLeadForm = async (fields) => {
  const payload = new FormData();
  payload.append("access_key", LEAD_FORM_ACCESS_KEY);
  payload.append("from_name", "Datronix Autotech Website");
  payload.append("subject", fields.subject || "New website inquiry");

  Object.entries(fields).forEach(([key, value]) => {
    if (key === "subject") return;
    const cleanValue = String(value || "").trim();
    if (cleanValue) payload.append(key, cleanValue);
  });

  const response = await fetch(LEAD_FORM_ENDPOINT, {
    method: "POST",
    body: payload
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Unable to submit form");
  }

  return result;
};

const closeMenu = () => {
  if (!mainNav || !navToggle) return;
  mainNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navDropdowns.forEach((dropdown) => {
    dropdown.classList.remove("open");
    dropdown.querySelector(".nav-drop-toggle")?.setAttribute("aria-expanded", "false");
  });
};

if (navToggle && mainNav) {
  const desktopInquiryButton = document.querySelector(".site-header .inquiry-open-btn");
  if (desktopInquiryButton && !mainNav.querySelector(".mobile-inquiry-open-btn")) {
    const mobileInquiryButton = desktopInquiryButton.cloneNode(true);
    mobileInquiryButton.classList.add("mobile-inquiry-open-btn");
    mainNav.appendChild(mobileInquiryButton);
  }

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  navDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-drop-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (event) => {
      if (window.innerWidth > 820) return;
      event.preventDefault();
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
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
        <p>Thank you. Your inquiry has been sent. We will contact you soon.</p>
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
            <option value="DaTo PTIW1011 1&Prime; Heavy Duty Impact Wrench">DaTo PTIW1011 1&Prime; Heavy Duty Impact Wrench</option>
            <option value="DaTo CSST Screw Air Compressor">DaTo CSST Screw Air Compressor</option>
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
        <p class="inquiry-modal-note">Your inquiry details will be sent to our team by email.</p>
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nameEl = modal.querySelector("#inquiry-name");
    const phoneEl = modal.querySelector("#inquiry-phone");
    const emailEl = modal.querySelector("#inquiry-email");
    const productEl = modal.querySelector("#inquiry-product");
    const msgEl = modal.querySelector("#inquiry-message");
    const submitButton = modal.querySelector(".inquiry-submit");
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

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      await submitLeadForm({
        subject: "New product inquiry - Datronix Autotech",
        form_type: "Product inquiry",
        name,
        phone,
        email,
        product,
        message,
        page_url: window.location.href
      });
      success.classList.add("is-visible");
      form.hidden = true;
    } catch (error) {
      alert("Sorry, your inquiry could not be sent. Please try again later.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send inquiry";
      }
    }
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
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const defaultButtonHtml = submitButton?.innerHTML || "Send Message";
  let status = contactForm.querySelector(".form-status");

  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.setAttribute("aria-live", "polite");
    contactForm.appendChild(status);
  }

  contactForm.addEventListener("submit", async (event) => {
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

    status.textContent = "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";
    }

    try {
      await submitLeadForm({
        subject,
        form_type: "Contact page message",
        name,
        email,
        phone,
        product,
        message,
        page_url: window.location.href
      });
      contactForm.reset();
      status.textContent = "Thank you. Your message has been sent.";
    } catch (error) {
      status.textContent = "Sorry, your message could not be sent. Please try again later.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = defaultButtonHtml;
      }
    }
  });
});

document.querySelectorAll(".product-gallery").forEach((gallery) => {
  const mainImage = gallery.querySelector(".main-product-image");
  const thumbs = Array.from(gallery.querySelectorAll(".thumb"));
  const thumbRow = gallery.querySelector(".thumb-row");
  const prevButton = gallery.querySelector(".gallery-arrow:first-of-type");
  const nextButton = gallery.querySelector(".gallery-arrow:last-of-type");

  if (!mainImage) return;

  if (thumbs.length <= 1) {
    thumbRow?.classList.add("thumb-row--single");
    return;
  }

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
