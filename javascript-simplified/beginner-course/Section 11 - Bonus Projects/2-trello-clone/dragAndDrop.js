import addGlobalEventListener from "./utils/addGlobalEventListener.js"

export default function setup(onDragComplete) {
	addGlobalEventListener("mousedown", "[data-draggable]", e => {
		const selectedItem = e.target
		const itemClone = selectedItem.cloneNode(true)
		const ghost = selectedItem.cloneNode()
		const offset = setupDragItems(selectedItem, itemClone, ghost, e)
		setupDragEvents(selectedItem, itemClone, ghost, offset, onDragComplete)
	})
}

function setupDragItems(selectedItem, itemClone, ghost, e) {
	const originalRect = selectedItem.getBoundingClientRect()
	const offset = {
		x: e.clientX - originalRect.left,
		y: e.clientY - originalRect.top
	}

	selectedItem.classList.add("hide")

	itemClone.classList.add("dragging")
	itemClone.style.width = `${originalRect.width}px`
	positionClone(itemClone, e, offset)
	document.body.append(itemClone)

	ghost.style.height = `${originalRect.height}px`
	ghost.classList.add("ghost")
	ghost.innerHTML = ""
	selectedItem.parentElement.insertBefore(ghost, selectedItem)

	return offset
}

function setupDragEvents(selectedItem, itemClone, ghost, offset, onDragComplete) {
	const mouseMoveFunction = e => {
		positionClone(itemClone, e, offset)

		const dropZone = getDropZone(e.target)
		if (dropZone == null) return
		positionGhost(ghost, dropZone, e)
	}
	document.addEventListener("mousemove", mouseMoveFunction)

	document.addEventListener(
		"mouseup",
		() => {
			document.removeEventListener("mousemove", mouseMoveFunction)

			const dropZone = getDropZone(ghost)
			if (dropZone) {
				const startZone = getDropZone(selectedItem)
				const sameZone = dropZone.dataset.laneId === startZone.dataset.laneId
				const startIndex = Array.from(startZone.children).indexOf(selectedItem)
				const endIndex = Array.from(dropZone.children).indexOf(ghost)
				onDragComplete({
					startZone: startZone,
					endZone: dropZone,
					dragElement: selectedItem,
					startIndex: startIndex - (sameZone && startIndex > endIndex ? 1 : 0),
					endIndex: endIndex - (sameZone && endIndex > startIndex ? 1 : 0)
				})
				dropZone.insertBefore(selectedItem, ghost)
			}

			stopDrag(selectedItem, itemClone, ghost)
		},
		{ once: true }
	)
}

function positionClone(itemClone, mousePosition, offset) {
	itemClone.style.top = `${mousePosition.clientY - offset.y}px`
	itemClone.style.left = `${mousePosition.clientX - offset.x}px`
}

function stopDrag(selectedItem, itemClone, ghost) {
	selectedItem.classList.remove("hide")
	itemClone.remove()
	ghost.remove()
}

function getDropZone(element) {
	if (element.matches("[data-drop-zone]")) return element

	return element.closest("[data-drop-zone]")
}

function positionGhost(ghost, dropZone, e) {
	const closestChild = Array.from(dropZone.children).find(child => {
		const rect = child.getBoundingClientRect()
		return e.clientY < rect.top + rect.height / 2
	})
	if (closestChild != null) {
		dropZone.insertBefore(ghost, closestChild)
	} else {
		dropZone.append(ghost)
	}
}
