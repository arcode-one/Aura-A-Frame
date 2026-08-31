const MONTHS = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь",
];

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const BUSY_DATES = [
	"2026-05-28",
	"2026-05-29",
	"2026-05-30",
	"2026-06-05",
	"2026-06-06",
	"2026-06-12",
	"2026-06-13",
	"2026-06-14",
	"2026-06-21",
	"2026-06-27",
	"2026-06-28",
	"2026-07-04",
	"2026-07-05",
];

function formatDate(date) {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

function toIsoDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function fromIsoDate(value) {
	const [year, month, day] = value.split("-").map(Number);

	return new Date(year, month - 1, day);
}

function normalizeDate(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function isSameDate(a, b) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isDateInRange(date, start, end) {
	if (!start || !end) {
		return false;
	}

	const time = normalizeDate(date).getTime();

	return (
		time > normalizeDate(start).getTime() && time < normalizeDate(end).getTime()
	);
}

function getMonthGrid(viewDate) {
	const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
	const day = (start.getDay() + 6) % 7;
	start.setDate(start.getDate() - day);

	return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

function hasBusyDateInside(start, end, busyDates) {
	const current = addDays(normalizeDate(start), 1);
	const normalizedEnd = normalizeDate(end).getTime();

	while (current.getTime() < normalizedEnd) {
		if (busyDates.has(toIsoDate(current))) {
			return true;
		}

		current.setDate(current.getDate() + 1);
	}

	return false;
}

function createCalendar() {
	const calendar = document.createElement("div");
	calendar.className = "booking-calendar";
	calendar.hidden = true;
	calendar.innerHTML = `
		<div class="booking-calendar__head">
			<div class="booking-calendar__title"></div>
			<div class="booking-calendar__nav">
				<button type="button" data-calendar-nav="prev" aria-label="Предыдущий месяц">‹</button>
				<button type="button" data-calendar-nav="next" aria-label="Следующий месяц">›</button>
			</div>
		</div>
		<div class="booking-calendar__weekdays"></div>
		<div class="booking-calendar__days"></div>
	`;

	return calendar;
}

export function initBookingForm() {
	const form = document.querySelector(".booking__form");

	if (!form) {
		return;
	}

	const busyDates = new Set(BUSY_DATES);
	const checkinInput = form.querySelector('[data-date-input="checkin"]');
	const checkoutInput = form.querySelector('[data-date-input="checkout"]');
	const checkinField = checkinInput?.closest(".field--date");
	const checkoutField = checkoutInput?.closest(".field--date");
	const guestSelect = form.querySelector("#booking-guests");
	const cabinSelect = form.querySelector("#booking-cabin");
	const button = form.querySelector("button");

	if (!checkinInput || !checkoutInput || !button || !checkinField || !checkoutField) {
		return;
	}

	const calendar = createCalendar();
	const weekdays = calendar.querySelector(".booking-calendar__weekdays");
	const days = calendar.querySelector(".booking-calendar__days");
	const title = calendar.querySelector(".booking-calendar__title");
	const prevButton = calendar.querySelector('[data-calendar-nav="prev"]');
	const nextButton = calendar.querySelector('[data-calendar-nav="next"]');

	WEEKDAYS.forEach((label) => {
		const item = document.createElement("span");
		item.textContent = label;
		weekdays.append(item);
	});

	form.append(calendar);

	const today = normalizeDate(new Date());
	let activeInput = null;
	let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
	let selectedCheckin = null;
	let selectedCheckout = null;

	function closeCalendar() {
		calendar.hidden = true;
		activeInput = null;
		calendar.style.left = "";
		calendar.style.top = "";
		calendar.style.bottom = "";
		calendar.style.visibility = "";
	}

	function positionCalendar(input) {
		if (window.innerWidth <= 760) {
			calendar.style.left = "";
			calendar.style.top = "";
			calendar.style.bottom = "";
			return;
		}

		const field = input.closest(".field");

		if (!field) {
			return;
		}

		const left = field.offsetLeft;
		const top = field.offsetTop + field.offsetHeight + 12;

		calendar.style.left = `${left}px`;
		calendar.style.top = `${top}px`;
		calendar.style.bottom = "auto";

		const calendarRect = calendar.getBoundingClientRect();
		const viewportBottomGap = window.innerHeight - calendarRect.bottom;

		if (viewportBottomGap < 16) {
			calendar.style.top = "auto";
			calendar.style.bottom = `${form.offsetHeight - field.offsetTop + 12}px`;
		}
	}

	function openCalendar(input) {
		if (activeInput === input && !calendar.hidden) {
			closeCalendar();
			return;
		}

		activeInput = input;
		const selectedDate =
			input === checkoutInput && selectedCheckout
				? selectedCheckout
				: input === checkinInput && selectedCheckin
					? selectedCheckin
					: selectedCheckin || today;

		viewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
		calendar.style.visibility = "hidden";
		calendar.hidden = false;
		renderCalendar();

		requestAnimationFrame(() => {
			if (!calendar.hidden && activeInput === input) {
				positionCalendar(input);
				calendar.style.visibility = "";
			}
		});
	}

	function syncInputs() {
		checkinInput.value = selectedCheckin ? formatDate(selectedCheckin) : "";
		checkoutInput.value = selectedCheckout ? formatDate(selectedCheckout) : "";

		checkinInput.setCustomValidity(selectedCheckin ? "" : "Выберите дату заезда");
		checkoutInput.setCustomValidity(
			selectedCheckout ? "" : "Выберите дату выезда"
		);
	}

	function renderCalendar() {
		title.textContent = `${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
		days.innerHTML = "";

		getMonthGrid(viewDate).forEach((date) => {
			const iso = toIsoDate(date);
			const isMuted = date.getMonth() !== viewDate.getMonth();
			const isBusy = busyDates.has(iso);
			const isPast = normalizeDate(date).getTime() < today.getTime();
			const isToday = isSameDate(date, today);
			const isSelected =
				(selectedCheckin && isSameDate(date, selectedCheckin)) ||
				(selectedCheckout && isSameDate(date, selectedCheckout));
			const inRange = isDateInRange(date, selectedCheckin, selectedCheckout);
			const disabled =
				isPast ||
				isBusy ||
				(activeInput === checkoutInput &&
					selectedCheckin &&
					normalizeDate(date).getTime() < normalizeDate(selectedCheckin).getTime());

			const day = document.createElement("button");
			day.type = "button";
			day.className = "booking-calendar__day";
			day.textContent = String(date.getDate());
			day.dataset.date = iso;

			if (isMuted) day.classList.add("is-muted");
			if (isToday) day.classList.add("is-today");
			if (isBusy) day.classList.add("is-busy");
			if (isSelected) day.classList.add("is-selected");
			if (inRange) day.classList.add("is-in-range");
			if (disabled) day.disabled = true;

			days.append(day);
		});
	}

	function selectDate(isoDate) {
		const selectedDate = fromIsoDate(isoDate);

		if (activeInput === checkinInput) {
			selectedCheckin = selectedDate;
			if (
				selectedCheckout &&
				normalizeDate(selectedCheckout).getTime() <
					normalizeDate(selectedCheckin).getTime()
			) {
				selectedCheckout = null;
			}

			openCalendar(checkoutInput);
		} else {
			if (
				!selectedCheckin ||
				hasBusyDateInside(selectedCheckin, selectedDate, busyDates)
			) {
				return;
			}

			selectedCheckout = selectedDate;
			closeCalendar();
		}

		syncInputs();
		renderCalendar();
	}

	function bindDateField(field, input) {
		field.addEventListener("pointerdown", (event) => {
			if (event.target.closest(".booking-calendar")) {
				return;
			}

			event.preventDefault();
			openCalendar(input);
		});
	}

	bindDateField(checkinField, checkinInput);
	bindDateField(checkoutField, checkoutInput);

	function shiftMonth(delta) {
		viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1);
		renderCalendar();

		if (activeInput) {
			requestAnimationFrame(() => positionCalendar(activeInput));
		}
	}

	[prevButton, nextButton].forEach((buttonElement) => {
		buttonElement.addEventListener("pointerdown", (event) => {
			event.preventDefault();
			event.stopPropagation();
			shiftMonth(buttonElement === prevButton ? -1 : 1);
		});
	});

	days.addEventListener("click", (event) => {
		const target = event.target.closest(".booking-calendar__day");

		if (!target || target.disabled || !target.dataset.date) {
			return;
		}

		selectDate(target.dataset.date);
	});

	document.addEventListener("click", (event) => {
		if (calendar.hidden) {
			return;
		}

		const clickedDateField = event.target.closest(".field--date");
		const clickedCalendar = event.target.closest(".booking-calendar");

		if (clickedCalendar) {
			return;
		}

		if (!clickedDateField || !form.contains(event.target)) {
			closeCalendar();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeCalendar();
		}
	});

	form.addEventListener("focusin", (event) => {
		const target = event.target;

		if (!(target instanceof HTMLElement)) {
			return;
		}

		if (target.closest(".booking-calendar")) {
			return;
		}

		if (!target.closest(".field--date")) {
			closeCalendar();
		}
	});

	[guestSelect, cabinSelect].forEach((select) => {
		if (!select) {
			return;
		}

		select.addEventListener("pointerdown", closeCalendar);
		select.addEventListener("focus", closeCalendar);
		select.addEventListener("click", closeCalendar);
		select.addEventListener("change", closeCalendar);
	});

	window.addEventListener("resize", () => {
		if (calendar.hidden || !activeInput) {
			return;
		}

		requestAnimationFrame(() => positionCalendar(activeInput));
	});

	syncInputs();
}
