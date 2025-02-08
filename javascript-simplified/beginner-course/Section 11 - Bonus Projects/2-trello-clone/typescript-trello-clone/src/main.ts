import "./utilities/tooltip.ts"
import setupDragAndDrop, { DragEndEvent } from "./dragAndDrop.ts"
import { v4 as uuid } from "uuid"
import addGlobalEventListener from "./utilities/addGlobalEventListener.ts"

const STORAGE_PREFIX = "TRELLO_CLONE"
const GROUPS_STORAGE_KEY = `${STORAGE_PREFIX}Groups`

setupDragAndDrop(onDragEnd)

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

// Challenge: Allow the user to upload and download items
// Challenge: Add the ability to create or delete groups
type Item = {
	id: string
	text: string
}
type Groups = Record<string, Item[]>
const DEFAULT_GROUPS = {
	backlog: [{ id: uuid(), text: "Create your first item with a very very long name" }],
	doing: [],
	done: []
} as Groups
const groups = loadGroups()

function loadGroups() {
	let groups = localStorage.getItem(GROUPS_STORAGE_KEY) ?? DEFAULT_GROUPS
	if (typeof groups === "string") groups = JSON.parse(groups) as Groups
	return groups
}
function saveGroups() {
	localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups))
}

const GROUPS_ELEMENT = document.querySelector(".groups") as HTMLDivElement
const GROUP_TEMPLATE = document.querySelector(
	"[data-group-template]"
) as HTMLTemplateElement
function createGroupElement(groupName: string) {
	const fragment = GROUP_TEMPLATE.content.cloneNode(true) as DocumentFragment
	const groupElement = fragment.children[0] as HTMLDivElement

	const name = groupElement.querySelector("[data-name]") as HTMLSpanElement
	name.textContent = groupName

	const deleteButton = groupElement.querySelector(
		"[data-delete-group-button]"
	) as HTMLButtonElement
	deleteButton.addEventListener("click", () => {
		delete groups[groupName]
		saveGroups()
		groupElement.remove()
	})
}
// <template data-group-template>
//   <div class="group">
//     <div class="group-header">
//       <span data-name></span>
//       <button class="icon-button" data-delete-group-button data-tooltip="Delete group">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//           <use href="#trash-can-outline"></use>
//         </svg>
//       </button>
//     </div>
//     <div class="items" data-drop-zone data-group-id=""></div>
//     <form data-item-form>
//       <input type="text" class="item-input" placeholder="Item Name" data-item-input>
//     </form>
//   </div>
// </template>

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

function removeItem(itemId: string) {
	const element = document.querySelector(`#${CSS.escape(itemId)}`) as HTMLDivElement
	const groupId = (element.closest("[data-group-id]") as HTMLDivElement).dataset
		.groupId!
	console.log(groupId)
	const groupItems = groups[groupId]
	for (let i = 0; i < groupItems.length; i++) {
		if (groupItems[i].id === element.id) {
			groupItems.splice(i, 1)
			break
		}
	}
	element.remove()
	saveGroups()
}

const ITEM_TEMPLATE = document.querySelector(
	"[data-item-template]"
) as HTMLTemplateElement
function createItemElement(item: Item) {
	const fragment = ITEM_TEMPLATE.content.cloneNode(true) as DocumentFragment
	const element = fragment.children[0] as HTMLDivElement
	element.id = item.id

	const text = element.querySelector("[data-item-text]") as HTMLDivElement
	text.innerText = item.text

	const button = element.querySelector("[data-delete-item-button]") as HTMLButtonElement
	button.addEventListener("click", () => removeItem(item.id))

	return element
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
renderItems()
