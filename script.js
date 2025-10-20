document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const pageWrapper = document.getElementById("page-wrapper");
  const mobileMenu = document.getElementById("mobile-menu");

  // Elements for control
  const menuButton = document.getElementById("mobile-menu-button"); // Hamburger (Open)
  const closeMenuButton = document.getElementById("close-menu-button"); // Cross (Close)

  // Select all links that should close the menu (mobile links only)
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const loaderDuration = 800; // Use a fixed duration for consistency

  // Function to close the menu
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    pageWrapper.classList.remove("menu-open");
    mobileMenu.classList.remove("translate-x-0");
    document.body.style.overflow = "auto";
  };

  // Function to open the menu
  const openMenu = () => {
    document.body.classList.add("menu-open");
    pageWrapper.classList.add("menu-open");
    mobileMenu.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  };

  // ========== MENU LISTENERS ==========

  // 1. Hamburger button (Open)
  if (menuButton) {
    menuButton.addEventListener("click", openMenu);
  }

  // 2. Cross button (Close)
  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", closeMenu);
  }

  // 3. Auto-close when a mobile link is clicked (important for navigating away)
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Check if the mobile menu is open
      if (mobileMenu.classList.contains("translate-x-0")) {
        // Add a slight delay for smooth transition
        setTimeout(closeMenu, 10);
      }
    });
  });

  // 4. Close when clicking anywhere outside the menu panel
  document.addEventListener("click", (event) => {
    const isMenuOpen = mobileMenu.classList.contains("translate-x-0");
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnOpenButton = menuButton.contains(event.target);

    // If menu is open AND click is NOT inside the menu AND click is NOT on the open button, close the menu.
    if (isMenuOpen && !isClickInsideMenu && !isClickOnOpenButton) {
      closeMenu();
    }
  });

  // ========== LOADER ==========
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        document.body.style.overflow = "auto"; // Re-enable scroll after loader

        if (mainContent) {
          mainContent.style.opacity = "1";
          mainContent.style.transition = "opacity 0.5s ease-in-out";
        }
      }, 500);
    }
  }, loaderDuration);

  // ========== SCROLL ANIMATIONS ==========
  if (mainContent) {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }
});
