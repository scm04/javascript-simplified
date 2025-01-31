// This is the get Typescript to treat this file as a module.
// It complains about redefining variables if I don't do this because
// I used the same variable names in activities 8, 9, and 10, and
// Typescript assumes a file is supposed to run as a global script if
// there are no import or export statements. As far as I can tell,
// there is no built-in way to tell Typescript to treat a file as
// a module aside from this or creating a tsconfig with moduleDetection
// set to force.
export {}

// Activity 1: Create an array with the first 5 letters of the
// alphabet, then print out the middle element in the array ('c').
const alphabet = ["a", "b", "c", "d", "e"]
console.log(alphabet[2]) // 'c'

// Activity 2: With the given nested arrays, print out the
// values 4, 8, and 11.
const a = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
	[11, 12, 13, 14, 15]
]
console.log(a[0][3]) // 4
console.log(a[1][2]) // 8
console.log(a[2][0]) // 11
