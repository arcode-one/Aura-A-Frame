export function initFaq() {
	const list = document.querySelector(".faq__list");
	const items = Array.from(list?.querySelectorAll(".faq__item") ?? []);

	if (!list || !items.length) {
		return;
	}

	function setOpenState(item, open) {
		const button = item.querySelector(".faq__question");

		item.classList.toggle("is-open", open);

		if (button) {
			button.setAttribute("aria-expanded", open ? "true" : "false");
		}
	}

	items.forEach((item) => setOpenState(item, item.classList.contains("is-open")));

	list.addEventListener("click", (event) => {
		const button = event.target.closest(".faq__question");

		if (!button) {
			return;
		}

		const item = button.closest(".faq__item");

		if (!item) {
			return;
		}

		const isOpen = item.classList.contains("is-open");

		items.forEach((faqItem) => setOpenState(faqItem, false));

		if (!isOpen) {
			setOpenState(item, true);
		}
	});
}
