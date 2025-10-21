document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const pageWrapper = document.getElementById("page-wrapper");
  const mobileMenu = document.getElementById("mobile-menu");

  const menuButton = document.getElementById("mobile-menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const loaderDuration = 800;

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    pageWrapper.classList.remove("menu-open");
    mobileMenu.classList.remove("translate-x-0");
    document.body.style.overflow = "auto";
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    pageWrapper.classList.add("menu-open");
    mobileMenu.classList.add("translate-x-0");
    document.body.style.overflow = "hidden";
  };

  // ========== MENU LISTENERS ==========

  if (menuButton) {
    menuButton.addEventListener("click", openMenu);
  }

  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", closeMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("translate-x-0")) {
        setTimeout(closeMenu, 10);
      }
    });
  });

  document.addEventListener("click", (event) => {
    const isMenuOpen = mobileMenu.classList.contains("translate-x-0");
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnOpenButton = menuButton.contains(event.target);

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
        document.body.style.overflow = "auto";

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
