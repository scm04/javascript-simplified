/**
 * Challenge 1: Add buttons to allow a person to download and upload their tasks.
 * 		- Give the user a JSON output for their tasks when downloading and allow
 * 			them to upload a JSON of their tasks. (The lanes variable works for this.)
 * 		- I want to do this in two forms:
 * 			1. Directly copy/paste JSON text.
 * 			2. Download/upload a .json file. (Could extend this to upload .js file as
 * 				well, but I don't want to go that far for this project.)
 */
let setLanes
let getLanes
export default function setupImportExport(setter, getter) {
	setLanes = setter
	getLanes = getter
}

// Import tasks
const uploadButton = document.querySelector("[data-upload-button]")
const uploadPopup = document.querySelector("#upload-popup")
const uploadTextarea = document.querySelector("#upload-textarea")
function openUploadPopup() {
	uploadPopup.classList.remove("hide")
	togglePopupOverlay()
}
uploadButton.addEventListener("click", openUploadPopup)

// File Upload Helpers
function stopPropagationAndPreventDefault(e) {
	e.stopPropagation()
	e.preventDefault()
}

function loadFile(file) {
	const reader = new FileReader()
	reader.onload = () => {
		const parsed = JSON.parse(reader.result)
		uploadTextarea.value = JSON.stringify(parsed, null, 2)
	}
	reader.readAsText(file)
}

function getDragFile(e) {
	const files = e.dataTransfer.files
	loadFile(files[0])
}

// Drag file onto body
document.addEventListener("dragenter", stopPropagationAndPreventDefault)
document.addEventListener("dragover", stopPropagationAndPreventDefault)
document.addEventListener("drop", e => {
	stopPropagationAndPreventDefault(e)
	const uploadPopupOpen = !uploadPopup.classList.contains("hide")
	const downloadPopupOpen = !downloadPopup.classList.contains("hide")
	if (uploadPopupOpen || downloadPopupOpen) return
	openUploadPopup()
	getDragFile(e)
})

// Drag file onto text area
uploadTextarea.addEventListener("dragenter", stopPropagationAndPreventDefault)
uploadTextarea.addEventListener("dragover", stopPropagationAndPreventDefault)
uploadTextarea.addEventListener("drop", e => {
	stopPropagationAndPreventDefault(e)
	getDragFile(e)
})

// Select file through upload button
const uploadJSONButton = document.querySelector("#upload-json-button")
const uploadFileSelector = document.querySelector("#upload-file-selector")
uploadJSONButton.addEventListener("click", () => {
	uploadFileSelector.click()
})
uploadFileSelector.addEventListener("change", () => {
	const files = uploadFileSelector.files
	loadFile(files[0])
})

// Save contents of text area
const saveTasksButton = document.querySelector("#save-tasks-button")
saveTasksButton.addEventListener("click", () => {
	setLanes(JSON.parse(uploadTextarea.value))
	closePopup()
})

// Export tasks
const downloadButton = document.querySelector("[data-download-button]")
const downloadPopup = document.querySelector("#download-popup")
const downloadTextarea = document.querySelector("#download-textarea")
downloadButton.addEventListener("click", () => {
	downloadPopup.classList.remove("hide")
	togglePopupOverlay()
	downloadTextarea.value = JSON.stringify(getLanes(), null, 2)
})

const downloadJSONButton = document.querySelector("#download-json-button")
downloadJSONButton.addEventListener("click", () => {
	const mimeType = "text/json"
	const blob = new Blob([JSON.stringify(getLanes(), null, "\t")], {
		type: mimeType
	})

	const link = document.createElement("a")
	link.download = "trello-tasks.json"
	link.href = URL.createObjectURL(blob)
	link.dataset.downloadurl = [mimeType, link.download, link.href].join(":")

	const event = new MouseEvent("click", {
		view: window,
		bubbles: true,
		cancelable: true
	})

	link.dispatchEvent(event)
	URL.revokeObjectURL(link.href)
	link.remove()
})

const copyButton = document.querySelector("#copy-button")
copyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(downloadTextarea.value)
	copyButton.dataset.tooltip = "Copied to Clipboard!"
})

// Handle popup overlay
const popupOverlay = document.querySelector("#popup-overlay")
popupOverlay.addEventListener("click", closePopup)
function togglePopupOverlay() {
	popupOverlay.classList.toggle("hide")
}

// Small helper for closing the pop-ups.
function closePopup() {
	uploadTextarea.value = ""
	uploadPopup.classList.add("hide")
	downloadTextarea.value = ""
	downloadPopup.classList.add("hide")
	togglePopupOverlay()
}
