export function initQuickRequest() {
	const hero = document.querySelector(".hero");
	const button = document.querySelector(".quick-request");

	if (!hero || !button) {
		return;
	}

	const updateVisibility = () => {
		const heroBottom = hero.getBoundingClientRect().bottom;
		button.classList.toggle("is-visible", heroBottom <= 0);
	};

	updateVisibility();
	window.addEventListener("scroll", updateVisibility, { passive: true });
	window.addEventListener("resize", updateVisibility);
}
