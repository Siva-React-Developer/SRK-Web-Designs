// to save the form details in google sheet
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwlBiSZE9G4shQmZEs2AtOfVeJ6Oj9Mvor-ERaZD-CnDuRxn7XPHX-Pl123u6RjpI4yow/exec";
const form = document.forms["contact-form"];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var formData = new FormData(form);
  document.getElementById('loader').style.display = 'inline-block';
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      alert("Done ,Submitted Successfully.");
      document.getElementById('loader').style.display = 'none';
      form.reset();
    })
    .catch((error) => {
      alert("Error ,Something went wrong. please try again!");
    });
});

// JavaScript to dynamically create project cards
const container = document.querySelector(".projects-grid");

// Fetch JSON data from file
fetch("projects.json")
  .then((response) => response.json())
  .then((data) => {
    const projects = data.projects;

    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.className = "project-card scroll-animate from-right visible";

      // Create and append <p> tags
      const nameP = document.createElement("p");
      nameP.textContent = project.name;
      nameP.className = "project-name";
      projectDiv.appendChild(nameP);

      const descP = document.createElement("p");
      descP.textContent = `Description: ${project.description}`;
      descP.className = "project-description";
      projectDiv.appendChild(descP);

      const techP = document.createElement("p");
      techP.textContent = `Technologies: ${project.technologies}`;
      techP.className = "project-technologies";
      projectDiv.appendChild(techP);

      const editP = document.createElement("p");
      editP.textContent = `Last Edit: ${project.lastEdited}`;
      editP.className = "project-last-edit";
      projectDiv.appendChild(editP);

      // Create and append anchor tag
      const urlA = document.createElement("a");
      urlA.href = project.path;
      urlA.target = "_blank";
      urlA.textContent = "Visit site";
      urlA.className = "project-url";
      projectDiv.appendChild(urlA);

      // Append the full project div to main container
      container.appendChild(projectDiv);
    });
  })
  .catch((error) => {
    console.error("Failed to load projects.json:", error);
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

