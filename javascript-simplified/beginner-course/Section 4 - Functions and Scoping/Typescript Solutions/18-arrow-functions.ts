// Activity 1: Take the given printName function and convert
// it to an arrow function.
function printName(name: string) {
	console.log(name)
}

const printNameArrow = (name: string) => {
	console.log(name)
}

printName("Spencer")
printNameArrow("Spencer")

// Activity 2: Take the given printHi function and convert
// it to a one-line arrow function.
function printHi(name: string) {
	return "Hi " + name
}

const printHiArrow = (name: string) => "Hi " + name

console.log(printHi("Spencer"))
console.log(printHiArrow("Spencer"))
