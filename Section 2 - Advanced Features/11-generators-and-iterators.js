/**
 * Create a generator function that gives a unique ID one greater than the
 * previous ID every time the next() function is called.
 */
function* idGenerator() {
	let id = 1
	while (true) {
		yield id++
	}
}
const generator1 = idGenerator()
for (let i = 0; i < 10; i++) {
	console.log(`ID ${i + 1} is ${generator1.next().value}`)
}
