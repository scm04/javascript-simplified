// Operations to Consider: +, -, *, /
// There will be no variables (i.e. the set of valid characters is [0-9+-*/])
// If the equation is invalid, the result should be NaN
// The result should be calculated using the normal order of operations.

// HTML Elements
const equationForm = document.querySelector("#equation-form")
const equationInput = document.querySelector("#equation")

// Regular Expressions
// Check for anything that isn't a number or an operator.
const invalidChars = /[^\d\+\-\*\/]/
const operators = "[\\+\\-\\*\\/]"
const operatorLookbehind = `(?<=${operators})`
const optionalNegativeSign = `(${operatorLookbehind}\\-)?`
const numberSelector = `${optionalNegativeSign}\\d+`
const operatorNegativeLookbehind = `(?<!${operators})`
const operatorSelector = `${operatorNegativeLookbehind}${operators}`
const regex = `(${numberSelector}|${operatorSelector})`
const equationRegex = new RegExp(regex, "g")

// Processing Logic
equationForm.addEventListener("submit", e => {
	e.preventDefault()
	invalidChars.lastIndex = 0
	const equation = equationInput.value.replaceAll(" ", "").trim()
	if (equation === "" || invalidChars.test(equation)) return
	const tokens = [...equation.matchAll(equationRegex)].map(part => part[0])
	// must have at least two operands and one operator to have an equation
	// also, must have an odd number of total tokens, otherwise the equation
	// ends with an operator rather than an operand.
	if (tokens.length < 3 || tokens.length % 2 === 0) return
	console.log(tokens)
	console.log(solve(tokens))
})

// This solver is incorrect (it doesn't respect order of operations).
// I think I'm going to have to do some kind of parser like I did for
// that one project in the Programming Languages class (CS 330, I think).
function solve([a, operator, b, ...rest]) {
	a = Number(a)
	b = Number(b)
	let result
	switch (operator) {
		case "+":
			result = a + b
			break
		case "-":
			result = a - b
			break
		case "*":
			result = a * b
			break
		case "/":
			result = a / b
	}
	if (rest.length > 0) {
		result = solve([result, ...rest])
	}
	return result
}

/**
 * Challenge 1: Add the ability to do exponents.
 */

/**
 * Challenge 2: Add the ability to use parentheses to group parts of the equation.
 */
