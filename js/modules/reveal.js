export function initReveal() {
	const reveals = document.querySelectorAll(".reveal");

	if (!reveals.length) {
		return;
	}

	if (typeof IntersectionObserver !== "function") {
		reveals.forEach((element) => element.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.remove("is-pending");
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.14 }
	);

	reveals.forEach((element, index) => {
		element.classList.add("is-pending");
		element.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
		observer.observe(element);
	});
}
