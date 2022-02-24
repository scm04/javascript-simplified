// CHALLENGES
import setupImportExport from "./challenges/taskImportExport.js"
setupImportExport(
	newLanes => {
		lanes = newLanes
		saveLanes()
		renderLanes()
	},
	() => lanes
)

import "./utils/tooltip.js"
import addGlobalEventListener from "./utils/addGlobalEventListener.js"
import setupDragAndDrop from "./dragAndDrop.js"
import { v4 as uuidV4 } from "uuid"

const STORAGE_PREFIX = "TRELLO_CLONE"
const LANES_STORAGE_KEY = `${STORAGE_PREFIX}-lanes`
const DEFAULT_LANES = {
	backlog: {
		name: "Backlog",
		tasks: [
			{ id: uuidV4(), text: "Create your first task" },
			{ id: uuidV4(), text: "A second task" },
			{ id: uuidV4(), text: "This one will make a difference" }
		]
	},
	doing: {
		name: "Doing",
		tasks: []
	},
	done: {
		name: "Done",
		tasks: []
	}
}
let lanes = loadLanes()
const lanesContainer = document.querySelector("[data-lanes-container]")
const laneTemplate = document.querySelector("[data-lane-template]")
const taskTemplate = document.querySelector("[data-task-template]")
renderLanes()

setupDragAndDrop(onDragComplete)

addGlobalEventListener("submit", "[data-task-form]", e => {
	e.preventDefault()

	const taskInput = e.target.querySelector("[data-task-input]")
	const taskText = taskInput.value
	if (taskText === "") return

	const task = { id: uuidV4(), text: taskText }
	const laneElement = e.target.closest(".lane").querySelector("[data-lane-id]")
	lanes[laneElement.dataset.laneId].tasks.push(task)

	const taskElement = createTaskElement(task)
	laneElement.append(taskElement)
	taskInput.value = ""

	saveLanes()
})

function onDragComplete(e) {
	const startLaneId = e.startZone.dataset.laneId
	const endLaneId = e.endZone.dataset.laneId
	const startLaneTasks = lanes[startLaneId].tasks
	const endLaneTasks = lanes[endLaneId].tasks

	const task = startLaneTasks[e.startIndex]
	startLaneTasks.splice(e.startIndex, 1)
	endLaneTasks.splice(e.endIndex, 0, task)
	saveLanes()
}

function loadLanes() {
	return JSON.parse(localStorage.getItem(LANES_STORAGE_KEY)) || DEFAULT_LANES
}

function saveLanes() {
	localStorage.setItem(LANES_STORAGE_KEY, JSON.stringify(lanes))
}

// Original solution to adding tasks, rendered obsolete during
// Challenge 2 (see code below)
function renderTasks() {
	Object.entries(lanes).forEach(([laneId, { name, tasks }]) => {
		const lane = document.querySelector(`[data-lane-id="${laneId}"]`)
		clearLane(lane)
		tasks.forEach(task => {
			const taskElement = createTaskElement(task)
			lane.append(taskElement)
		})
	})
}

function clearLane(lane) {
	while (lane.children.length) {
		lane.firstChild.remove()
	}
}

function createTaskElement(task) {
	const element = taskTemplate.content.children[0].cloneNode(true)
	element.id = task.id

	const name = element.querySelector("[data-task-name]")
	name.innerText = task.text

	const deleteButton = element.querySelector("[data-delete-button]")
	deleteButton.addEventListener("click", () => {
		const laneId = element.closest("[data-lane-id]").dataset.laneId
		const lane = lanes[laneId]
		const tasks = lane.tasks

		const task = tasks.find(t => t.id === element.id)
		tasks.splice(tasks.indexOf(task), 1)
		element.remove()

		saveLanes()
	})

	return element
}

// CHALLENGES
/**
 * Challenge 2: Add the ability to add and remove lanes.
 * 		- As part of this, I'll also add the ability to remove tasks.
 */
function clearLanes() {
	while (lanesContainer.children.length) {
		lanesContainer.firstChild.remove()
	}
}

function createLane(laneId, laneName) {
	const laneElement = laneTemplate.content.children[0].cloneNode(true)

	const header = laneElement.querySelector("[data-header]")
	header.innerText = laneName

	const dropZone = laneElement.querySelector("[data-drop-zone]")
	dropZone.dataset.laneId = laneId

	const deleteButton = laneElement.querySelector("[data-delete-button]")
	deleteButton.addEventListener("click", () => {
		laneElement.remove()
		delete lanes[laneId]
		saveLanes()
	})

	return laneElement
}

const newLaneForm = document.querySelector("#new-lane-form")
const newLaneInput = document.querySelector("#new-lane-input")
newLaneForm.addEventListener("submit", e => {
	e.preventDefault()

	const newLaneName = newLaneInput.value
	if (newLaneName === "") return
	newLaneInput.value = ""

	const laneId = newLaneName.toLowerCase().replaceAll(" ", "-")
	const lane = { name: newLaneName, tasks: [] }
	if (lanes[laneId]) return
	lanes[laneId] = lane
	const laneElement = createLane(laneId, newLaneName)
	lanesContainer.append(laneElement)
})

function renderLanes() {
	clearLanes()
	Object.entries(lanes).forEach(([laneId, { name, tasks }]) => {
		const laneElement = createLane(laneId, name)
		lanesContainer.append(laneElement)
		const lane = laneElement.querySelector("[data-lane-id]")
		tasks.forEach(task => {
			const taskElement = createTaskElement(task)
			lane.append(taskElement)
		})
	})
}
