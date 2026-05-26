export function initBurgerMenu() {
	const header = document.querySelector(".header");
	const toggle = document.querySelector(".header__menu-toggle");
	const nav = document.querySelector(".header .nav");

	if (!header || !toggle || !nav) {
		return;
	}

	const mediaQuery = window.matchMedia("(max-width: 1200px)");

	function closeMenu() {
		header.classList.remove("is-open");
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-label", "Открыть меню");
		document.body.classList.remove("menu-open");
		toggle.blur();
	}

	function openMenu() {
		header.classList.add("is-open");
		toggle.setAttribute("aria-expanded", "true");
		toggle.setAttribute("aria-label", "Закрыть меню");
		document.body.classList.add("menu-open");
	}

	function syncMode() {
		if (!mediaQuery.matches) {
			closeMenu();
		}
	}

	toggle.addEventListener("click", () => {
		if (header.classList.contains("is-open")) {
			closeMenu();
			return;
		}

		openMenu();
	});

	nav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", closeMenu);
	});

	document.addEventListener("click", (event) => {
		if (!mediaQuery.matches) {
			return;
		}

		if (!header.contains(event.target)) {
			closeMenu();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeMenu();
		}
	});

	if (typeof mediaQuery.addEventListener === "function") {
		mediaQuery.addEventListener("change", syncMode);
	} else {
		mediaQuery.addListener(syncMode);
	}

	syncMode();
}
