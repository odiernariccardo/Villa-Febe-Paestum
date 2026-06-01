// ============================
// Villa Febe Paestum - Script
// ============================

const WHATSAPP_NUMBER = "393274444831";
const DEFAULT_MESSAGE = "Ciao, vorrei informazioni sulla disponibilità di Villa Febe Paestum.";

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const backToTop = document.getElementById("backToTop");
const year = document.getElementById("year");
const whatsappLinks = document.querySelectorAll(".whatsapp-link");
const contactForm = document.getElementById("contactForm");

year.textContent = new Date().getFullYear();

function getWhatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

whatsappLinks.forEach((link) => {
  link.href = getWhatsappUrl();
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animazioni in entrata
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Lightbox foto con frecce
const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function showLightboxImage(index) {
  currentImageIndex = (index + galleryButtons.length) % galleryButtons.length;
  lightboxImage.src = galleryButtons[currentImageIndex].dataset.img;
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showLightboxImage(index);
    lightbox.classList.add("show");
  });
});

function closeLightbox() {
  lightbox.classList.remove("show");
  lightboxImage.src = "";
}

function showPrevImage(event) {
  event.stopPropagation();
  showLightboxImage(currentImageIndex - 1);
}

function showNextImage(event) {
  event.stopPropagation();
  showLightboxImage(currentImageIndex + 1);
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", showPrevImage);
lightboxNext.addEventListener("click", showNextImage);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
  if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
});

// Form WhatsApp con limite massimo 4 persone
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const period = document.getElementById("period").value.trim();
  const people = document.getElementById("people").value.trim();

  if (people && Number(people) > 4) {
    alert("Villa Febe può ospitare massimo 4 persone.");
    return;
  }

  let message = "Ciao, vorrei informazioni su Villa Febe Paestum.";

  if (name) message += `\nNome: ${name}`;
  if (period) message += `\nPeriodo richiesto: ${period}`;
  if (people) message += `\nNumero persone: ${people}`;

  message += "\nGrazie.";

  window.open(getWhatsappUrl(message), "_blank");
});
