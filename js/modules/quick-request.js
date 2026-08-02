export function initQuickRequest() {
	const hero = document.querySelector(".hero");
	const footer = document.querySelector(".footer");
	const button = document.querySelector(".quick-request");

	if (!hero || !footer || !button) {
		return;
	}

	const updateButton = () => {
		const heroBottom = hero.getBoundingClientRect().bottom;
		const footerTop = footer.getBoundingClientRect().top;
		const buttonOffset = Number.parseFloat(
			getComputedStyle(button).getPropertyValue("--quick-request-offset"),
		);
		const shouldDock =
			window.innerWidth <= 992 &&
			footerTop <= window.innerHeight - buttonOffset;

		button.classList.toggle("is-visible", heroBottom <= 0);
		button.classList.toggle("is-docked", shouldDock);
	};

	updateButton();
	window.addEventListener("scroll", updateButton, { passive: true });
	window.addEventListener("resize", updateButton);
}
