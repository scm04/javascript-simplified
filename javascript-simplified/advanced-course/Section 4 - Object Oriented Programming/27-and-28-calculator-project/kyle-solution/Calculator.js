export default class Calculator {
	#primaryOperandDisplay
	#secondaryOperandDisplay
	#operationDisplay

	constructor(primaryOperandDisplay, secondaryOperandDisplay, operationDisplay) {
		this.#primaryOperandDisplay = primaryOperandDisplay
		this.#secondaryOperandDisplay = secondaryOperandDisplay
		this.#operationDisplay = operationDisplay
		this.clear()
	}

	get primaryOperand() {
		return parseFloat(this.#primaryOperandDisplay.dataset.value)
	}
	get primaryOperandString() {
		return this.#primaryOperandDisplay.dataset.value
	}
	set primaryOperand(value) {
		this.#primaryOperandDisplay.dataset.value = value ?? ""
		this.#primaryOperandDisplay.textContent = displayNumber(value)
	}

	get secondaryOperand() {
		return parseFloat(this.#secondaryOperandDisplay.dataset.value)
	}
	set secondaryOperand(value) {
		this.#secondaryOperandDisplay.dataset.value = value ?? ""
		this.#secondaryOperandDisplay.textContent = displayNumber(value)
	}

	get operation() {
		return this.#operationDisplay.textContent
	}
	set operation(value) {
		this.#operationDisplay.textContent = value ?? ""
	}

	addDigit(digit) {
		if (digit === "." && this.primaryOperandString.includes(".")) return
		if (this.primaryOperand === 0) {
			this.primaryOperand = digit
			return
		}
		this.primaryOperand = `${this.primaryOperandString}${digit}`
	}

	removeDigit() {
		if (this.primaryOperandString.length === 1) {
			this.primaryOperand = 0
			return
		}
		this.primaryOperand = this.primaryOperandString.slice(0, -1)
	}

	evaluate() {
		console.log(this.secondaryOperand, this.operation, this.primaryOperand)
		let result
		switch (this.operation) {
			case "*":
				result = this.secondaryOperand * this.primaryOperand
				break
			case "÷":
				result = this.secondaryOperand / this.primaryOperand
				break
			case "+":
				result = this.secondaryOperand + this.primaryOperand
				break
			case "-":
				result = this.secondaryOperand - this.primaryOperand
				break
			default:
				return
		}

		this.clear()
		this.primaryOperand = result
		return result
	}

	chooseOperation(operation) {
		if (this.operation !== "") return
		this.operation = operation
		this.secondaryOperand = this.primaryOperand
		this.primaryOperand = 0
	}

	clear() {
		this.primaryOperand = 0
		this.secondaryOperand = null
		this.operation = null
	}
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en")
function displayNumber(number) {
	const stringNumber = number?.toString() || ""
	if (stringNumber === "") return ""
	const [integer, fraction] = stringNumber.split(".")
	const formattedInteger = NUMBER_FORMATTER.format(integer)
	return `${formattedInteger}${fraction == null ? "" : `.${fraction}`}`
}
