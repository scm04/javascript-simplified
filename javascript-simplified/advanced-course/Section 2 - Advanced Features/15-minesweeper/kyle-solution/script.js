// Display/UI logic
import {
	TILE_STATUSES,
	createBoard,
	checkWin,
	checkLose,
	markTile,
	revealTile
} from "./minesweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

board.forEach(row => {
	row.forEach(tile => {
		boardElement.append(tile.element)
		tile.element.addEventListener("click", () => {
			revealTile(board, tile)
			checkGameEnd()
		})
		tile.element.addEventListener("contextmenu", e => {
			e.preventDefault()
			markTile(tile)
			listMinesLeft()
		})
	})
})
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
	const markedTilesCount = board.reduce((count, row) => {
		return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
	}, 0)
	minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

// 4. Check for win/loss
function checkGameEnd() {
	const win = checkWin(board)
	const lose = checkLose(board)
	if (win || lose) {
		boardElement.addEventListener("click", stopPropagation, { capture: true })
		boardElement.addEventListener("contextmenu", stopPropagation, { capture: true })
	}

	if (win) {
		messageText.textContent = "You Win!"
	}
	if (lose) {
		messageText.textContent = "You Lose"
		board.forEach(row => {
			row.forEach(tile => {
				if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
				if (tile.mine) revealTile(board, tile)
			})
		})
	}
}

function stopPropagation(e) {
	e.stopImmediatePropagation()
}
