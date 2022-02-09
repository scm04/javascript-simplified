import addGlobalEventListener from "./utils/addGlobalEventListener.js"

const DEFAULT_SPACING = 5
const POSITION_ORDER = ["top", "bottom", "left", "right"]
const POSITION_TO_FUNCTION_MAP = {
	top: positionTooltipTop,
	bottom: positionTooltipBottom,
	left: positionTooltipLeft,
	right: positionTooltipRight
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
// over top of element

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

/**
 * Challenge 2: Add an "arrow" to the tooltip when it is opened.
 * 		Clarification: The intention is to make the tooltip look like a speech bubble.
 */
