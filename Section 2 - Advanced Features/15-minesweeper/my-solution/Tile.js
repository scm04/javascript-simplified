export default class Tile {
	// Possible values of the #status class member.
	static STATUS_HIDDEN = "hidden"
	static STATUS_NUMBER = "number"
	static STATUS_MARKED = "marked"
	static STATUS_EMPTY = "empty"
	static STATUS_MINE = "mine"

	// Possible values of the #type class member.
	static TYPE_MINE = "mine"
	static TYPE_EMPTY = "empty"
	static TYPE_NUMBER = "number"

	#element
	#status = Tile.STATUS_HIDDEN
	#type
	#x
	#y
	// undefined if type is TYPE_MINE or TYPE_EMPTY, a number otherwise.
	#value

	constructor(element, x, y) {
		this.#element = element
		this.#element.dataset.status = this.#status
		this.#x = x
		this.#y = y
	}

	get x() {
		return this.#x
	}

	get y() {
		return this.#y
	}

	get element() {
		return this.#element
	}

	get status() {
		return this.#status
	}

	set status(value) {
		this.#status = value
		this.#element.dataset.status = this.#status
	}

	get type() {
		return this.#type
	}

	set type(value) {
		this.#type = value
	}

	get value() {
		return this.#value
	}

	set value(value) {
		this.#value = value
		this.#element.textContent = this.#value
	}

	neighbors(other) {
		return (
			this.#topLeftNeighbor(other) ||
			this.#topNeighbor(other) ||
			this.#topRightNeighbor(other) ||
			this.#leftNeighbor(other) ||
			this.#rightNeighbor(other) ||
			this.#bottomLeftNeighbor(other) ||
			this.#bottomNeighbor(other) ||
			this.#bottomRightNeighbor(other)
		)
	}

	#topLeftNeighbor(other) {
		return other.y === this.#y - 1 && other.x === this.#x - 1
	}

	#topNeighbor(other) {
		return other.y === this.#y - 1 && other.x === this.#x
	}

	#topRightNeighbor(other) {
		return other.y === this.#y - 1 && other.x === this.#x + 1
	}

	#leftNeighbor(other) {
		return other.y === this.#y && other.x === this.#x - 1
	}

	#rightNeighbor(other) {
		return other.y === this.#y && other.x === this.#x + 1
	}

	#bottomLeftNeighbor(other) {
		return other.y === this.#y + 1 && other.x === this.#x - 1
	}

	#bottomNeighbor(other) {
		return other.y === this.#y + 1 && other.x === this.#x
	}

	#bottomRightNeighbor(other) {
		return other.y === this.#y + 1 && other.x === this.#x + 1
	}
}
