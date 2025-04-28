document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navbarItems = document.querySelector(".navbar-items"); // Use querySelector for a single element
  const navbar = document.querySelector(".navbar");

  // Check if hamburger and navbarItems exist to avoid null reference errors
  if (hamburger && navbarItems) {
    hamburger.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent this click event from propagating to the document
      hamburger.classList.toggle("active");
      navbarItems.classList.toggle("active");
    });

    // Close the dropdown if an option inside the menu is clicked
    const navbarLinks = document.querySelectorAll(".navbar-items .nav-link");
    navbarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navbarItems.classList.remove("active");
      });
    });

    // Close the dropdown if the user clicks anywhere outside the navbar
    document.addEventListener("click", (event) => {
      // Check if the click is outside the navbar or hamburger
      if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove("active");
        navbarItems.classList.remove("active");
      }
    });
  }
});
