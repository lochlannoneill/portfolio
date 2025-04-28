document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navbarItems = document.querySelector(".navbar-items"); // Use querySelector for a single element
    
    // Check if hamburger and navbarItems exist to avoid null reference errors
    if (hamburger && navbarItems) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navbarItems.classList.toggle("active");
      });
    }
  });
  