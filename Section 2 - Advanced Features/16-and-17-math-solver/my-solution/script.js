// Operations to Consider: +, -, *, /
// There will be no variables (i.e. the set of valid characters is [0-9+-*/])
// If the equation is invalid, the result should be NaN
// The result should be calculated using the normal order of operations.

// HTML Elements
const equationForm = document.querySelector("#equation-form")
const equationInput = document.querySelector("#equation")
const results = document.querySelector("#results")

// Regular Expressions
// Check for anything that isn't a number or an operator.
const invalidChars = /[^\d\+\-\*\/\^\(\)]/
const operators = "[\\+\\-\\*\\/\\^]"
const operatorLookbehind = `(?<=${operators})`
const optionalNegativeSign = `(?:${operatorLookbehind}\\-)?`
const numberSelector = `${optionalNegativeSign}\\d+`

// Operator Checks
const operatorNegativeLookbehind = `(?<!${operators})`
const subtraction = `${operatorNegativeLookbehind}\\-`

// Expression Regular Expressions
const multiplicationOrDivision = `(${numberSelector})(\\*|\\/)(${numberSelector})`
const additionOrSubtraction = `(${numberSelector})(\\+|\\-)(${numberSelector})`
const exponent = `(${numberSelector})\\^(${numberSelector})(?!.*\\^)`

// Processing Logic
equationForm.addEventListener("submit", e => {
	e.preventDefault()
	invalidChars.lastIndex = 0
	let equation = equationInput.value.replaceAll(" ", "").trim()
	if (equation === "" || invalidChars.test(equation)) {
		results.textContent = NaN
		return
	}
	results.textContent = solve(equation)
})

function doMultiplicationAndDivision(equation) {
	let match = equation.match(new RegExp(multiplicationOrDivision))
	while (match != null) {
		let [expr, num1, op, num2] = match
		num1 = Number(num1)
		num2 = Number(num2)
		let result = op === "*" ? num1 * num2 : num1 / num2
		equation = equation.replace(expr, result)
		match = equation.match(new RegExp(multiplicationOrDivision))
	}
	if (equation.indexOf("*") !== -1 || equation.indexOf("/") !== -1) {
		throw new Error("Unresolved multiplication or division.")
	}
	return equation
}

function doAdditionAndSubtraction(equation) {
	let match = equation.match(new RegExp(additionOrSubtraction))
	while (match != null) {
		let [expr, num1, op, num2] = match
		num1 = Number(num1)
		num2 = Number(num2)
		let result = op === "+" ? num1 + num2 : num1 - num2
		equation = equation.replace(expr, result)
		match = equation.match(new RegExp(additionOrSubtraction))
	}
	if (equation.indexOf("+") !== -1 || equation.match(new RegExp(subtraction)) != null) {
		throw new Error("Unresolved addition or subtraction.")
	}
	return equation
}

/**
 * Challenge 1: Add the ability to do exponents.
 */
function doExponents(equation) {
	let match = equation.match(new RegExp(exponent))
	while (match != null) {
		let [expr, num1, num2] = match
		num1 = Number(num1)
		num2 = Number(num2)
		let res = Math.pow(num1, num2)
		equation = equation.replace(expr, res)
		match = equation.match(new RegExp(exponent))
	}
	if (equation.indexOf("^") !== -1) {
		throw new Error("Unresolved exponent operator.")
	}
	return equation
}

/**
 * Challenge 2: Add the ability to use parentheses to group parts of the equation.
 */
function solve(equation) {
	let result = equation
	try {
		console.log("attempting to solve the equation")
		result = handleParentheses(result)
		result = doExponents(result)
		result = doMultiplicationAndDivision(result)
		result = doAdditionAndSubtraction(result)
	} catch (e) {
		console.error(`Invalid Equation: ${equation}\n${e}`)
		return NaN
	}
	return result
}

function handleParentheses(equation) {
	let match = equation.match(new RegExp("\\("))
	while (match != null) {
		let matchingParen = findMatchingParenthesis(equation, match["index"] + 1)
		if (matchingParen === -1) {
			throw new Error("Missing Parenthesis.")
		}
		let expression = equation.slice(match["index"] + 1, matchingParen)
		let result = solve(expression)
		equation = equation.replace(`(${expression})`, result)
		match = equation.match(new RegExp("\\("))
	}
	return equation
}

function findMatchingParenthesis(equation, startIndex) {
	let openParentheses = 1
	for (let i = startIndex; i < equation.length; i++) {
		if (equation[i] === "(") openParentheses++
		if (equation[i] === ")") openParentheses--
		if (openParentheses === 0) return i
	}
	return -1
}
