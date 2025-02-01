import addGlobalEventListener from "./utilities/addGlobalEventListener.ts"

const DEFAULT_SPACING = "5"
const POSITION_ORDER = [
	"top",
	"bottom",
	"left",
	"right",
	"top_left",
	"top_right",
	"bottom_left",
	"bottom_right"
]
const POSITION_TO_FUNCTION_MAP = {
	top: positionTooltipTop,
	bottom: positionTooltipBottom,
	left: positionTooltipLeft,
	right: positionTooltipRight,
	top_left: positionTooltipTopLeft,
	top_right: positionTooltipTopRight,
	bottom_left: positionTooltipBottomLeft,
	bottom_right: positionTooltipBottomRight
} as Record<string, Function>

// (DONE) Add a container to put a tooltip in
const tooltipContainer = document.createElement("div")
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

// (DONE) 1. Show the tooltip on hover
// 2. Position the tooltip
// (DONE) 3. Remove the tooltip when hover ends
addGlobalEventListener("mouseover", "[data-tooltip]", e => {
	const target = e.target as HTMLElement
	const tooltip = createTooltipElement(target.dataset.tooltip as string)
	tooltipContainer.append(tooltip)
	positionTooltip(tooltip, target)
	// target.addEventListener(
	// 	"mouseleave",
	// 	() => {
	// 		tooltip.remove()
	// 	},
	// 	{ once: true }
	// )
})

function createTooltipElement(tooltipText: string) {
	const tooltip = document.createElement("div")
	tooltip.classList.add("tooltip")
	tooltip.innerText = tooltipText
	return tooltip
}

// Positioning functions
function isOutOfBounds(tooltip: HTMLDivElement, spacing: number) {
	const tooltipRect = tooltip.getBoundingClientRect()
	const tooltipContainerRect = tooltipContainer.getBoundingClientRect()

	return {
		left: tooltipRect.left <= tooltipContainerRect.left + spacing,
		right: tooltipRect.right >= tooltipContainerRect.right - spacing,
		top: tooltipRect.top <= tooltipContainerRect.top + spacing,
		bottom: tooltipRect.bottom >= tooltipContainerRect.bottom - spacing
	}
}

function resetTooltipPosition(tooltip: HTMLDivElement) {
	tooltip.style.left = "initial"
	tooltip.style.right = "initial"
	tooltip.style.top = "initial"
	tooltip.style.bottom = "initial"
}

function positionTooltip(tooltip: HTMLDivElement, target: HTMLElement) {
	const targetRect = target.getBoundingClientRect()
	const spacing = parseInt(target.dataset.spacing ?? DEFAULT_SPACING)
	const preferredPositions = (target.dataset.positions ?? "").split("|")
	const positions = new Set<string>(preferredPositions.concat(POSITION_ORDER))

	for (const position of positions) {
		if (!(position in POSITION_TO_FUNCTION_MAP)) continue
		if (POSITION_TO_FUNCTION_MAP[position](tooltip, targetRect, spacing)) return
	}
}

function positionTooltipTop(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.style.top = `${targetRect.top - tooltipRect.height - spacing}px`
	tooltip.style.left = `${
		targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
	}px`

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

function positionTooltipBottom(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.style.top = `${targetRect.bottom + spacing}px`
	tooltip.style.left = `${
		targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
	}px`

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

function positionTooltipLeft(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.style.top = `${
		targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
	}px`
	tooltip.style.left = `${targetRect.left - tooltipRect.width - spacing}px`

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

function positionTooltipRight(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.style.top = `${
		targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
	}px`
	tooltip.style.left = `${targetRect.right + spacing}px`

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

function positionTooltipTopLeft(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.style.top = `${targetRect.top - tooltipRect.height - spacing}px`
	tooltip.style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	// This is not correct yet. I need to figure out how the logic should work when the tooltip is out of bounds.
	if (bounds.top || bounds.left) {
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

function positionTooltipTopRight(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	// This is not correct yet. I need to figure out what the initial position should be and how the logic should work when the tooltip is out of bounds.
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.style.top = `${targetRect.top - tooltipRect.height - spacing}px`
	tooltip.style.left = `${
		targetRect.right + targetRect.width / 2 + tooltipRect.width
	}px`

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

function positionTooltipBottomLeft(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {}

function positionTooltipBottomRight(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {}

// CHALLENGE 1: Add other positions (top-left, top-right, bottom-left, bottom-right)
// CHALLENGE 2: Add a speech-bubble-style arrow to the tooltip.
