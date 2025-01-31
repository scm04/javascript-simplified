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
 * Activity 1: Create a for loop that loops from 0 to 10 and
 * prints out all values from 0 to 10 (inclusive).
 */
for (let i = 0; i <= 10; i++) {
	console.log(i)
}

/**
 * Activity 2: Take the loop from Activity 1 and modify it
 * so that the loop exits when the value is equal to 5 by
 * using the break keyword.
 */
for (let i = 0; i <= 10; i++) {
	if (i === 5) break
	console.log(i)
}
