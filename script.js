const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

document.querySelectorAll(".newsletter form, .newsletter-form").forEach((newsletterForm) => {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterForm.reset();
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
