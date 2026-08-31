const FOCUSABLE_SELECTOR = [
	'a[href]:not([tabindex="-1"])',
	'button:not([disabled]):not([tabindex="-1"])',
	'[tabindex]:not([tabindex="-1"])',
].join(",");

const CABINS = {
	"A-01": {
		id: "A-01",
		title: "Тишина на двоих.",
		lead:
			"Уютный A-frame для пары: панорамная гостиная, спальня под самой крышей, приватная баня и терраса, с которой приятно начинать медленное утро среди сосен.",
		facts: ["до 2 гостей", "1 спальня", "приватная баня"],
		included: [
			"двуспальная кровать и свежее постельное бельё",
			"кухня с посудой, холодильником и чайной станцией",
			"приватная баня с отдельной душевой",
			"терраса, мангальная зона и вид на лес",
			"Wi-Fi, полотенца и завтрак у панорамного окна",
		],
		price: "от 19 800 ₽",
		images: [
			{
				src: "images/A-01-interior-living.webp",
				alt: "Гостиная с кухней внутри домика A-01",
				label: "Показать гостиную",
			},
			{
				src: "images/A-01-couple-fire.webp",
				alt: "Пара отдыхает у огня на террасе домика A-01",
				label: "Показать отдых для двоих",
			},
			{
				src: "images/A-01-interior-sauna.webp",
				alt: "Приватная баня и душевая домика A-01",
				label: "Показать баню",
			},
		],
	},
	"A-02": {
		id: "A-02",
		title: "Закат на четверых.",
		lead:
			"Домик для небольшой семьи или компании: просторная гостиная, стол на четверых, горячий чан и терраса, с которой лес особенно красиво выглядит на закате.",
		facts: ["до 4 гостей", "горячий чан", "вид на закат"],
		included: [
			"две уютные спальные зоны и свежее постельное бельё",
			"кухня и обеденная зона на четыре персоны",
			"горячий чан на приватной террасе",
			"отдельная мангальная зона и стол для ужина на воздухе",
			"Wi-Fi, полотенца и панорамный вид на сосны",
		],
		price: "от 22 700 ₽",
		images: [
			{
				src: "images/A-02-interior-sunset.webp",
				alt: "Гостиная домика A-02 с панорамным окном на закате",
				label: "Показать гостиную на закате",
			},
			{
				src: "images/A-02-hot-tub-sunset.webp",
				alt: "Горячий чан у домика A-02 на закате",
				label: "Показать горячий чан",
			},
			{
				src: "images/A-02-sleeping-loft.webp",
				alt: "Спальные зоны на четырёх гостей в домике A-02",
				label: "Показать спальные зоны",
			},
		],
	},
	"A-03": {
		id: "A-03",
		title: "Вечер у огня.",
		lead:
			"Просторный домик для компании до шести гостей: большая гостиная, тёплый бассейн и настоящая мангальная зона для долгих ужинов и сочного шашлыка на углях.",
		facts: ["до 6 гостей", "тёплый бассейн", "мангальная зона"],
		included: [
			"комфортные спальные места и свежее постельное бельё",
			"просторная кухня-гостиная и стол на шесть персон",
			"подогреваемый бассейн рядом с террасой",
			"крытая мангальная зона с шампурами и решёткой",
			"Wi-Fi, полотенца и всё для неспешного вечера у огня",
		],
		price: "от 24 900 ₽",
		images: [
			{
				src: "images/A-03-interior-dining.webp",
				alt: "Просторная кухня-гостиная домика A-03 на шесть гостей",
				label: "Показать просторную гостиную",
			},
			{
				src: "images/A-03-grill-shashlik.webp",
				alt: "Шашлык и овощи на углях в мангальной зоне домика A-03",
				label: "Показать мангальную зону",
			},
			{
				src: "images/A-03-friends-grill.webp",
				alt: "Компания друзей готовит шашлык у бассейна домика A-03",
				label: "Показать отдых с друзьями",
			},
		],
	},
	"A-04": {
		id: "A-04",
		title: "Свой спа в лесу.",
		lead:
			"Домик для шести гостей с полным сценарием перезагрузки: приватная баня, горячий чан, тёплый бассейн и мангальная зона на собственной лесной террасе.",
		facts: ["до 6 гостей", "баня и чан", "тёплый бассейн"],
		included: [
			"несколько спальных зон и свежее постельное бельё",
			"приватная баня с душевой и набором полотенец",
			"горячий чан и подогреваемый бассейн на террасе",
			"отдельная мангальная зона для ужина на огне",
			"кухня, Wi-Fi и большая зона отдыха с видом на лес",
		],
		price: "от 26 600 ₽",
		images: [
			{
				src: "images/A-04-bedroom-loft.webp",
				alt: "Спальная зона под A-frame-крышей домика A-04",
				label: "Показать спальную зону",
			},
			{
				src: "images/A-04-private-sauna.webp",
				alt: "Приватная деревянная баня внутри домика A-04",
				label: "Показать приватную баню",
			},
			{
				src: "images/A-04-interior-lounge.webp",
				alt: "Гостиная и обеденная зона домика A-04",
				label: "Показать гостиную",
			},
		],
	},
	"A-05": {
		id: "A-05",
		title: "Дом для своих.",
		lead:
			"Самый просторный домик Aura для компании до восьми гостей: большая гостиная, длинный общий стол, баня, бассейн и место, где особенно хорошо собираться с друзьями.",
		facts: ["до 8 гостей", "просторная гостиная", "баня и бассейн"],
		included: [
			"удобные спальные зоны и комплект белья для большой компании",
			"большая кухня-гостиная и общий стол на восемь персон",
			"приватная баня и подогреваемый бассейн",
			"мангальная зона, терраса и пространство для общего ужина",
			"Wi-Fi, полотенца и всё для тёплых выходных с друзьями",
		],
		price: "от 29 400 ₽",
		images: [
			{
				src: "images/A-05-interior-gathering.webp",
				alt: "Большая гостиная и стол на восемь персон в домике A-05",
				label: "Показать большую гостиную",
			},
			{
				src: "images/A-05-pool-grill-friends.webp",
				alt: "Компания друзей у бассейна и гриля рядом с домиком A-05",
				label: "Показать отдых с друзьями",
			},
			{
				src: "images/A-05-group-sauna.webp",
				alt: "Просторная баня и душевая домика A-05",
				label: "Показать баню",
			},
		],
	},
};

