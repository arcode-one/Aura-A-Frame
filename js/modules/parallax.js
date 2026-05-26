export function initParallax() {
	const parallaxItems = document.querySelectorAll("[data-parallax]");

	if (!parallaxItems.length) {
		return;
	}

	let ticking = false;

	function updateParallax() {
		parallaxItems.forEach((item) => {
			const speed = Number(item.dataset.parallax || 0);
			const rect = item.getBoundingClientRect();
			const rawOffset = rect.top * speed;
			const offset = Math.max(-30, Math.min(30, rawOffset));
			item.style.transform = `translate3d(0, ${offset}px, 0)`;
		});

		ticking = false;
	}

	window.addEventListener("scroll", () => {
		if (!ticking) {
			requestAnimationFrame(updateParallax);
			ticking = true;
		}
	});

	updateParallax();
}
