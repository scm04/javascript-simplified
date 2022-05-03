import Display from "./Display.js"
import Calculator from "./Calculator.js"

// Instantiate the calculator and display.
// Original Calculator (only stores one operand and operation)
const calculator = new Calculator(new Display())
// Challenge 1 calculator (allows multiple operations to be stored)
// const calculator = new Calculator(new ExtendedDisplay())

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
		const value = btn.textContent
		calculator.operation = value
	})
})

// Number buttons (0-9 and .)
const numberBtns = document.querySelectorAll("[data-number]")
numberBtns.forEach(btn => {
	btn.addEventListener("click", e => {
		if (!btn.contains(e.target)) return
		const value = btn.textContent
		calculator.primaryOperand = value
	})
})

// What happens when each type of button is pressed?
// 1. All Clear:
// 		- Clear out the history section of the output.
//		- Reset the primary operand to 0.
//		- Do the above in the JavaScript.
// 2. Delete:
//		- Remove the last character from the primary operand.
// 3. Equals:
//		- Apply the operation in history to the primary and secondary operands.
//		- Set the primary operand to the result.
//		- Clear the history.
//		- NOTE: See Challenge 1 below.
// 4. Operator:
//		- Set the operation in history.
//		- If the history is empty:
//			- Move the primary operand to the secondary operand.
//			- Reset the primary operand to 0.
//		- NOTE: I want to slightly modify this behavior as follows:
//			- If this is the first operation entered since the last number was entered:
//				- Execute the old operation on the primary and secondary operands
//				- Place the result in the secondary operand.
//			- Set the operation to the new operation.
//		- NOTE: See Challenge 1 below.
// 5. Number:
//		- If the key is 0:
//			- If the primary operand is currently 0, do nothing.
//			- If the primary operand is not 0, add a 0 to the end of it.
//		- If the key is . (the decimal key):
//			- If there is already a decimal in the primary operand, do nothing.
//			- Otherwise, add a decimal to the end of the primary operand.
//		- Otherwise, add the number to the end of the primary operand.

/**
 * Challenge 1: The calculator as provided in the initial HTML only handles one operation
 * at a time. Extend the calculator's functionality to allow multiple operations to be
 * processed at once.
 */
// 1. Modify the HTML to store a single value in the history instead of multiple values.
//		- This value will be the equation up to (but not including) the current primary
//			operand.
// 2. Modify the JavaScript when the equals key is pressed so the following occurs:
//		- Append the primary operand to the end of the history.
//		- Solve the equation using the logic from the math solver project.
//		- Set the primary operand to the result.
//		- Clear the history.
