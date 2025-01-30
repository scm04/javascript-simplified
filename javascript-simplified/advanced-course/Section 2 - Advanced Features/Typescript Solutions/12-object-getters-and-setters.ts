/**
 * Activity 1: Given a person object with an age property, add a getter that
 * returns the year the person was born.
 *
 * NOTE: Nothing needs to change to convert the original file from Javascript to
 * Typescript. I explicitly defined the return type of the birthYear getter
 * as number in this file, but Typescript is smart enough to infer that type
 * based on the fact that Date and this.age are both numbers, which means the
 * subtraction will result in a number.
 */
const person = {
	age: 25,
	get birthYear(): number {
		return new Date().getFullYear() - this.age
	}
}
console.log(person.birthYear)
