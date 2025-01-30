const inputElement = document.getElementById("equation")
const outputElement = document.getElementById("results")
const form = document.getElementById("equation-form")

// NOTE: The regular expressions here are slightly more complex than the ones Kyle
// actually used in his solution. In the video going over his solution, he used the
// \S meta class to grab everything that was not white space on either side of the
// operator (he called it operation in his group names), so his operand groups were
// defined as "(?<operand1>\S+)" (the operand2 group was the same except for the name).
// This works great if the equation includes spaces, but if it doesn't, it causes some
// issues because of the way that parseInt and parseFloat work. To allow equations to
// be entered without spaces while still capturing things like negative and fractional
// numbers(which use the negative sign and decimal notation, respectively), I replaced
// "\S+" with "((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?". To understand why this works,
// let's break it into four parts:
// "((?<!\d)\-)?"
//		- This is the most complex part of this new regex, and it does three things.
// 			First, the "\-" checks for a negative sign. Then, the "(?<!\d)" checks
//			whether the negative sign is preceded by another number. If it is, then
//			it's not a negative sign at all, it's a subtraction operator, so the match
//			fails. Finally, the "?" at the end of the expression makes the entire thing
//			optional so that the larger regex doesn't fail when a number isn't
//			negative. This one piece of the regex allows both positive and negative
//			numbers to match with just one regex.
// "\d+"
//		- Match one or more digit (0-9).
// "(\.\d+)?"
//		- This portion of the regex checks whether or not the number has a decimal
//			component to it by checking for a decimal symbol followed by at least one
//			digit (0-9). Like with the first piece of this regex, the "?" at the end
//			makes this whole section optional so that the larger regex doesn't fail
//			when a number doesn't have a decimal component to it.
// "(e[\+\-]?\d+)?"
//		- This portion of the regex checks for scientific notation by looking for the
//			literal character "e" followed by an optional + or -, followed by at least
//			one digit (0 - 9). It uses the "?" to make this part of the expression
//			optional as well so that the larger regex doesn't fail if a number is not in
//			scientific notation.
// As far as I can tell, this solution is fairly robust. It would not surprise me to
// find that there are still things that aren't properly captured by this regex, but
// for my purposes(and the purposes of this project), it works well enough.
const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/
const EXPONENT_REGEX =
	/(?<operand1>((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?)\s*(?<operation>\^)\s*(?<operand2>((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?)/
const MULTIPLY_DIVIDE_REGEX =
	/(?<operand1>((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?)\s*(?<operation>[\/\*])\s*(?<operand2>((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?)/
const ADD_SUBTRACT_REGEX =
	/(?<operand1>((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>((?<!\d)\-)?\d+(\.\d+)?(e[\+\-]?\d+)?)/

// NOTE 2: This is an example of how to create the regular expressions using the RegExp
// object instead of literal notation. For simple regular expressions, I highly
// recommend using literal notation (it's easier to read and understand), but sometimes
// there are situations where it is easier to abstract out some parts of the regular
// expressions and build them using string template literals in the RegExp constructor.
// The regular expressions above are great candidates for this approach. One thing to
// remember, though: when using this approach, anything that should be escaped in the
// final regex must be DOUBLE escaped in the string, otherwise, JavaScript removes
// the escape character ("\") when converting the string to regex and the regex becomes
// invalid. To use the following regular expressions, do one of two things:
// 1. Replace the other regular expression variables with these ones wherever they
//		are used.
// 2. Replace "equation.match(REGEX)" with "REGEX.exec(equation)", substituting REGEX
//		for the name of the appropriate variable. I've provided an example of this
//		method in the parse function below. To see it in action, comment out the
//		conditional logic under the "// Regex literals" comment and uncomment the
//		conditional logic under the "// RegExp object" comment.
const OPERAND_REGEX = "((?<!\\d)\\-)?\\d+(\\.\\d+)?(e[\\+\\-]?\\d+)?"
const OPERAND1 = `(?<operand1>${OPERAND_REGEX})`
const OPERAND2 = `(?<operand2>${OPERAND_REGEX})`
const REGEXP_TEMPLATE = `${OPERAND1}\\s*(?<operation>=op=)\\s*${OPERAND2}`
const EXPONENT_REGEXP = new RegExp(REGEXP_TEMPLATE.replace("=op=", "\\^"))
const MULT_DIV_REGEXP = new RegExp(REGEXP_TEMPLATE.replace("=op=", "[\\/\\*]"))
const ADD_SUB_REGEXP = new RegExp(REGEXP_TEMPLATE.replace("=op=", "(?<!e)[\\-\\+]"))

form.addEventListener("submit", e => {
	e.preventDefault()

	const result = parse(inputElement.value)
	outputElement.textContent = result
})

function parse(equation) {
	console.log(equation)
	// Regex literals
	if (equation.match(PARENTHESIS_REGEX)) {
		const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation
		const result = parse(subEquation)
		const newEquation = equation.replace(PARENTHESIS_REGEX, result)
		return parse(newEquation)
	} else if (equation.match(EXPONENT_REGEX)) {
		const result = handleMath(equation.match(EXPONENT_REGEX).groups)
		const newEquation = equation.replace(EXPONENT_REGEX, result)
		return parse(newEquation)
	} else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
		const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
		const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
		return parse(newEquation)
	} else if (equation.match(ADD_SUBTRACT_REGEX)) {
		const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
		const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
		return parse(newEquation)
	}

	// RegExp objects
	// if (equation.match(PARENTHESIS_REGEX)) {
	// 	const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation
	// 	const result = parse(subEquation)
	// 	const newEquation = equation.replace(PARENTHESIS_REGEX, result)
	// 	return parse(newEquation)
	// } else if (EXPONENT_REGEXP.exec(equation)) {
	// 	const result = handleMath(EXPONENT_REGEXP.exec(equation).groups)
	// 	const newEquation = equation.replace(EXPONENT_REGEXP, result)
	// 	return parse(newEquation)
	// } else if (MULT_DIV_REGEXP.exec(equation)) {
	// 	const result = handleMath(MULT_DIV_REGEXP.exec(equation).groups)
	// 	const newEquation = equation.replace(MULT_DIV_REGEXP, result)
	// 	return parse(newEquation)
	// } else if (ADD_SUB_REGEXP.exec(equation)) {
	// 	const result = handleMath(ADD_SUB_REGEXP.exec(equation).groups)
	// 	const newEquation = equation.replace(ADD_SUB_REGEXP, result)
	// 	return parse(newEquation)
	// }
	return parseFloat(equation)
}

function handleMath({ operand1, operand2, operation }) {
	console.log(operand1, operation, operand2)
	const number1 = parseFloat(operand1)
	const number2 = parseFloat(operand2)

	switch (operation) {
		case "*":
			return number1 * number2
		case "/":
			return number1 / number2
		case "+":
			return number1 + number2
		case "-":
			return number1 - number2
		case "^":
			return number1 ** number2
	}
}
