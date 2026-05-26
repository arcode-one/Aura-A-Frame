export function initHeaderScroll() {
	const header = document.querySelector(".header");
	const anchorLinks = Array.from(
		document.querySelectorAll('a[href^="#"]:not([href="#"])')
	);

	if (!header) {
		return;
	}

	function getAnchorOffset() {
		const gap =
			window.innerWidth <= 390
				? 56
				: window.innerWidth <= 640
					? 52
					: window.innerWidth <= 1024
						? 58
						: 68;

		return Math.ceil(header.offsetHeight + gap);
	}

	function syncAnchorOffset() {
		document.documentElement.style.setProperty(
			"--anchor-offset",
			`${getAnchorOffset()}px`
		);
	}

	function syncHeaderState() {
		header.classList.toggle("is-sticky", window.scrollY > 18);
		syncAnchorOffset();
	}

	function scrollToTarget(target) {
		if (!target) {
			return;
		}

		const top =
			target.getBoundingClientRect().top + window.scrollY - getAnchorOffset();

		window.scrollTo({
			top: Math.max(0, top),
			behavior: "smooth",
		});
	}

	syncHeaderState();
	window.addEventListener("scroll", syncHeaderState, { passive: true });
	window.addEventListener("resize", syncAnchorOffset);

	anchorLinks.forEach((link) => {
		link.addEventListener("click", (event) => {
			const hash = link.getAttribute("href");

			if (!hash) {
				return;
			}

			const target = document.querySelector(hash);

			if (!target) {
				return;
			}

			event.preventDefault();
			scrollToTarget(target);

			if (window.location.hash !== hash) {
				history.replaceState(null, "", hash);
			}
		});
	});

	if (window.location.hash) {
		const initialTarget = document.querySelector(window.location.hash);

		if (initialTarget) {
			requestAnimationFrame(() => scrollToTarget(initialTarget));
		}
	}
}
