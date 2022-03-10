import Board from "./Board.js"
import addGlobalEventListener from "./util/addGlobalEventListener.js"

// HTML Elements
const boardElement = document.querySelector("[data-board]")
const subtext = document.querySelector("[data-subtext]")
const minesLeft = document.querySelector("[data-mines-left]")

// Board setup
const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10
const board = new Board(boardElement, BOARD_SIZE, NUMBER_OF_MINES)

// Allow tiles to be marked
addGlobalEventListener("contextmenu", "[data-status]", e => {
	e.preventDefault()
	board.markTile(e.target)
	if (board.gameOver) {
		subtext.innerText = board.message
	} else {
		minesLeft.innerText = board.minesLeft
	}
})

// Allow tiles to be clicked
addGlobalEventListener("click", "[data-status]", e => {
	board.clickTile(e.target)
	if (board.gameOver) subtext.innerText = board.message
})
