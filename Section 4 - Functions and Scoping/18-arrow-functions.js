// Activity 1: Take the given printName function and convert
// it to an arrow function.
function printName(name) {
	console.log(name)
}

let printNameArrow = name => {
	console.log(name)
}

printName("Spencer")
printNameArrow("Spencer")

// Activity 2: Take the given printHi function and convert
// it to a one-line arrow function.
function printHi(name) {
	return "Hi " + name
}

let printHiArrow = name => "Hi " + name

console.log(printHi("Spencer"))
console.log(printHiArrow("Spencer"))
