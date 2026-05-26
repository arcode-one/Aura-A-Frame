export function initReviewsSlider() {
	const track = document.querySelector(".reviews__track");
	const viewport = document.querySelector(".reviews__viewport");
	const prevBtn = document.querySelector(".reviews__button--prev");
	const nextBtn = document.querySelector(".reviews__button--next");

	if (!track || !viewport || !prevBtn || !nextBtn) {
		return;
	}

	const DRAG_THRESHOLD_RATIO = 0.2;
	const ANIMATION_DURATION = "0.4s";
	const DESKTOP_BREAKPOINT = 1201;
	const TABLET_BREAKPOINT = 768;
	const MOBILE_BREAKPOINT = 430;

	let slides = [];
	let visible = 1;
	let index = 0;

	let drag = {
		active: false,
		startX: 0,
		startY: 0,
		offsetX: 0,
		baseX: 0,
		pointerId: null,
		isTouch: false,
		isHorizontal: false,
		didDrag: false,
	};
	let suppressClickUntil = 0;

	const getGap = () => parseFloat(getComputedStyle(track).gap) || 0;

	const getOriginalSlides = () => [
		...track.querySelectorAll(".review:not(.clone)"),
	];

	const getAllSlides = () => [...track.querySelectorAll(".review")];

	const getSlideWidth = () => {
		const slide = slides[0];
		if (!slide) return 0;
		return slide.offsetWidth + getGap();
	};

	const getVisibleSlides = () => {
		if (window.innerWidth >= DESKTOP_BREAKPOINT) return 3;
		if (window.innerWidth <= MOBILE_BREAKPOINT) return 1;
		if (window.innerWidth <= TABLET_BREAKPOINT) return 2;

		const container = track.parentElement;
		const firstOriginal = getOriginalSlides()[0];
		if (!container || !firstOriginal) return 1;

		const containerWidth = container.offsetWidth;
		const fullSlideWidth = firstOriginal.offsetWidth + getGap();

		return Math.max(
			1,
			Math.round((containerWidth + getGap()) / fullSlideWidth),
		);
	};

	const setTransition = (enabled) => {
		track.style.transition = enabled
			? `transform ${ANIMATION_DURATION} ease`
			: "none";
	};

	const applyTranslate = (x, animated = true) => {
		setTransition(animated);
		track.style.transform = `translateX(${x}px)`;
	};

	const getTranslateByIndex = () => -index * getSlideWidth();

	const markActive = () => {
		slides.forEach((slide) => slide.classList.remove("is-active", "is-edge"));

		for (let i = 0; i < visible; i += 1) {
			slides[index + i]?.classList.add("is-active");
		}

		slides[index - 1]?.classList.add("is-edge");
		slides[index + visible]?.classList.add("is-edge");
	};

	const updatePosition = (animated = true) => {
		applyTranslate(getTranslateByIndex(), animated);
		markActive();
	};

	const removeClones = () => {
		track.querySelectorAll(".review.clone").forEach((el) => el.remove());
	};

	const addClones = () => {
		const originals = getOriginalSlides();
		if (!originals.length) return;

		const before = originals.slice(-visible);
		const after = originals.slice(0, visible);

		before.forEach((slide) => {
			const clone = slide.cloneNode(true);
			clone.classList.add("clone");
			track.prepend(clone);
		});

		after.forEach((slide) => {
			const clone = slide.cloneNode(true);
			clone.classList.add("clone");
			track.append(clone);
		});
	};

	const rebuild = () => {
		removeClones();

		visible = getVisibleSlides();
		addClones();

		slides = getAllSlides();
		index = visible;

		updatePosition(false);
	};

	const normalizeLoopIndex = () => {
		const maxBeforeReset = slides.length - visible;
		const resetToEnd = slides.length - visible * 2;

		if (index >= maxBeforeReset) {
			index = visible;
			updatePosition(false);
		} else if (index <= 0) {
			index = resetToEnd;
			updatePosition(false);
		}

		markActive();
	};

	const move = (direction) => {
		index += direction;
		updatePosition(true);
	};

	const closeDrag = () => {
		if (drag.didDrag) {
			suppressClickUntil = Date.now() + 250;
		}

		drag.active = false;
		drag.offsetX = 0;
		drag.pointerId = null;
		drag.isTouch = false;
		drag.isHorizontal = false;
		drag.didDrag = false;
		track.classList.remove("is-dragging");
		track.style.cursor = "grab";
	};

	const startDrag = ({ clientX, clientY = 0, pointerId = null, isTouch = false }) => {
		drag.active = true;
		drag.startX = clientX;
		drag.startY = clientY;
		drag.offsetX = 0;
		drag.baseX = getTranslateByIndex();
		drag.pointerId = pointerId;
		drag.isTouch = isTouch;
		drag.isHorizontal = false;
		drag.didDrag = false;

		track.classList.add("is-dragging");
		track.style.cursor = "grabbing";
		setTransition(false);
	};

	const moveDrag = ({ clientX, clientY = 0 }) => {
		if (!drag.active) return false;

		const deltaX = clientX - drag.startX;
		const deltaY = clientY - drag.startY;

		if (drag.isTouch && !drag.isHorizontal) {
			if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) {
				return false;
			}

			if (Math.abs(deltaX) <= Math.abs(deltaY)) {
				return false;
			}

			drag.isHorizontal = true;
		}

		drag.offsetX = deltaX;
		drag.didDrag = Math.abs(deltaX) > 8;
		applyTranslate(drag.baseX + drag.offsetX, false);
		return true;
	};

	const endDrag = () => {
		if (!drag.active) return;

		const threshold = getSlideWidth() * DRAG_THRESHOLD_RATIO;

		if (Math.abs(drag.offsetX) >= threshold) {
			move(drag.offsetX < 0 ? 1 : -1);
		} else {
			updatePosition(true);
		}

		closeDrag();
	};

	const onPointerDown = (event) => {
		if (event.pointerType === "touch") return;
		if (event.button !== undefined && event.button !== 0) return;

		startDrag({
			clientX: event.clientX,
			clientY: event.clientY,
			pointerId: event.pointerId ?? null,
		});

		if (drag.pointerId !== null) {
			track.setPointerCapture(drag.pointerId);
		}
	};

	const onPointerMove = (event) => {
		if (event.pointerType === "touch") return;
		if (!drag.active) return;
		if (drag.pointerId !== null && event.pointerId !== drag.pointerId) return;

		moveDrag({ clientX: event.clientX, clientY: event.clientY });
	};

	const onPointerEnd = (event) => {
		if (event.pointerType === "touch") return;
		if (!drag.active) return;
		if (drag.pointerId !== null && event.pointerId !== drag.pointerId) return;

		if (drag.pointerId !== null) {
			try {
				track.releasePointerCapture(drag.pointerId);
			} catch {
				// no-op
			}
		}

		endDrag();
	};

	const onTouchStart = (event) => {
		const touch = event.touches[0];
		if (!touch) return;

		startDrag({
			clientX: touch.clientX,
			clientY: touch.clientY,
			isTouch: true,
		});
	};

	const onTouchMove = (event) => {
		if (!drag.active || !drag.isTouch) return;

		const touch = event.touches[0];
		if (!touch) return;

		const didMoveHorizontally = moveDrag({
			clientX: touch.clientX,
			clientY: touch.clientY,
		});

		if (didMoveHorizontally) {
			event.preventDefault();
		}
	};

	const onTouchEnd = () => {
		if (!drag.active || !drag.isTouch) return;
		endDrag();
	};

	const onTrackClick = (event) => {
		if (Date.now() > suppressClickUntil) return;
		event.preventDefault();
		event.stopPropagation();
	};

	prevBtn.addEventListener("click", () => move(-1));
	nextBtn.addEventListener("click", () => move(1));

	track.addEventListener("transitionend", normalizeLoopIndex);
	track.addEventListener("click", onTrackClick, true);

	viewport.addEventListener("pointerdown", onPointerDown);
	window.addEventListener("pointermove", onPointerMove, { passive: true });
	window.addEventListener("pointerup", onPointerEnd);
	window.addEventListener("pointercancel", onPointerEnd);
	track.addEventListener("lostpointercapture", onPointerEnd);
	viewport.addEventListener("touchstart", onTouchStart, { passive: true });
	window.addEventListener("touchmove", onTouchMove, { passive: false });
	window.addEventListener("touchend", onTouchEnd);
	window.addEventListener("touchcancel", onTouchEnd);

	viewport.style.touchAction = "pan-y";
	viewport.style.webkitUserSelect = "none";
	viewport.style.userSelect = "none";
	viewport.style.webkitTouchCallout = "none";
	viewport.style.cursor = "grab";
	track.style.cursor = "grab";

	let resizeTimer;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(rebuild, 150);
	});

	rebuild();
}
