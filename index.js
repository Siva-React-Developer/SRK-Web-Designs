document.addEventListener("DOMContentLoaded", () => {
  // Select all nav links
  document.querySelectorAll(".navbar-links").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Stop default jump

      const targetId = this.getAttribute("href").substring(1); // Remove '#'
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

const menuIcon = document.querySelector(".menu-icon");
const vertNavbar = document.querySelector(".navbar1");

// Toggle navbar visibility on menu icon click
menuIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent closing when clicking the menu icon
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

// Optional: Close navbar when a link is clicked
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

let hasRun = false;

function initFullscreen() {
  if (hasRun) return;
  hasRun = true;

  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}

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
