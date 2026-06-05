import { initBookingForm } from "./modules/booking-form.js";
import { initBookingRequest } from "./modules/booking-request.js";
import { initBurgerMenu } from "./modules/burger-menu.js";
import { initFaq } from "./modules/faq.js";
import { initHeaderScroll } from "./modules/header-scroll.js";
import { initParallax } from "./modules/parallax.js";
import { initQuickRequest } from "./modules/quick-request.js";
import { initReveal } from "./modules/reveal.js";
import { initReviewsSlider } from "./modules/reviews-marquee.js";
import { initTelegramLinks } from "./modules/telegram-link.js";

function initApp() {
	initBurgerMenu();
	initHeaderScroll();
	initQuickRequest();
	initReveal();
	initParallax();
	initFaq();
	initBookingForm();
	initBookingRequest();
	initReviewsSlider();
	initTelegramLinks();
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
	initApp();
}
