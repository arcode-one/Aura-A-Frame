function closeSelect(root, restoreFocus = false) {
	if (!root.classList.contains("is-open")) {
		return;
	}

	root.classList.remove("is-open");
	root.querySelector(".custom-select__trigger")?.setAttribute("aria-expanded", "false");
	root.querySelector(".custom-select__dropdown")?.setAttribute("aria-hidden", "true");

	if (restoreFocus) {
		root.querySelector(".custom-select__trigger")?.focus();
	}
}

function closeAllSelects(except = null) {
	document.querySelectorAll(".custom-select.is-open").forEach((root) => {
		if (root !== except) {
			closeSelect(root);
		}
	});
}

function enhanceSelect(select, index) {
	if (select.dataset.customSelectReady === "true") {
		return;
	}

	const options = Array.from(select.options);
	const selectedIndex = Math.max(select.selectedIndex, 0);
	const label = select.id ? document.querySelector(`label[for="${select.id}"]`) : null;
	const labelId = label?.id || `custom-select-label-${index}`;
	const valueId = `custom-select-value-${index}`;
	const listboxId = `custom-select-listbox-${index}`;
	const root = document.createElement("div");
	const trigger = document.createElement("button");
	const value = document.createElement("span");
	const arrow = document.createElement("span");
	const dropdown = document.createElement("div");

	if (label) {
		label.id = labelId;
	}

	root.className = "custom-select";
	trigger.className = "field__control custom-select__trigger";
	trigger.type = "button";
	trigger.setAttribute("aria-expanded", "false");
	trigger.setAttribute("aria-haspopup", "listbox");
	trigger.setAttribute("aria-controls", listboxId);
	trigger.setAttribute("aria-labelledby", `${labelId} ${valueId}`);

	value.className = "custom-select__value";
	value.id = valueId;
	value.textContent = options[selectedIndex]?.textContent || "";

	arrow.className = "custom-select__arrow";
	arrow.setAttribute("aria-hidden", "true");

	dropdown.className = "custom-select__dropdown";
	dropdown.id = listboxId;
	dropdown.setAttribute("role", "listbox");
	dropdown.setAttribute("aria-labelledby", labelId);
	dropdown.setAttribute("aria-hidden", "true");

	options.forEach((option, optionIndex) => {
		const item = document.createElement("button");

		item.className = "custom-select__option";
		item.type = "button";
		item.setAttribute("role", "option");
		item.setAttribute("aria-selected", String(optionIndex === selectedIndex));
		item.dataset.value = option.value;
		item.dataset.index = String(optionIndex);
		item.textContent = option.textContent;
		dropdown.append(item);
	});

	select.dataset.customSelectReady = "true";
	select.classList.add("custom-select__native");
	select.setAttribute("aria-hidden", "true");
	select.tabIndex = -1;
	select.before(root);
	root.append(select, trigger, dropdown);
	trigger.append(value, arrow);
	label?.addEventListener("click", (event) => {
		event.preventDefault();
		trigger.focus();
	});

	const items = Array.from(dropdown.querySelectorAll(".custom-select__option"));

	function focusOption(optionIndex) {
		items[Math.min(Math.max(optionIndex, 0), items.length - 1)]?.focus();
	}

	function openSelect(focusIndex = null) {
		closeAllSelects(root);
		root.classList.add("is-open");
		trigger.setAttribute("aria-expanded", "true");
		dropdown.setAttribute("aria-hidden", "false");

		if (focusIndex !== null) {
			requestAnimationFrame(() => focusOption(focusIndex));
		}
	}

	function chooseOption(optionIndex) {
		const item = items[optionIndex];

		if (!item) {
			return;
		}

		select.selectedIndex = optionIndex;
		value.textContent = item.textContent;
		items.forEach((optionItem, itemIndex) => {
			optionItem.setAttribute("aria-selected", String(itemIndex === optionIndex));
		});
		select.dispatchEvent(new Event("change", { bubbles: true }));
		closeSelect(root, true);
	}

	trigger.addEventListener("click", () => {
		if (root.classList.contains("is-open")) {
			closeSelect(root);
		} else {
			openSelect();
		}
	});

	trigger.addEventListener("keydown", (event) => {
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			openSelect(select.selectedIndex);
		} else if (event.key === "Escape") {
			closeSelect(root);
		}
	});

	dropdown.addEventListener("click", (event) => {
		const item = event.target.closest(".custom-select__option");

		if (item) {
			chooseOption(Number(item.dataset.index));
		}
	});

	dropdown.addEventListener("keydown", (event) => {
		const currentItem = event.target.closest(".custom-select__option");
		const currentIndex = currentItem ? items.indexOf(currentItem) : select.selectedIndex;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			focusOption((currentIndex + 1) % items.length);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			focusOption((currentIndex - 1 + items.length) % items.length);
		} else if (event.key === "Home") {
			event.preventDefault();
			focusOption(0);
		} else if (event.key === "End") {
			event.preventDefault();
			focusOption(items.length - 1);
		} else if (event.key === "Escape") {
			event.preventDefault();
			closeSelect(root, true);
		} else if (event.key === "Tab") {
			closeSelect(root);
		}
	});

	select.addEventListener("change", () => {
		const newIndex = Math.max(select.selectedIndex, 0);
		value.textContent = select.options[newIndex]?.textContent || "";
		items.forEach((item, itemIndex) => {
			item.setAttribute("aria-selected", String(itemIndex === newIndex));
		});
	});
}

export function initCustomSelects() {
	const selects = document.querySelectorAll("[data-custom-select]");

	selects.forEach(enhanceSelect);

	if (!selects.length) {
		return;
	}

	document.addEventListener("pointerdown", (event) => {
		if (!event.target.closest(".custom-select")) {
			closeAllSelects();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeAllSelects();
		}
	});
}
