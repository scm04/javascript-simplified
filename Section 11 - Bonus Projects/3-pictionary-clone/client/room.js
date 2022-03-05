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
	socket.emit("toggle-erasing")
})
socket.on("toggle-erasing", () => {
	drawableCanvas.erasing = !drawableCanvas.erasing
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

/**
 * Challenge 4: Prevent people from joining a room mid-game.
 * 		- Suggestion 1: Add them to a waiting list.
 * 		- Suggestion 2: Give them a warning that the room already has a game in
 * 			progress.
 * 		- Suggestion 3: Some combination of 1 and 2 (maybe give the user a warning
 * 			and let them choose whether to go onto a wait-list or try another room).
 * 		- Suggestion 4: Suggestion 3 + the ability to spectate the current round while
 * 			in the wait-list.
 */
