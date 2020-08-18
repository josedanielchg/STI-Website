import Carousel from "./modules/carousel.js";
import { ShapeOverlays } from "./vendors/demo3.js";

const d = document,
  w = window;

// ---------- FUNCTIONS HOME ----------
if (d.getElementById("home")) {
  //Means that you are in the Home Page
  const $clientsCarousel = new Carousel(".carousel-clients");
  const $headerCarousel = new Carousel(".header-carousel");

  d.addEventListener("DOMContentLoaded", (e) => {
    $clientsCarousel.addButtonsEvents();
    $headerCarousel.addButtonsEvents();

    particlesJS.load("particles-js", "js/assets/particlesjs-config.json");
    hamburgerMenu();
    scrollMenu(490);
  });
}

// ---------- FUNCTIONS ABOUT ----------
if (d.getElementById("about")) {
  //Means that you are in the About Page
  d.addEventListener("DOMContentLoaded", (e) => {
    particlesJS.load("particles-js", "js/assets/particlesjs-config.json");
    hamburgerMenu();
    scrollMenu(448);
  });
}

// ---------- FUNCTIONS CONTACT ----------
if (d.getElementById("contact")) {
  d.addEventListener("DOMContentLoaded", (e) => {
    hamburgerMenu();
    scrollMenu(450);
  });
}

// ---------- FUNCTIONS SERVICES ----------
if (d.getElementById("services")) {
  d.addEventListener("DOMContentLoaded", (e) => {
    hamburgerMenu();
    scrollMenu(450);
  });
}

// ---------- SCROLL MENU----------
function scrollMenu(scrollHeight) {
  const $menu = d.querySelector(".menu-bar");

  w.addEventListener("scroll", (e) => {
    let scrollTop = w.pageYOffset || d.documentElement.scrollTop;

    scrollTop > scrollHeight
      ? $menu.classList.remove("is-hidden")
      : $menu.classList.add("is-hidden");
  });
}

// ---------- HAMBURGER MENU----------
function hamburgerMenu() {
  const hamburgerButton = d.querySelector(".hamburger");
  const gNavItems = document.querySelectorAll(".global-menu__item");
  const elmOverlay = document.querySelector(".shape-overlays");
  const overlay = new ShapeOverlays(elmOverlay);

  hamburgerButton.addEventListener("click", () => {
    if (overlay.isAnimating) {
      return false;
    }
    overlay.toggle();
    if (overlay.isOpened === true) {
      hamburgerButton.classList.add("is-active");
      for (var i = 0; i < gNavItems.length; i++) {
        gNavItems[i].classList.add("is-opened");
      }
    } else {
      hamburgerButton.classList.remove("is-active");
      for (var i = 0; i < gNavItems.length; i++) {
        gNavItems[i].classList.remove("is-opened");
      }
    }
  });
}
