import addGlobalEventListener from "./addGlobalEventListener.js"

// Default values for spacing and the order in which positions are tried.
const DEFAULT_SPACING = 5
const POSITION_ORDER = [
	"top",
	"bottom",
	"left",
	"right",
	"top_left",
	"bottom_left",
	"top_right",
	"bottom_right"
]
const POSITION_TO_FUNCTION_MAP = {
	top: positionTooltipTop,
	bottom: positionTooltipBottom,
	left: positionTooltipLeft,
	right: positionTooltipRight,
	top_left: positionTooltipTopLeft,
	bottom_left: positionTooltipBottomLeft,
	top_right: positionTooltipTopRight,
	bottom_right: positionTooltipBottomRight
}

const tooltipContainer = document.createElement("div")
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

addGlobalEventListener("mouseover", "[data-tooltip]", e => {
	const tooltip = createTooltipElement(e.target.dataset.tooltip)
	tooltipContainer.append(tooltip)
	positionTooltip(tooltip, e.target)

	e.target.addEventListener("mouseleave", () => tooltip.remove(), { once: true })
})

function createTooltipElement(text) {
	const tooltip = document.createElement("div")
	tooltip.classList.add("tooltip")
	tooltip.innerText = text
	return tooltip
}

function positionTooltip(tooltip, element) {
	const elementRect = element.getBoundingClientRect()
	const spacing = parseInt(element.dataset.spacing) || DEFAULT_SPACING
	const preferredPositions = (element.dataset.positions || "").split("|")
	const positions = preferredPositions.concat(POSITION_ORDER)

	for (let position of positions) {
		const func = POSITION_TO_FUNCTION_MAP[position]
		if (func && func(tooltip, elementRect, spacing)) return
	}
}

function positionTooltipTop(tooltip, elementRect, spacing) {
	const { top: eTop, left: eLeft, width: eWidth } = elementRect
	const { height, width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eTop - height - spacing}px`
	tooltip.style.left = `${eLeft + eWidth / 2 - width / 2}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top) {
		resetTooltipPosition(tooltip)
		return false
	}
	if (bounds.right) {
		tooltip.style.right = `${spacing}px`
		tooltip.style.left = "initial"
	}
	if (bounds.left) {
		tooltip.style.left = `${spacing}px`
	}

	positionTooltipArrowTop(tooltip, elementRect)

	return true
}

function positionTooltipBottom(tooltip, elementRect, spacing) {
	const { bottom: eBottom, left: eLeft, width: eWidth } = elementRect
	const { width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eBottom + spacing}px`
	tooltip.style.left = `${eLeft + eWidth / 2 - width / 2}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.bottom) {
		resetTooltipPosition(tooltip)
		return false
	}
	if (bounds.right) {
		tooltip.style.right = `${spacing}px`
		tooltip.style.left = "initial"
	}
	if (bounds.left) {
		tooltip.style.left = `${spacing}px`
	}

	positionTooltipArrowBottom(tooltip, elementRect)

	return true
}

function positionTooltipLeft(tooltip, elementRect, spacing) {
	const { top: eTop, left: eLeft, height: eHeight } = elementRect
	const { height, width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eTop + eHeight / 2 - height / 2}px`
	tooltip.style.left = `${eLeft - width - spacing}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.left) {
		resetTooltipPosition(tooltip)
		return false
	}
	if (bounds.bottom) {
		tooltip.style.bottom = `${spacing}px`
		tooltip.style.top = "initial"
	}
	if (bounds.top) {
		tooltip.style.top = `${spacing}px`
	}

	positionTooltipArrowLeft(tooltip, elementRect)

	return true
}

function positionTooltipRight(tooltip, elementRect, spacing) {
	const { top: eTop, right: eRight, height: eHeight } = elementRect
	const { height } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eTop + eHeight / 2 - height / 2}px`
	tooltip.style.left = `${eRight + spacing}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.right) {
		resetTooltipPosition(tooltip)
		return false
	}
	if (bounds.bottom) {
		tooltip.style.bottom = `${spacing}px`
		tooltip.style.top = "initial"
	}
	if (bounds.top) {
		tooltip.style.top = `${spacing}px`
	}

	positionTooltipArrowRight(tooltip, elementRect)

	return true
}

