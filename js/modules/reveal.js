export function initReveal() {
	const reveals = document.querySelectorAll(".reveal");

	if (!reveals.length) {
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.14 }
	);

	reveals.forEach((element, index) => {
		element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
		observer.observe(element);
	});
}
