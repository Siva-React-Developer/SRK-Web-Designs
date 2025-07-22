// to save the form details in google sheet
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwlBiSZE9G4shQmZEs2AtOfVeJ6Oj9Mvor-ERaZD-CnDuRxn7XPHX-Pl123u6RjpI4yow/exec";
const form = document.forms["contact-form"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(form);

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      alert("Done ,Submitted Successfully.");
      form.reset();
    })
    .catch((error) => {
      alert("Error ,Something went wrong. please try again!");
    });
});

// scroll-animate for all sections via navbar links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".navbar-links").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Toggle vertical navbar on menu icon click
const menuIcon = document.querySelector(".menu-icon");
const vertNavbar = document.querySelector(".navbar1");
menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  vertNavbar.classList.toggle("show");
});

// Close navbar when clicking outside of it
document.addEventListener("click", (e) => {
  if (
    vertNavbar.classList.contains("show") &&
    !vertNavbar.contains(e.target) &&
    !menuIcon.contains(e.target)
  ) {
    vertNavbar.classList.remove("show");
  }
});

// Close navbar when a link is clicked
const navLinks = document.querySelectorAll(".vert-nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    vertNavbar.classList.remove("show");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Remove this if you want repeated animation
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".scroll-animate")
  .forEach((el) => observer.observe(el));

// Automatically trigger fullscreen mode after a short delay
let hasEnteredFullscreen = false;
function enterFullscreen() {
  if (hasEnteredFullscreen) return;
  hasEnteredFullscreen = true;
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen(); // For Safari
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen(); // For IE
  } else {
    console.warn("Fullscreen API is not supported on this browser.");
  }
}
// Run fullscreen on first touch or click
document.addEventListener("click", enterFullscreen, { once: true });
document.addEventListener("touchstart", enterFullscreen, { once: true });

// closing the navbar on scroll
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    // Scroll Down
    navbar.classList.add("hidden");
  } else {
    // Scroll Up
    navbar.classList.remove("hidden");
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
