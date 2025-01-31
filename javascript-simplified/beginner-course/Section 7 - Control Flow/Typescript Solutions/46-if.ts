// This is the get Typescript to treat this file as a module.
// It complains about redefining variables if I don't do this because
// I used the same variable names in activities 8, 9, and 10, and
// Typescript assumes a file is supposed to run as a global script if
// there are no import or export statements. As far as I can tell,
// there is no built-in way to tell Typescript to treat a file as
// a module aside from this or creating a tsconfig with moduleDetection
// set to force.
export {}

/**
 * Activity 1: Create a variable that contains an array.
 * Using an if statement with else if, check the length
 * of the array and print one of the following values:
 * --- If it is empty, print "empty"
 * --- If it has less than 5 elements, print "small"
 * --- If it has less than 10 elements, print "medium"
 * --- Otherwise, print "large"
 */
const numbers: number[] = [] // "empty"
// const numbers: number[] = [1] // "small"
// const numbers: number[] = [1, 2, 3, 4, 5] // "medium"
// const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // "large"

if (numbers.length === 0) {
	console.log("empty")
} else if (numbers.length < 5) {
	console.log("small")
} else if (numbers.length < 10) {
	console.log("medium")
} else {
	console.log("large")
}
