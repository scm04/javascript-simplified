import Display from "./Display.js"
import Calculator, { SimpleCalculator } from "./Calculator.js"

// Calculator Setup
// - The SimpleCalculator class only stores one operation and one operand,
//		and the expression is evaluated every time another operation is selected.
// - The Calculator class provides a more robust experience that allows
// 		multiple operations to be chained together and evaluated all at once
// 		while respecting order of operations.
// - Both calculators can only handle addition, subtraction, multiplication,
//		and division operations.
// - To change which implementation of the calculator is used, simply change
//		which constructor is being called on the next line.
const calculator = new Calculator(new Display())

// Select the buttons and give them their click functionality.
// AC button
const acBtn = document.querySelector("[data-all-clear]")
acBtn.addEventListener("click", () => calculator.clear())

// DEL button
const deleteBtn = document.querySelector("[data-delete]")
deleteBtn.addEventListener("click", () => calculator.delete())

// = button
const equalsBtn = document.querySelector("[data-equals]")
equalsBtn.addEventListener("click", () => calculator.equals())

// Operation buttons (+, -, *, ÷)
const operationBtns = document.querySelectorAll("[data-operation]")
operationBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		if (!btn.contains(e.target)) return
		calculator.updateOperation(btn.textContent)
	})
})

// Number buttons (0-9 and .)
const numberBtns = document.querySelectorAll("[data-number]")
numberBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		if (!btn.contains(e.target)) return
		calculator.updatePrimaryOperand(btn.textContent)
	})
})

/**
 * Challenge 2: Add keyboard support to the calculator.
 * NOTE: See the Calculator.js file for Challenge 1.
 */
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const operations = ["*", "/", "-", "+"]
const equals = ["=", "Enter"]
const del = ["Delete", "Backspace"]
document.addEventListener("keydown", e => {
	let key = e.key
	if (digits.includes(key)) {
		calculator.updatePrimaryOperand(key)
	} else if (operations.includes(key)) {
		if (key === "/") key = "÷"
		calculator.updateOperation(key)
	} else if (equals.includes(key)) {
		calculator.equals()
	} else if (del.includes(key)) {
		if (e.shiftKey) {
			calculator.clear()
			return
		}
		calculator.delete()
	}
})
