import addGlobalEventListener from "./utilities/addGlobalEventListener.ts"

type Offset = {
	x: number
	y: number
}

export type DragEndEvent = {
	startZone: HTMLElement
	endZone: HTMLElement
	dragElement: HTMLElement
	index: number
}

type DragEndCallback = (options: DragEndEvent) => void

export default function setup(onDragEnd: DragEndCallback) {
	addGlobalEventListener("mousedown", "[data-draggable]", e => {
		const selectedItem = e.target as HTMLElement
		const itemClone = selectedItem.cloneNode(true) as HTMLElement
		const ghost = selectedItem.cloneNode() as HTMLElement
		const offset = setupDragItems(selectedItem, itemClone, ghost, e as MouseEvent)
		setupDragEvents(selectedItem, itemClone, ghost, offset, onDragEnd)
	})
}

function setupDragItems(
	selectedItem: HTMLElement,
	itemClone: HTMLElement,
	ghost: HTMLElement,
	e: MouseEvent
) {
	const originalRect = selectedItem.getBoundingClientRect()
	const offset = {
		x: e.clientX - originalRect.left,
		y: e.clientY - originalRect.top
	} as Offset

	selectedItem.classList.add("hide")

	itemClone.style.width = `${originalRect.width}px`
	itemClone.classList.add("dragging")
	positionClone(itemClone, e as MouseEvent, offset)
	document.body.append(itemClone)

	ghost.style.height = `${originalRect.height}px`
	ghost.classList.add("ghost")
	ghost.innerHTML = ""
	selectedItem.parentElement?.insertBefore(ghost, selectedItem)

	return offset
}

function setupDragEvents(
	selectedItem: HTMLElement,
	itemClone: HTMLElement,
	ghost: HTMLElement,
	offset: Offset,
	onDragEnd: DragEndCallback
) {
	const mouseMoveFunction = (e: Event) => {
		positionClone(itemClone, e as MouseEvent, offset)

		const dropZone = getDropZone(e.target as HTMLElement)
		if (dropZone === null) return
		const closestChild = Array.from(dropZone.children).find(child => {
			const rect = child.getBoundingClientRect()
			return (e as MouseEvent).clientY < rect.top + rect.height / 2
		})
		if (closestChild !== undefined) {
			dropZone.insertBefore(ghost, closestChild)
		} else {
			dropZone.append(ghost)
		}
	}

	document.addEventListener("mousemove", mouseMoveFunction)
	document.addEventListener(
		"mouseup",
		() => {
			document.removeEventListener("mousemove", mouseMoveFunction)
			const dropZone = getDropZone(ghost)
			if (dropZone !== null) {
				onDragEnd({
					startZone: getDropZone(selectedItem) as HTMLElement,
					endZone: dropZone as HTMLElement,
					dragElement: selectedItem,
					index: Array.from(dropZone.children).indexOf(ghost)
				})
				dropZone.insertBefore(selectedItem, ghost)
			}
			dragEnd(selectedItem, itemClone, ghost)
		},
		{ once: true }
	)
}

function positionClone(
	itemClone: HTMLElement,
	mousePosition: MouseEvent,
	offset: Offset
) {
	itemClone.style.top = `${mousePosition.clientY - offset.y}px`
	itemClone.style.left = `${mousePosition.clientX - offset.x}px`
}

function dragEnd(selectedItem: HTMLElement, itemClone: HTMLElement, ghost: HTMLElement) {
	selectedItem.classList.remove("hide")
	itemClone.remove()
	ghost.remove()
}

function getDropZone(element: HTMLElement) {
	if (element.matches("[data-drop-zone]")) return element
	return element.closest("[data-drop-zone]")
}
