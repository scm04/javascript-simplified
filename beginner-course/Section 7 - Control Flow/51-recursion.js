const person = {
	name: "Kyle",
	friend: {
		name: "Joe",
		friend: {
			name: "Sally"
		}
	}
}

function printNames(person) {
	if (person == null) return
	console.log(person.name)
	printNames(person.friend)
}

printNames(person)