function isOutOfBounds(element, spacing) {
	const { left, right, top, bottom } = element.getBoundingClientRect()
	const {
		left: containerLeft,
		right: containerRight,
		top: containerTop,
		bottom: containerBottom
	} = tooltipContainer.getBoundingClientRect()

	return {
		left: left <= containerLeft + spacing,
		right: right >= containerRight - spacing,
		top: top <= containerTop + spacing,
		bottom: bottom >= containerBottom - spacing
	}
}

function resetTooltipPosition(tooltip) {
	tooltip.style.top = "initial"
	tooltip.style.left = "initial"
	tooltip.style.right = "initial"
	tooltip.style.bottom = "initial"
}

// CHALLENGES
/**
 * Challenge 1: Allow the tooltip to be positioned on the corners of the elements.
 * 		Adds 4 new positions: top-left, top-right, bottom-left, bottom-right.
 */
function positionTooltipTopLeft(tooltip, elementRect, spacing) {
	const { top: eTop, left: eLeft, width: eWidth } = elementRect
	const { height, width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eTop - height - spacing}px`
	tooltip.style.left = `${eLeft - width - spacing}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top || bounds.left) {
		resetTooltipPosition(tooltip)
		return false
	}

	positionTooltipArrowTopLeft(tooltip, elementRect)

	return true
}

function positionTooltipBottomLeft(tooltip, elementRect, spacing) {
	const { bottom: eBottom, left: eLeft, width: eWidth } = elementRect
	const { width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eBottom + spacing}px`
	tooltip.style.left = `${eLeft - width - spacing}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.bottom || bounds.left) {
		resetTooltipPosition(tooltip)
		return false
	}

	positionTooltipArrowBottomLeft(tooltip, elementRect)

	return true
}

function positionTooltipTopRight(tooltip, elementRect, spacing) {
	const { top: eTop, right: eRight, width: eWidth } = elementRect
	const { height, width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eTop - height - spacing}px`
	tooltip.style.left = `${eRight + spacing}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top || bounds.right) {
		resetTooltipPosition(tooltip)
		return false
	}

	positionTooltipArrowTopRight(tooltip, elementRect)

	return true
}

