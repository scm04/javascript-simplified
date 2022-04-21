/**
 * Activity 1: Create a new class called Cat that extends the Animal class in the
 * provided code. The Cat constructor should only take a name, and the Cat class
 * should override the speak method from the Animal class to say 'Meow'.
 */
// Original code
class Animal {
	constructor(name) {
		this.name = name
	}

	speak() {
		console.log(`I am ${this.name}`)
	}
}

class Dog extends Animal {
	constructor(name, owner) {
		super(name)
		this.owner = owner
	}

	speak() {
		console.log("Bark")
	}
}
const dog = new Dog("Fluffy", "Hagrid")
console.log(dog)
dog.speak()

// Cat code
// Because the Cat constructor is exactly the same as the Animal constructor,
// the Cat class does not need to define its own constructor since it inherited one
// from the Animal class. Instead, when Cat in instantiated with the new keyword,
// JavaScript will just look up the prototype chain until it finds the Animal
// constructor and it will invoke that constructor with the name that was given.
class Cat extends Animal {
	speak() {
		console.log("Meow")
	}
}
const cat = new Cat("Crookshanks")
console.log(cat)
cat.speak()

/**
 * Activity 2: Create a person class that only has a name property, then create a
 * Janitor class that inherits from Person and takes a second property called
 * numberOfMops. Give the Janitor class a method called clean that the says that
 * the janitor cleaned with the number of mops they are using.
 */
class Person {
	constructor(name) {
		this.name = name
	}
}

class Janitor extends Person {
	constructor(name, numberOfMops) {
		super(name)
		this.numberOfMops = numberOfMops
	}

	clean() {
		console.log(`${this.name} cleaned using ${this.numberOfMops} mops!`)
	}
}
const janitor = new Janitor("Bob", 24)
console.log(janitor)
janitor.clean()
