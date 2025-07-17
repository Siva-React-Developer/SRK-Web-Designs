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
