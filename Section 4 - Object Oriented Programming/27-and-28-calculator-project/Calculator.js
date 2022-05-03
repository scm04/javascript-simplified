export default class Calculator {
	#display
	#primaryOperand = "0"
	#secondaryOperand
	#operation
	#changeOperation = false

	constructor(display) {
		this.#display = display
		this.#updateDisplay()
	}

	#updateDisplay() {
		this.#display.display(
			this.#primaryOperand,
			this.#secondaryOperand,
			this.#operation
		)
	}

	clear() {
		this.#primaryOperand = "0"
		this.#secondaryOperand = null
		this.#operation = null
		this.#updateDisplay()
	}

	delete() {
		this.#primaryOperand = this.#primaryOperand.slice(0, -1)
		if (this.#primaryOperand === "") this.#primaryOperand = "0"
		this.#updateDisplay()
	}

	equals() {
		if (this.#secondaryOperand == null || this.#operation == null) return

		let result = parseFloat(this.#secondaryOperand)
		switch (this.#operation) {
			case "+":
				result += parseFloat(this.#primaryOperand)
				break
			case "-":
				result -= parseFloat(this.#primaryOperand)
				break
			case "*":
				result *= parseFloat(this.#primaryOperand)
				break
			case "÷":
				result /= parseFloat(this.#primaryOperand)
		}

		this.#primaryOperand = result.toString()
		this.#secondaryOperand = null
		this.#operation = null
		this.#updateDisplay()
	}

	set operation(operation) {
		if (!this.#changeOperation) {
			if (this.#secondaryOperand != null) {
				this.equals()
			}
			this.#secondaryOperand = this.#primaryOperand
			this.#primaryOperand = "0"
		}
		this.#changeOperation = true
		this.#operation = operation
		this.#updateDisplay()
	}

	set primaryOperand(value) {
		if (value === "." && this.#primaryOperand.includes(".")) return
		if (this.#primaryOperand === "0") {
			if (value === "0") return
			this.#primaryOperand = "" // Make sure there's not a leading zero.
		}
		this.#primaryOperand += value
		this.#changeOperation = false
		this.#updateDisplay()
	}
}