function positionTooltipBottomRight(tooltip, elementRect, spacing) {
	const { bottom: eBottom, right: eRight, width: eWidth } = elementRect
	const { width } = tooltip.getBoundingClientRect()

	tooltip.style.top = `${eBottom + spacing}px`
	tooltip.style.left = `${eRight + spacing}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.bottom || bounds.right) {
		resetTooltipPosition(tooltip)
		return false
	}

	positionTooltipArrowBottomRight(tooltip, elementRect)

	return true
}

/**
 * Challenge 2: Add an "arrow" to the tooltip when it is opened.
 * 		Clarification: The intention is to make the tooltip look like a speech bubble.
 */
function positionTooltipArrowTop(tooltip, elementRect) {
	tooltip.style.setProperty("--arrow-translate-x", "-50%")
	tooltip.style.setProperty("--arrow-translate-y", "0%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "inherit")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-body-top-color", "white")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-top", "100%")
	tooltip.style.setProperty("--arrow-right", "initial")
	tooltip.style.setProperty("--arrow-bottom", "initial")

	const { left: eLeft, width: eWidth } = elementRect
	const { left, width } = tooltip.getBoundingClientRect()
	const elementMidpoint = eLeft + eWidth / 2
	tooltip.style.setProperty(
		"--arrow-left",
		`${((elementMidpoint - left) / width) * 100}%`
	)
}

function positionTooltipArrowBottom(tooltip, elementRect) {
	tooltip.style.setProperty("--arrow-translate-x", "-50%")
	tooltip.style.setProperty("--arrow-translate-y", "0%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "transparent")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "inherit")
	tooltip.style.setProperty("--arrow-body-top-color", "transparent")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "white")
	tooltip.style.setProperty("--arrow-top", "initial")
	tooltip.style.setProperty("--arrow-right", "initial")
	tooltip.style.setProperty("--arrow-bottom", "100%")

	const { left: eLeft, width: eWidth } = elementRect
	const { left, width } = tooltip.getBoundingClientRect()
	const elementMidpoint = eLeft + eWidth / 2
	tooltip.style.setProperty(
		"--arrow-left",
		`${((elementMidpoint - left) / width) * 100}%`
	)
}

function positionTooltipArrowLeft(tooltip, elementRect) {
	tooltip.style.setProperty("--arrow-translate-x", "0%")
	tooltip.style.setProperty("--arrow-translate-y", "-50%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "transparent")
	tooltip.style.setProperty("--arrow-border-left-color", "inherit")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-body-top-color", "transparent")
	tooltip.style.setProperty("--arrow-body-left-color", "white")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-left", "100%")
	tooltip.style.setProperty("--arrow-right", "initial")
	tooltip.style.setProperty("--arrow-bottom", "initial")

	const { top: eTop, height: eHeight } = elementRect
	const { top, height } = tooltip.getBoundingClientRect()
	const elementMidpoint = eTop + eHeight / 2
	tooltip.style.setProperty(
		"--arrow-top",
		`${((elementMidpoint - top) / height) * 100}%`
	)
}

function positionTooltipArrowRight(tooltip, elementRect) {
	tooltip.style.setProperty("--arrow-translate-x", "0%")
	tooltip.style.setProperty("--arrow-translate-y", "-50%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "transparent")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "inherit")
	tooltip.style.setProperty("--arrow-border-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-body-top-color", "transparent")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "white")
	tooltip.style.setProperty("--arrow-body-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-left", "initial")
	tooltip.style.setProperty("--arrow-right", "100%")
	tooltip.style.setProperty("--arrow-bottom", "initial")

	const { top: eTop, height: eHeight } = elementRect
	const { top, height } = tooltip.getBoundingClientRect()
	const elementMidpoint = eTop + eHeight / 2
	tooltip.style.setProperty(
		"--arrow-top",
		`${((elementMidpoint - top) / height) * 100}%`
	)
}

function positionTooltipArrowTopLeft(tooltip) {
	tooltip.style.setProperty("--arrow-translate-x", "0%")
	tooltip.style.setProperty("--arrow-translate-y", "0%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "inherit")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-body-top-color", "white")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-top", "100%")
	tooltip.style.setProperty("--arrow-left", "initial")
	tooltip.style.setProperty("--arrow-right", "0%")
	tooltip.style.setProperty("--arrow-bottom", "initial")
}

function positionTooltipArrowBottomLeft(tooltip) {
	tooltip.style.setProperty("--arrow-translate-x", "0%")
	tooltip.style.setProperty("--arrow-translate-y", "0%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "transparent")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "inherit")
	tooltip.style.setProperty("--arrow-body-top-color", "transparent")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "white")
	tooltip.style.setProperty("--arrow-top", "initial")
	tooltip.style.setProperty("--arrow-left", "initial")
	tooltip.style.setProperty("--arrow-right", "0%")
	tooltip.style.setProperty("--arrow-bottom", "100%")
}

function positionTooltipArrowTopRight(tooltip) {
	tooltip.style.setProperty("--arrow-translate-x", "0%")
	tooltip.style.setProperty("--arrow-translate-y", "0%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "inherit")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-body-top-color", "white")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "transparent")
	tooltip.style.setProperty("--arrow-top", "100%")
	tooltip.style.setProperty("--arrow-left", "initial")
	tooltip.style.setProperty("--arrow-right", "100%")
	tooltip.style.setProperty("--arrow-bottom", "initial")
}

function positionTooltipArrowBottomRight(tooltip) {
	tooltip.style.setProperty("--arrow-translate-x", "0%")
	tooltip.style.setProperty("--arrow-translate-y", "0%")
	tooltip.style.setProperty("--arrow-border-size", "10px")
	tooltip.style.setProperty("--arrow-border-top-color", "transparent")
	tooltip.style.setProperty("--arrow-border-left-color", "transparent")
	tooltip.style.setProperty("--arrow-border-right-color", "transparent")
	tooltip.style.setProperty("--arrow-border-bottom-color", "inherit")
	tooltip.style.setProperty("--arrow-body-top-color", "transparent")
	tooltip.style.setProperty("--arrow-body-left-color", "transparent")
	tooltip.style.setProperty("--arrow-body-right-color", "transparent")
	tooltip.style.setProperty("--arrow-body-bottom-color", "white")
	tooltip.style.setProperty("--arrow-top", "initial")
	tooltip.style.setProperty("--arrow-left", "initial")
	tooltip.style.setProperty("--arrow-right", "100%")
	tooltip.style.setProperty("--arrow-bottom", "100%")
}
