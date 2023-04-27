/**
 * Activity 1: In the following functions, take the full name
 * 		string, split it into the first and last name, and
 * 		return it as an Array in one function and an Object in
 * 		the other function, then call each of those functions
 * 		and use destructuring to access the results and log
 * 		them to the terminal.
 */
function nameToFirstAndLastArray(fullName: string): string[] {
	return fullName.split(" ")
}
const [firstName1, lastName1] = nameToFirstAndLastArray("Spencer Meredith")
console.log(firstName1)
console.log(lastName1)

type NameParts = {
	firstName: string
	lastName: string
}
function nameToFirstAndLastObject(fullName: string): NameParts {
	const [firstName, lastName] = fullName.split(" ")
	return { firstName, lastName }
}
const { firstName, lastName } = nameToFirstAndLastObject("Spencer Meredith")
console.log(firstName)
console.log(lastName)
