import { io } from "socket.io-client"
import DrawableCanvas from "./DrawableCanvas.js"

const production = process.env.NODE_ENV === "production"
const serverURL = production ? "google.com" : "http://localhost:3000"

const urlParams = new URLSearchParams(window.location.search)
const name = urlParams.get("name")
const roomId = urlParams.get("room-id")

if (!name || !roomId) window.location = "/index.html"

// Server logic
const socket = io(serverURL)
socket.emit("join-room", { name, roomId })
socket.on("start-drawer", startRoundDrawer)
socket.on("start-guesser", startRoundGuesser)
socket.on("guess", displayGuess)
socket.on("winner", endRound)
// For Challenge 4 (see section below for details)
socket.on("game-in-progress", showPopupSection)

// For Challenge 3 (see section below for details)
// Obsoleted during Challenge 4 when drawing was updated to pass
// all drawing parameters to the server to help facilitate
// spectating for those on the wait-list.
// socket.on("toggle-erasing", toggleErasing)

// Elements
const guessInput = document.querySelector("[data-guess-input]")
const wordElement = document.querySelector("[data-word]")

// Guess messages
const messagesElement = document.querySelector("[data-messages]")
const guessTemplate = document.querySelector("[data-guess-template]")
function displayGuess(guesserName, guess) {
	const guessElement = guessTemplate.content.children[0].cloneNode(true)

	const nameElement = guessElement.querySelector("[data-name]")
	nameElement.innerText = guesserName

	const textElement = guessElement.querySelector("[data-text]")
	textElement.innerText = guess

	messagesElement.append(guessElement)
}

// Guess Form
const guessForm = document.querySelector("[data-guess-form]")
guessForm.addEventListener("submit", e => {
	e.preventDefault()

	if (guessInput.value === "") return

	socket.emit("make-guess", { guess: guessInput.value })
	displayGuess(name, guessInput.value)
	guessInput.value = ""
})

// Ready Button
const readyButton = document.querySelector("[data-ready-btn]")
readyButton.addEventListener("click", () => {
	hide(readyButton)
	socket.emit("ready")
})

// Canvas
const canvas = document.querySelector("[data-canvas]")
const drawableCanvas = new DrawableCanvas(canvas, socket)
window.addEventListener("resize", resizeCanvas)
resizeCanvas()
function resizeCanvas() {
	canvas.width = null
	canvas.height = null

	const clientDimensions = canvas.getBoundingClientRect()
	canvas.width = clientDimensions.width
	canvas.height = clientDimensions.height
}

// Drawing Tools (Used for Challenges 1 and 2)
const drawingTools = document.querySelector("[data-drawing-tools]")

/**
 * Challenge 3: Add the ability for the drawer to erase things.
 */
const eraserBtn = document.querySelector("[data-eraser-btn]")
const erasingMessage = document.querySelector("[data-erasing-message]")
eraserBtn.addEventListener("click", () => {
	eraserBtn.classList.toggle("active")
	if (eraserBtn.classList.contains("active")) {
		show(erasingMessage)
		drawableCanvas.erasing = true
	} else {
		hide(erasingMessage)
		drawableCanvas.erasing = false
	}

	// Obsoleted during Challenge 4 when drawing was updated to pass
	// all drawing parameters to the server to help facilitate
	// spectating for those on the wait-list.
	// socket.emit("toggle-erasing")
})

// Obsoleted during Challenge 4 when drawing was updated to pass
// all drawing parameters to the server to help facilitate
// spectating for those on the wait-list.
// function toggleErasing() {
// 	drawableCanvas.erasing = !drawableCanvas.erasing
// }

/**
 * Challenge 4: Prevent people from joining a room mid-game.
 * 		- Give the user a warning that the room already has a game in
 * 			progress and allow them to choose whether to join the wait-
 * 			list for the current room or go back to select a different room.
 */
const popupSection = document.querySelector("[data-popup-section]")
function showPopupSection() {
	show(popupSection)
	hide(readyButton)
}
const waitListBtn = document.querySelector("[data-wait-list-btn]")
waitListBtn.addEventListener("click", () => {
	hide(popupSection)
	socket.emit("wait-list")
})
const differentRoomBtn = document.querySelector("[data-different-room-btn]")
differentRoomBtn.addEventListener("click", () => {
	window.location = `/index.html?name=${name}`
})

// Round logic
function startRoundDrawer(word) {
	show(drawingTools)
	hide(erasingMessage)
	eraserBtn.classList.remove("active")
	drawableCanvas.canDraw = true
	drawableCanvas.resetCanvas()

	messagesElement.innerHTML = ""
	wordElement.innerText = word
}

function startRoundGuesser() {
	show(guessForm)
	hide(wordElement)
	hide(erasingMessage)
	eraserBtn.classList.remove("active")
	drawableCanvas.resetCanvas()

	messagesElement.innerHTML = ""
	wordElement.innerText = ""
}

endRound()
function endRound(name = null, word = null) {
	if (name && word) {
		wordElement.innerText = word
		show(wordElement)
		displayGuess(null, `${name} is the winner!`)
	}

	drawableCanvas.canDraw = false
	show(readyButton)
	hide(guessForm)
	hide(drawingTools)
}

function hide(element) {
	element.classList.add("hide")
}

function show(element) {
	element.classList.remove("hide")
}
