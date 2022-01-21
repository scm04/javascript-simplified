// Activity 1: Create a function that takes no arguments
// and prints your name, then call it.
function sayName() {
	console.log("Spencer")
}

sayName()

// Activity 2: Create a function that takes one argument
// (a person's name) and prints it out, then call it.
function sayName2(name) {
	console.log(name)
}

sayName2("Spencer")

// Activity 3: Create a function that takes one argument
// (a person's name), adds it to the end of the string
// "Hello", and returns the resulting string, then call it
// and log the result.
function sayHello(name) {
	return "Hello " + name
}

let hello = sayHello("Spencer")
console.log(hello)
