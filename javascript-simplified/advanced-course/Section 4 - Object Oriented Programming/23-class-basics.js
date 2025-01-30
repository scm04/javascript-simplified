/**
 * Activity 1: Convert the following code to code that uses a prototype and again
 * to code that uses a class.
 */
// Original code
function createUser(email, password, language) {
	return {
		email,
		password,
		language,
		printPassword() {
			console.log(this.password)
		}
	}
}
console.log(createUser("test@test.com", "password", "English"))

// Using a prototype
function User(email, password, language) {
	this.email = email
	this.password = password
	this.language = language
}
User.prototype.printPassword = function () {
	console.log(this.password)
}
console.log(new User("test@test.com", "password", "English"))

// Using a class
class User2 {
	constructor(email, password, language) {
		this.email = email
		this.password = password
		this.language = language
	}

	printPassword() {
		console.log(this.password)
	}
}
console.log(new User2("test@test.com", "password", "English"))
