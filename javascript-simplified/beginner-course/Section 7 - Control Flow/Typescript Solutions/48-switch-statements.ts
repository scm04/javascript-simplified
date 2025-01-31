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
 * Activity 1: Create a switch statement that checks the value
 * of a number variable and prints out one of the following:
 * --- If the number is 0, print "it is zero"
 * --- If the number is 1 or 2, print "it is small"
 * --- If the number is 3 or 4, print "it is medium"
 * --- If the number is 5, print "it is large"
 * --- If the number is not between 0 and 5, print "try again"
 *
 * NOTE: Typescript treats the "type" of a const variable as the
 * 		 literal value of the variable rather than the type of
 * 		 the value, so a const variable cannot be compared against
 * 		 many different values using its inferred type. To fix this,
 * 		 either give the const variable an explicit type, or declare
 * 		 the variable with the "let" keyword instead.
 */
const number: number = 0
switch (number) {
	case 0:
		console.log("it is zero")
		break
	case 1:
	case 2:
		console.log("it is small")
		break
	case 3:
	case 4:
		console.log("it is medium")
		break
	case 5:
		console.log("it is large")
		break
	default:
		console.log("try again")
}
