/**
 * Activity 1: Given a person object with an age property, add a getter that
 * returns the year the person was born.
 */
const person = {
	age: 25,
	get birthYear() {
		return new Date().getFullYear() - this.age
	}
}
console.log(person.birthYear)