const CABIN_IDS = Object.keys(CABINS);

export function initCabinModal() {
	const modal = document.querySelector("[data-cabin-modal]");
	const dialog = modal?.querySelector(".cabin-modal__panel");
	const mainImage = modal?.querySelector("[data-cabin-gallery-main]");
	const mainImageFrame = mainImage?.closest(".cabin-modal__main-image");
	const thumbs = modal?.querySelectorAll("[data-cabin-gallery-image]");
	const galleryLabel = modal?.querySelector("[data-cabin-gallery-label]");
	const previousCabinButton = modal?.querySelector("[data-cabin-prev]");
	const nextCabinButton = modal?.querySelector("[data-cabin-next]");
	const previousCabinLabel = modal?.querySelector("[data-cabin-prev-label]");
	const nextCabinLabel = modal?.querySelector("[data-cabin-next-label]");
	const cabinPosition = modal?.querySelector("[data-cabin-position]");
	const currentCabinPosition = modal?.querySelector("[data-cabin-position-current]");
	const totalCabinPosition = modal?.querySelector("[data-cabin-position-total]");
	const openers = document.querySelectorAll("[data-open-cabin-modal]");
	const closers = modal?.querySelectorAll("[data-close-cabin-modal]");
	const eyebrow = modal?.querySelector("[data-cabin-eyebrow]");
	const title = modal?.querySelector("[data-cabin-title]");
	const lead = modal?.querySelector("[data-cabin-lead]");
	const facts = modal?.querySelector("[data-cabin-facts]");
	const included = modal?.querySelector("[data-cabin-included]");
	const price = modal?.querySelector("[data-cabin-price]");
	const bookingLink = modal?.querySelector("[data-cabin-book]");
	let activeCabinId = "A-01";
	let lastFocused = null;
	let closeTimer = null;
	let imageTimer = null;
	let pointerStart = null;
	let lockedScrollY = 0;
	let bodyInlineStyles = null;

	if (
		!modal ||
		!dialog ||
		!mainImage ||
		!mainImageFrame ||
		!thumbs?.length ||
		!galleryLabel ||
		!previousCabinButton ||
		!nextCabinButton ||
		!previousCabinLabel ||
		!nextCabinLabel ||
		!cabinPosition ||
		!currentCabinPosition ||
		!totalCabinPosition ||
		!openers.length ||
		!eyebrow ||
		!title ||
		!lead ||
		!facts ||
		!included ||
		!price ||
		!bookingLink
	) {
		return;
	}

	function createListItems(items) {
		return items.map((text) => {
			const item = document.createElement("li");
			item.textContent = text;
			return item;
		});
	}

	function updateCabinNavigation(cabinId) {
		const currentIndex = CABIN_IDS.indexOf(cabinId);

		if (currentIndex < 0) {
			return;
		}

		const previousId = CABIN_IDS[(currentIndex - 1 + CABIN_IDS.length) % CABIN_IDS.length];
		const nextId = CABIN_IDS[(currentIndex + 1) % CABIN_IDS.length];

		previousCabinLabel.textContent = previousId;
		nextCabinLabel.textContent = nextId;
		previousCabinButton.setAttribute("aria-label", `Предыдущий домик ${previousId}`);
		nextCabinButton.setAttribute("aria-label", `Следующий домик ${nextId}`);
		currentCabinPosition.textContent = String(currentIndex + 1).padStart(2, "0");
		totalCabinPosition.textContent = String(CABIN_IDS.length).padStart(2, "0");
		cabinPosition.setAttribute(
			"aria-label",
			`Домик ${currentIndex + 1} из ${CABIN_IDS.length}`
		);
	}

	function renderCabin(cabinId) {
		const cabin = CABINS[cabinId];

		if (!cabin) {
			return false;
		}

		if (imageTimer !== null) {
			window.clearTimeout(imageTimer);
			imageTimer = null;
		}

		activeCabinId = cabin.id;
		eyebrow.textContent = `Домик ${cabin.id}`;
		title.textContent = cabin.title;
		lead.textContent = cabin.lead;
		facts.replaceChildren(...createListItems(cabin.facts));
		included.replaceChildren(...createListItems(cabin.included));
		price.textContent = cabin.price;
		bookingLink.dataset.cabinBook = cabin.id;
		galleryLabel.setAttribute("aria-label", `Фотографии домика ${cabin.id}`);
		updateCabinNavigation(cabin.id);

		mainImage.classList.remove("is-changing");
		mainImage.src = cabin.images[0].src;
		mainImage.alt = cabin.images[0].alt;

		thumbs.forEach((thumb, index) => {
			const image = cabin.images[index];
			const thumbnail = thumb.querySelector("img");
			const isActive = index === 0;

			thumb.hidden = !image;

			if (!image || !thumbnail) {
				return;
			}

			thumb.dataset.cabinGalleryImage = image.src;
			thumb.dataset.cabinGalleryAlt = image.alt;
			thumb.setAttribute("aria-label", image.label);
			thumb.setAttribute("aria-pressed", String(isActive));
			thumb.classList.toggle("is-active", isActive);
			thumbnail.src = image.src;
			thumbnail.alt = "";
		});

		return true;
	}

	function changeCabin(direction) {
		const currentIndex = CABIN_IDS.indexOf(activeCabinId);

		if (currentIndex < 0) {
			return;
		}

		const nextIndex = (currentIndex + direction + CABIN_IDS.length) % CABIN_IDS.length;

		if (!renderCabin(CABIN_IDS[nextIndex])) {
			return;
		}

		dialog.scrollTop = 0;
		modal.scrollTop = 0;
	}

	function lockPageScroll() {
		const body = document.body;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		lockedScrollY = window.scrollY;
		bodyInlineStyles = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
			paddingRight: body.style.paddingRight,
		};

		body.style.position = "fixed";
		body.style.top = `-${lockedScrollY}px`;
		body.style.left = "0";
		body.style.right = "0";
		body.style.width = "100%";

		if (scrollbarWidth > 0) {
			body.style.paddingRight = `${scrollbarWidth}px`;
		}

		body.classList.add("modal-open");
	}

	function unlockPageScroll() {
		const body = document.body;

		body.classList.remove("modal-open");

		if (!bodyInlineStyles) {
			return;
		}

		Object.assign(body.style, bodyInlineStyles);
		bodyInlineStyles = null;

		const previousScrollBehavior = document.documentElement.style.scrollBehavior;
		document.documentElement.style.scrollBehavior = "auto";
		window.scrollTo(0, lockedScrollY);
		document.documentElement.style.scrollBehavior = previousScrollBehavior;
	}

	function openModal(opener) {
		if (!renderCabin(opener.dataset.openCabinModal)) {
			return;
		}

		if (closeTimer !== null) {
			window.clearTimeout(closeTimer);
			closeTimer = null;
		}

		lastFocused = opener;
		dialog.scrollTop = 0;
		modal.scrollTop = 0;
		modal.hidden = false;
		lockPageScroll();

		requestAnimationFrame(() => {
			modal.classList.add("is-open");
			modal.querySelector(".cabin-modal__close")?.focus();
		});
	}

	function closeModal({ restoreFocus = true } = {}) {
		modal.classList.remove("is-open");
		unlockPageScroll();

		closeTimer = window.setTimeout(() => {
			modal.hidden = true;
			closeTimer = null;

			if (restoreFocus) {
				lastFocused?.focus();
			}
		}, 240);
	}

	function showImage(thumb) {
		const source = thumb.dataset.cabinGalleryImage;
		const alt = thumb.dataset.cabinGalleryAlt;

		if (!source || source === mainImage.getAttribute("src")) {
			return;
		}

		if (imageTimer !== null) {
			window.clearTimeout(imageTimer);
		}

		thumbs.forEach((item) => {
			const isActive = item === thumb;
			item.classList.toggle("is-active", isActive);
			item.setAttribute("aria-pressed", String(isActive));
		});

		mainImage.classList.add("is-changing");
		imageTimer = window.setTimeout(() => {
			mainImage.src = source;
			mainImage.alt = alt || `Фотография домика ${activeCabinId}`;
			mainImage.classList.remove("is-changing");
			imageTimer = null;
		}, 150);
	}

	openers.forEach((opener) => {
		opener.addEventListener("click", (event) => {
			event.preventDefault();
			openModal(opener);
		});
	});

	closers?.forEach((closer) => {
		closer.addEventListener("click", () => closeModal());
	});

	thumbs.forEach((thumb) => {
		thumb.addEventListener("click", () => showImage(thumb));
	});

	previousCabinButton.addEventListener("click", () => changeCabin(-1));
	nextCabinButton.addEventListener("click", () => changeCabin(1));

	mainImageFrame.addEventListener(
		"pointerdown",
		(event) => {
			if (!event.isPrimary || event.button !== 0) {
				return;
			}

			pointerStart = {
				id: event.pointerId,
				x: event.clientX,
				y: event.clientY,
			};

			mainImageFrame.setPointerCapture?.(event.pointerId);
		}
	);

	mainImageFrame.addEventListener(
		"pointerup",
		(event) => {
			if (!pointerStart || pointerStart.id !== event.pointerId) {
				pointerStart = null;
				return;
			}

			const deltaX = event.clientX - pointerStart.x;
			const deltaY = event.clientY - pointerStart.y;
			pointerStart = null;

			if (mainImageFrame.hasPointerCapture?.(event.pointerId)) {
				mainImageFrame.releasePointerCapture(event.pointerId);
			}

			if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) {
				return;
			}

			changeCabin(deltaX < 0 ? 1 : -1);
		}
	);

	mainImageFrame.addEventListener(
		"pointercancel",
		() => {
			pointerStart = null;
		}
	);

	bookingLink.addEventListener("click", () => {
		const cabinSelect = document.querySelector("#booking-cabin");

		if (cabinSelect) {
			cabinSelect.value = bookingLink.dataset.cabinBook;
			cabinSelect.dispatchEvent(new Event("change", { bubbles: true }));
		}

		closeModal({ restoreFocus: false });
	});

	document.addEventListener("keydown", (event) => {
		if (modal.hidden) {
			return;
		}

		if (event.key === "Escape") {
			event.preventDefault();
			closeModal();
			return;
		}

		if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
			if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
				return;
			}

			event.preventDefault();
			changeCabin(event.key === "ArrowRight" ? 1 : -1);
			return;
		}

		if (event.key !== "Tab") {
			return;
		}

		const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
			(element) => !element.hidden
		);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (!first || !last) {
			return;
		}

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	});
}
