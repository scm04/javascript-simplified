import "./utilities/tooltip.ts"
import setupDragAndDrop, { DragEndEvent } from "./dragAndDrop.ts"
import { v4 as uuid } from "uuid"
import addGlobalEventListener from "./utilities/addGlobalEventListener.ts"

const STORAGE_PREFIX = "TRELLO_CLONE"
const GROUPS_STORAGE_KEY = `${STORAGE_PREFIX}Groups`

// Challenge: Allow the user to upload and download items
// Challenge: Add the ability to create or delete groups
type Item = {
	id: string
	text: string
}
const DEFAULT_GROUPS = {
	backlog: [{ id: uuid(), text: "Create your first item with a very very long name" }],
	doing: [],
	done: []
} as Record<string, Item[]>
const groups = loadGroups()
renderItems()

setupDragAndDrop(onDragEnd)

addGlobalEventListener("submit", "[data-item-form]", e => {
	e.preventDefault()

	const itemForm = e.target as HTMLFormElement
	const itemInput = itemForm.querySelector("[data-item-input]") as HTMLInputElement
	const itemText = itemInput.value
	if (itemText === "") return

	const item = { id: uuid(), text: itemText } as Item
	const groupElement = (itemForm.closest(".group") as HTMLDivElement).querySelector(
		"[data-group-id]"
	) as HTMLDivElement
	groups[groupElement.dataset.groupId as string].push(item)

	const itemElement = createItemElement(item)
	groupElement.append(itemElement)
	itemInput.value = ""

	saveGroups()
})

function onDragEnd(event: DragEndEvent) {
	const startGroupId = event.startZone.dataset.groupId as string
	const endGroupId = event.endZone.dataset.groupId as string
	const startGroupItems = groups[startGroupId]
	const endGroupItems = groups[endGroupId]

	const item = startGroupItems.find(t => t.id === event.dragElement.id) as Item
	startGroupItems.splice(startGroupItems.indexOf(item), 1)
	endGroupItems.splice(event.index, 0, item)
	saveGroups()
}

function loadGroups() {
	let groups = localStorage.getItem(GROUPS_STORAGE_KEY) ?? DEFAULT_GROUPS
	if (typeof groups === "string") groups = JSON.parse(groups) as Record<string, Item[]>
	return groups
}

function saveGroups() {
	localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups))
}

function renderItems() {
	Object.entries(groups).forEach(([groupId, items]) => {
		const group = document.querySelector(
			`[data-group-id="${groupId}"]`
		) as HTMLDivElement
		items.forEach(item => {
			const itemElement = createItemElement(item)
			group.append(itemElement)
		})
	})
}

function createItemElement(item: Item) {
	const element = document.createElement("div")
	element.id = item.id
	element.classList.add("item")
	element.dataset.draggable = "true"

	const text = document.createElement("div")
	text.innerText = item.text
	text.dataset.itemName = "true"
	element.append(text)

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("viewBox", "0 0 24 24")
	const useTag = document.createElementNS("http://www.w3.org/2000/svg", "use")
	useTag.setAttribute("href", "#close")
	svg.append(useTag)

	const button = document.createElement("button")
	button.classList.add("icon-button")
	button.dataset.deleteItemButton = "true"
	button.dataset.tooltip = "Delete item"
	button.append(svg)
	element.append(button)

	return element
}
