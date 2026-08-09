export function initBookingRequest() {
	const modal = document.querySelector(".booking-request");
	const dialog = modal?.querySelector(".booking-request__panel");
	const form = modal?.querySelector(".booking-request__form");
	const intro = modal?.querySelector(".booking-request__intro");
	const success = modal?.querySelector(".booking-request__success");
	const successTitle = modal?.querySelector(".booking-request__success-title");
	const successName = modal?.querySelector("[data-booking-success-name]");
	const successTimer = modal?.querySelector(".booking-request__success-timer");
	const bookingForm = document.querySelector(".booking__form");
	const checkinInput = bookingForm?.querySelector('[data-date-input="checkin"]');
	const checkoutInput = bookingForm?.querySelector('[data-date-input="checkout"]');
	const submit = form?.querySelector('button[type="submit"]');
	const openers = document.querySelectorAll("[data-open-booking-modal]");
	const closers = modal?.querySelectorAll("[data-close-booking-modal]");
	let closeTimer = null;
	let countdownTimer = null;

	if (
		!modal ||
		!dialog ||
		!form ||
		!intro ||
		!success ||
		!successTitle ||
		!successName ||
		!successTimer ||
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

	function resetModal() {
		dialog.classList.remove("is-success");
		dialog.setAttribute("aria-labelledby", "booking-request-title");
		intro.hidden = false;
		form.hidden = false;
		success.hidden = true;
		successName.textContent = "";
		updateSuccessTimer(6);
	}

	function updateSuccessTimer(seconds) {
		const word = seconds === 1 ? "секунду" : seconds < 5 ? "секунды" : "секунд";
		successTimer.textContent = `Окно закроется автоматически через ${seconds} ${word}.`;
	}

	function clearCloseTimer() {
		if (closeTimer !== null) {
			window.clearTimeout(closeTimer);
			closeTimer = null;
		}

		if (countdownTimer !== null) {
			window.clearInterval(countdownTimer);
			countdownTimer = null;
		}
	}

	function openModal() {
		clearCloseTimer();
		resetModal();
		modal.hidden = false;
		document.body.classList.add("modal-open");

		requestAnimationFrame(() => {
			const firstInput = form.querySelector("input");
			firstInput?.focus();
		});
	}

	function closeModal() {
		clearCloseTimer();
		modal.hidden = true;
		document.body.classList.remove("modal-open");
		form.reset();
		resetModal();
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

		const name = new FormData(form).get("name")?.toString().trim();

		successName.textContent = name ? `, ${name}` : "";
		intro.hidden = true;
		form.hidden = true;
		success.hidden = false;
		dialog.classList.add("is-success");
		dialog.setAttribute("aria-labelledby", "booking-request-success-title");
		successTitle.focus();
		form.reset();

		let secondsRemaining = 6;
		updateSuccessTimer(secondsRemaining);
		countdownTimer = window.setInterval(() => {
			secondsRemaining -= 1;

			if (secondsRemaining > 0) {
				updateSuccessTimer(secondsRemaining);
			}
		}, 1000);

		closeTimer = window.setTimeout(closeModal, 6000);
	});
}
