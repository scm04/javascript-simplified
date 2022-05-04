export default class Display {
	#primaryOperand
	#secondaryOperand
	#operation

	constructor() {
		this.#primaryOperand = document.querySelector("[data-primary-operand]")
		this.#secondaryOperand = document.querySelector("[data-secondary-operand]")
		this.#operation = document.querySelector("[data-operation]")
	}

	display(primaryOperand, secondaryOperand, operation) {
		this.#primaryOperand.textContent = primaryOperand
		this.#secondaryOperand.textContent = secondaryOperand
		this.#operation.textContent = operation
	}
}
