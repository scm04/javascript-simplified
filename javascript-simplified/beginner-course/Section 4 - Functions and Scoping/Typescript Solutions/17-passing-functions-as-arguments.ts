// Helper for Activity 1
function printVariable(variable: string) {
	console.log(variable)
}

// Activity 1: Create a function that takes two parameters:
// 1. name - A string containing a person's name.
// 2. callback - A function that prints out the argument
//		that we pass to it.
// The new function should append "Hello" to the beginning
// of the name and pass the result to the callback.
// Example: If name is "Kyle", callback should print
// "Hello Kyle".
// After creating the function, call it.
function sayHello(name: string, callback: (variable: string) => void) {
	callback("Hello " + name)
}

sayHello("Spencer", printVariable)

// Activity 2: Call the function created in Activity 1,
// but pass it an anonymous function for the callback
// instead of passing printVariable. (This is not an
// official activity, but I thought it was an important
// thing to reinforce from this lesson.)
sayHello("Spencer", function (variable: string) {
	console.log(variable)
})
