export function initBookingRequest() {
	const modal = document.querySelector(".booking-request");
	const dialog = modal?.querySelector(".booking-request__panel");
	const form = modal?.querySelector(".booking-request__form");
	const bookingForm = document.querySelector(".booking__form");
	const checkinInput = bookingForm?.querySelector('[data-date-input="checkin"]');
	const checkoutInput = bookingForm?.querySelector('[data-date-input="checkout"]');
	const submit = form?.querySelector('button[type="submit"]');
	const openers = document.querySelectorAll("[data-open-booking-modal]");
	const closers = modal?.querySelectorAll("[data-close-booking-modal]");

	if (
		!modal ||
		!dialog ||
		!form ||
		!submit ||
		!openers.length ||
		!bookingForm ||
		!checkinInput ||
		!checkoutInput
	) {
		return;
	}

	function validateBookingDates() {
		const fields = [
			{
				input: checkinInput,
				message: "Выберите дату заезда",
			},
			{
				input: checkoutInput,
				message: "Выберите дату выезда",
			},
		];

		for (const field of fields) {
			if (!field.input.value.trim()) {
				field.input.setCustomValidity(field.message);
				field.input.reportValidity();
				field.input.focus();
				return false;
			}

			field.input.setCustomValidity("");
		}

		return true;
	}

	function openModal() {
		modal.hidden = false;
		document.body.classList.add("modal-open");

		requestAnimationFrame(() => {
			const firstInput = form.querySelector("input");
			firstInput?.focus();
		});
	}

	function closeModal() {
		modal.hidden = true;
		document.body.classList.remove("modal-open");
	}

	openers.forEach((opener) => {
		opener.addEventListener("click", () => {
			if (!validateBookingDates()) {
				return;
			}

			openModal();
		});
	});

	closers?.forEach((closer) => {
		closer.addEventListener("click", closeModal);
	});

	document.addEventListener("keydown", (event) => {
		if (!modal.hidden && event.key === "Escape") {
			closeModal();
		}
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!form.reportValidity()) {
			return;
		}

		const oldText = submit.textContent;
		submit.textContent = "Демо: данные не отправлены";

		setTimeout(() => {
			submit.textContent = oldText;
			form.reset();
			closeModal();
		}, 2200);
	});
}
