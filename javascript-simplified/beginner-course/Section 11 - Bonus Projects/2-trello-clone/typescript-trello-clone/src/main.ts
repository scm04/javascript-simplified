import "./utilities/tooltip.ts"
import setupDragAndDrop, { DragEndEvent } from "./dragAndDrop.ts"
import { v4 as uuid } from "uuid"
import addGlobalEventListener from "./utilities/addGlobalEventListener.ts"

const STORAGE_PREFIX = "TRELLO_CLONE"
const GROUPS_STORAGE_KEY = `${STORAGE_PREFIX}Groups`

// Challenge: Allow the user to upload and download tasks
// Challenge: Add the ability to create or delete groups
type Task = {
	id: string
	text: string
}
const DEFAULT_GROUPS = {
	backlog: [{ id: uuid(), text: "Create your first task" }],
	doing: [],
	done: []
} as Record<string, Task[]>
const groups = loadGroups()
renderTasks()

setupDragAndDrop(onDragEnd)

addGlobalEventListener("submit", "[data-task-form]", e => {
	e.preventDefault()

	const taskForm = e.target as HTMLFormElement
	const taskInput = taskForm.querySelector("[data-task-input]") as HTMLInputElement
	const taskText = taskInput.value
	if (taskText === "") return

	const task = { id: uuid(), text: taskText } as Task
	const groupElement = (taskForm.closest(".group") as HTMLDivElement).querySelector(
		"[data-group-id]"
	) as HTMLDivElement
	groups[groupElement.dataset.groupId as string].push(task)

	const taskElement = createTaskElement(task)
	groupElement.append(taskElement)
	taskInput.value = ""

	saveGroups()
})

function onDragEnd(event: DragEndEvent) {
	const startGroupId = event.startZone.dataset.groupId as string
	const endGroupId = event.endZone.dataset.groupId as string
	const startGroupTasks = groups[startGroupId]
	const endGroupTasks = groups[endGroupId]

	const task = startGroupTasks.find(t => t.id === event.dragElement.id) as Task
	startGroupTasks.splice(startGroupTasks.indexOf(task), 1)
	endGroupTasks.splice(event.index, 0, task)
	saveGroups()
}

function loadGroups() {
	let groups = localStorage.getItem(GROUPS_STORAGE_KEY) ?? DEFAULT_GROUPS
	if (typeof groups === "string") groups = JSON.parse(groups) as Record<string, Task[]>
	return groups
}

function saveGroups() {
	localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups))
}

function renderTasks() {
	Object.entries(groups).forEach(([groupId, tasks]) => {
		const group = document.querySelector(
			`[data-group-id="${groupId}"]`
		) as HTMLDivElement
		tasks.forEach(task => {
			const taskElement = createTaskElement(task)
			group.append(taskElement)
		})
	})
}

function createTaskElement(task: Task) {
	const element = document.createElement("div")
	element.id = task.id
	element.innerText = task.text
	element.classList.add("task")
	element.dataset.draggable = "true"

	return element
}
