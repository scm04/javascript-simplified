// Activity 1: Create an object called car with the properties:
// 1. make - A string containing the car's brand.
// 2. model - A string containing the car's model name.
// 3. isUsed - A boolean that indicates whether the car is
// 		used or new.
// 4. makeNoise - A function that logs out 'Vroom'.
let car = {
	make: "Nissan",
	model: "Versa",
	isUsed: true,
	makeNoise() {
		console.log("Vroom")
	}
}
console.log(car.make)
console.log(car.model)
console.log(car.isUsed)
car.makeNoise()

// Activity 2: Create an object called book with the properties:
// 1. title - string
// 2. author - object with the properties name and age
let book = {
	title: "Harry Potter and the Philosopher's Stone",
	author: {
		name: "J.K. Rowling",
		age: 56
	}
}
console.log(book.title)
console.log(book.author.name)
console.log(book.author.age)
