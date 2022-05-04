/**
 * Challenge 1: The calculator as provided in the initial HTML only handles one operation
 * at a time. Extend the calculator's functionality to allow multiple operations to be
 * processed at once.
 * NOTE: I ended up making this implementation the default implementation and having the
 * initial implementation described by Kyle inherit from and override parts of this one.
 */
export default class Calculator {
	static #OPERAND_REGEX = "((?<!\\d)\\-)?\\d+(\\.\\d+)?(e[\\+\\-]?\\d+)?"
	static #OPERAND1 = `(?<operand1>${Calculator.#OPERAND_REGEX})`
	static #OPERAND2 = `(?<operand2>${Calculator.#OPERAND_REGEX})`
	static #REGEXP_TEMPLATE = `${Calculator.#OPERAND1}\\s*(?<operation>=op=)\\s*${
		Calculator.#OPERAND2
	}`
	static #MULT_DIV_REGEXP = new RegExp(
		Calculator.#REGEXP_TEMPLATE.replace("=op=", "[÷\\*]")
	)
	static #ADD_SUB_REGEXP = new RegExp(
		Calculator.#REGEXP_TEMPLATE.replace("=op=", "(?<!e)[\\-\\+]")
	)

	// Private properties
	#display

	// Public properties
	primaryOperand = "0"
	secondaryOperand
	operation
	changeOperation = false
	evaluated = false

	constructor(display) {
		this.#display = display
		this.updateDisplay()
	}

	updateDisplay() {
		this.#display.display(this.primaryOperand, this.secondaryOperand, this.operation)
	}

	clear() {
		this.primaryOperand = "0"
		this.secondaryOperand = null
		this.operation = null
		this.changeOperation = false
		this.evaluated = false
		this.updateDisplay()
	}

	delete() {
		this.primaryOperand = this.primaryOperand.slice(0, -1)
		if (this.primaryOperand === "") this.primaryOperand = "0"
		this.updateDisplay()
	}

	equals() {
		if (this.secondaryOperand == null || this.operation == null) return
		if (this.operation === "÷" && this.primaryOperand === "0") {
			this.primaryOperand = "Can't divide by zero"
			this.updateDisplay()
			return
		}

		this.primaryOperand = this.solve().toString()
		this.secondaryOperand = null
		this.operation = null
		this.evaluated = true
		this.updateDisplay()
	}

	solve() {
		let equation = `${this.secondaryOperand} ${this.operation} ${this.primaryOperand}`
		while (Calculator.#MULT_DIV_REGEXP.exec(equation)) {
			const result = this.evaluate(
				Calculator.#MULT_DIV_REGEXP.exec(equation).groups
			)
			equation = equation.replace(Calculator.#MULT_DIV_REGEXP, result)
		}

		while (Calculator.#ADD_SUB_REGEXP.exec(equation)) {
			const result = this.evaluate(Calculator.#ADD_SUB_REGEXP.exec(equation).groups)
			equation = equation.replace(Calculator.#ADD_SUB_REGEXP, result)
		}
		return equation
	}

	evaluate({ operand1, operand2, operation }) {
		const a = parseFloat(operand1)
		const b = parseFloat(operand2)

		switch (operation) {
			case "*":
				return a * b
			case "÷":
				return a / b
			case "+":
				return a + b
			case "-":
				return a - b
		}
	}

	updateOperation(operation) {
		if (!this.changeOperation) {
			if (this.secondaryOperand != null && this.operation != null) {
				this.updateHistory()
			}
			this.changeOperation = true
		}
		if (this.secondaryOperand == null) {
			this.secondaryOperand = this.primaryOperand
			this.primaryOperand = "0"
		}
		this.operation = operation
		this.updateDisplay()
	}

	updateHistory() {
		this.secondaryOperand += ` ${this.operation} ${this.primaryOperand}`
		this.primaryOperand = "0"
	}

	updatePrimaryOperand(value) {
		if (this.evaluated || this.primaryOperand === "Can't divide by zero") {
			this.primaryOperand = "0"
			this.evaluated = false
		}
		if (value === "." && this.primaryOperand.includes(".")) return
		if (this.primaryOperand === "0") {
			if (value === "0") return
			this.primaryOperand = "" // Make sure there's not a leading zero.
		}
		this.primaryOperand += value
		this.changeOperation = false
		this.updateDisplay()
	}
}

/**
 * This class overrides some of the Calculator class to convert it to the
 * simpler implementation described by Kyle in the project introduction.
 */
export class SimpleCalculator extends Calculator {
	solve() {
		return this.evaluate({
			operand1: this.secondaryOperand,
			operand2: this.primaryOperand,
			operation: this.operation
		})
	}

	updateHistory() {
		this.equals()
	}
}
