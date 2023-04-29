type Person = {
	name: string
	friend?: Person
}
const person: Person = {
	name: "Kyle",
	friend: {
		name: "Joe",
		friend: {
			name: "Sally"
		}
	}
}

/**
 * This is my original implementation. I had to make
 * the parameter type "Person | undefined" because
 * when I try to access the "friend" property for
 * Sally, the value is undefined since Sally doesn't
 * have a friend.
 */
function printNames(person: Person | undefined) {
	if (person == null) return
	console.log(person.name)
	printNames(person.friend)
}

printNames(person)

/**
 * This is an alternative implementation where I
 * can guarantee that the parameter will always
 * be a Person because instead of checking that
 * the Person exists before I do anything, I check
 * whether the current Person has a friend before
 * I call the function recursively on the current
 * Person's friend, so if the current Person does
 * not have a friend (like Sally in the data above),
 * the function will not be called with null or
 * undefined as the parameter value.
 *
 * I prefer this method of implementation, personally.
 */
function printNames2(person: Person) {
	console.log(person.name)
	if (person.friend == null) return
	printNames2(person.friend)
}

printNames2(person)
