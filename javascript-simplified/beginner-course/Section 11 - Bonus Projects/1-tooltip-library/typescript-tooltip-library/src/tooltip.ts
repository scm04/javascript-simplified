import addGlobalEventListener from "./utilities/addGlobalEventListener.ts"

/**
 * The default value for the space between the tooltip and the element
 * the tooltip is for. Also the default size of the arrow/tail of the
 * tooltip. To override this value, add the data attribute
 * [data-spacing-and-arrow-size="\<number\>"] to any HTML element that
 * also has a [data-tooltip] data attribute.
 */
const DEFAULT_SPACING_AND_ARROW_SIZE = "10"
/**
 * The default order to use when positioning the tooltip.
 * To override this value, add the data attribute
 * [data-positions="\<position-list\>"] to any HTML element that also
 * has a [data-tooltip] data attribute. \<position-list\> is a list of
 * one or more \<string\> values separated by a pipe ("|") symbol.
 */
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
	tooltip.style.setProperty(
		"--arrow-size",
		`${target.dataset.spacingAndArrowSize ?? DEFAULT_SPACING_AND_ARROW_SIZE}px`
	)
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
	tooltip.classList.remove(
		"arrow-top",
		"arrow-bottom",
		"arrow-left",
		"arrow-right",
		"arrow-top-left",
		"arrow-top-right",
		"arrow-bottom-left",
		"arrow-bottom-right"
	)
}

function positionTooltip(tooltip: HTMLDivElement, target: HTMLElement) {
	const targetRect = target.getBoundingClientRect()
	const spacing = parseInt(
		target.dataset.spacingAndArrowSize ?? DEFAULT_SPACING_AND_ARROW_SIZE
	)
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
	// Tooltip positioning
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

	// Arrow positioning
	const arrowSize = parseInt(tooltip.style.getPropertyValue("--arrow-size"))
	tooltip.style.setProperty("--arrow-top", `${tooltipRect.bottom}px`)
	tooltip.style.setProperty(
		"--arrow-left",
		`${tooltipRect.left + tooltipRect.width / 2 - arrowSize}px`
	)
	tooltip.classList.add("arrow-top")

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

	// Arrow positioning
	const arrowSize = parseInt(tooltip.style.getPropertyValue("--arrow-size"))
	tooltip.style.setProperty("--arrow-top", `${tooltipRect.top - arrowSize * 2}px`)
	tooltip.style.setProperty(
		"--arrow-left",
		`${tooltipRect.left + tooltipRect.width / 2 - arrowSize}px`
	)
	tooltip.classList.add("arrow-bottom")

	return true
}

function positionTooltipLeft(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.classList.add("arrow-left")
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
	tooltip.classList.add("arrow-right")
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
	tooltip.classList.add("arrow-top-left")
	tooltip.style.top = `${targetRect.top - tooltipRect.height - spacing}px`
	tooltip.style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top || bounds.left) {
		resetTooltipPosition(tooltip)
		return false
	}

	return true
}

function positionTooltipTopRight(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.classList.add("arrow-top-right")
	tooltip.style.top = `${targetRect.top - tooltipRect.height - spacing}px`
	tooltip.style.left = `${targetRect.right - targetRect.width / 2}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top || bounds.right) {
		resetTooltipPosition(tooltip)
		return false
	}

	return true
}

function positionTooltipBottomLeft(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	const tooltipRect = tooltip.getBoundingClientRect()
	tooltip.classList.add("arrow-bottom-left")
	tooltip.style.top = `${targetRect.bottom + spacing}px`
	tooltip.style.left = `${targetRect.left + targetRect.width / 2 - tooltipRect.width}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top || bounds.left) {
		resetTooltipPosition(tooltip)
		return false
	}

	return true
}

function positionTooltipBottomRight(
	tooltip: HTMLDivElement,
	targetRect: DOMRect,
	spacing: number
) {
	tooltip.classList.add("arrow-bottom-right")
	tooltip.style.top = `${targetRect.bottom + spacing}px`
	tooltip.style.left = `${targetRect.right - targetRect.width / 2}px`

	const bounds = isOutOfBounds(tooltip, spacing)
	if (bounds.top || bounds.right) {
		resetTooltipPosition(tooltip)
		return false
	}

	return true
}

// (DONE) CHALLENGE 1: Add other positions (top-left, top-right, bottom-left, bottom-right)
// CHALLENGE 2: Add a speech-bubble-style arrow to the tooltip.
