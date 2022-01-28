/**
 * Activity 1: Create a variable that contains an array.
 * Using an if statement with else if, check the length
 * of the array and print one of the following values:
 * --- If it is empty, print "empty"
 * --- If it has less than 5 elements, print "small"
 * --- If it has less than 10 elements, print "medium"
 * --- Otherwise, print "large"
 */
const numbers = [] // "empty"
// const numbers = [1] // "small"
// const numbers = [1, 2, 3, 4, 5] // "medium"
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // "large"

if (numbers.length === 0) {
	console.log("empty")
} else if (numbers.length < 5) {
	console.log("small")
} else if (numbers.length < 10) {
	console.log("medium")
} else {
	console.log("large")
}
