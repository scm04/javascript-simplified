/**
 * Activity 1: Create a switch statement that checks the value
 * of a number variable and prints out one of the following:
 * --- If the number is 0, print "it is zero"
 * --- If the number is 1 or 2, print "it is small"
 * --- If the number is 3 or 4, print "it is medium"
 * --- If the number is 5, print "it is large"
 * --- If the number is not between 0 and 5, print "try again"
 */
const number = 0
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
