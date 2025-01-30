import Tile from "./Tile.js"

export default class Board {
	#element
	#size
	#tiles
	#numberOfMines
	#minesLeft
	#gameOver = false
	#message

	constructor(boardElement, size, numberOfMines) {
		this.#element = boardElement
		this.#size = size
		this.#element.style.setProperty("--size", this.#size)
		this.#numberOfMines = numberOfMines
		this.#minesLeft = numberOfMines

		// Populate the board
		this.#tiles = createTiles(this.#element, this.#size)
		setMines(this.#tiles.slice(), this.#numberOfMines)
		setTileTypes(this.#tiles)
	}

	get size() {
		return this.#size
	}

	get minesLeft() {
		return this.#minesLeft
	}

	get gameOver() {
		return this.#gameOver
	}

	get message() {
		return this.#message
	}

	getTile(element) {
		return this.#tiles.find(t => t.element === element)
	}

	markTile(element) {
		const tile = this.getTile(element)
		const hidden = tile.status === Tile.STATUS_HIDDEN
		const marked = tile.status === Tile.STATUS_MARKED
		if (!hidden && !marked) return
		tile.status = hidden ? Tile.STATUS_MARKED : Tile.STATUS_HIDDEN
		this.#minesLeft += hidden ? -1 : 1
		if (this.won()) {
			this.endGame("Congratulations! You win!")
		}
	}

	clickTile(element) {
		const tile = this.getTile(element)
		if (tile.status === Tile.STATUS_MARKED) return
		switch (tile.type) {
			case Tile.TYPE_MINE:
				this.endGame("You lose.")
				break
			case Tile.TYPE_NUMBER:
				tile.status = Tile.STATUS_NUMBER
				break
			case Tile.TYPE_EMPTY:
				tile.status = Tile.STATUS_EMPTY
				this.showTiles(tile)
		}
		if (this.won()) {
			this.endGame("Congratulations! You win!")
		}
	}

	won() {
		const hiddenTiles = this.#tiles.filter(
			t => t.status === Tile.STATUS_HIDDEN || t.status === Tile.STATUS_MARKED
		)
		if (hiddenTiles.length === this.#numberOfMines) return true
		const markedTiles = hiddenTiles.filter(t => t.status === Tile.STATUS_MARKED)
		return (
			markedTiles.length === this.#numberOfMines &&
			markedTiles.every(t => t.type === Tile.TYPE_MINE)
		)
	}

	endGame(message) {
		this.#gameOver = true
		this.#message = message
		this.showMines()
	}

	showMines() {
		for (let tile of this.#tiles) {
			if (tile.type === Tile.TYPE_MINE) {
				tile.status = Tile.STATUS_MINE
			}
		}
	}

	showTiles(startTile) {
		const completed = new Set()
		const tiles = [startTile]
		while (tiles.length > 0) {
			const tile = tiles.shift()
			if (completed.has(tile)) continue

			tile.status = tile.type
			if (tile.type === Tile.TYPE_EMPTY) {
				tiles.push(...getNeighbors(tile, this.#tiles))
			}
			completed.add(tile)
		}
	}
}

function createTiles(boardElement, size) {
	const tiles = []
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const element = document.createElement("div")
			boardElement.appendChild(element)
			tiles.push(new Tile(element, x, y))
		}
	}
	return tiles
}

function setMines(tiles, numberOfMines) {
	const mines = tiles.sort(() => 0.5 - Math.random()).slice(0, numberOfMines)
	for (const mine of mines) {
		mine.type = Tile.TYPE_MINE
	}
}

function setTileTypes(tiles) {
	for (const tile of tiles) {
		if (tile.type === Tile.TYPE_MINE) continue
		// if any neighbors are mines, set type to number and value to the number
		// of neighbors that are mines
		const mines = getNeighbors(tile, tiles).filter(t => t.type === Tile.TYPE_MINE)
		if (mines.length > 0) {
			tile.type = Tile.TYPE_NUMBER
			tile.value = mines.length
			continue
		}
		// if no neighbors are mines, set type to empty
		tile.type = Tile.TYPE_EMPTY
	}
}

function getNeighbors(tile, tiles) {
	return tiles.filter(other => tile.neighbors(other))
	// const neighbors = []
	// for (let y = tile.y - 1; y <= tile.y + 1; y++) {
	// 	// If y is above the grid, continue to the next row.
	// 	if (y < 0) continue
	// 	// If y is below the grid, the algorithm is done.
	// 	if (y === this.#size) break
	// 	for (let x = tile.x - 1; x <= tile.x + 1; x++) {
	// 		// If x is left of the grid or the current tile
	// 		// is the tile that was passed in, continue to the
	// 		// next column.
	// 		if (x < 0 || (x === tile.x && y === tile.y)) continue
	// 		// If x is right of the grid, move to the next row.
	// 		if (x === this.#size) break
	// 		const index = y * this.#size + x
	// 		neighbors.push(this.#tiles[index])
	// 	}
	// }
	// return neighbors
}
