// This is the get Typescript to treat this file as a module.
// It complains about redefining variables if I don't do this because
// I used the same variable names in activities 8, 9, and 10, and
// Typescript assumes a file is supposed to run as a global script if
// there are no import or export statements. As far as I can tell,
// there is no built-in way to tell Typescript to treat a file as
// a module aside from this or creating a tsconfig with moduleDetection
// set to force.
export {}

// Activity 1: Create two variables, one for your first name
// and one for your last name, then combine them together
// using back-ticks (string template literals).
const firstName = "Spencer"
const lastName = "Meredith"

console.log(`${firstName} ${lastName}`)
