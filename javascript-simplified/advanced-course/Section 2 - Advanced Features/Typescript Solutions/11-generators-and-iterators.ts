/**
 * Create a generator function that gives a unique ID one greater than the
 * previous ID every time the next() function is called.
 *
 * NOTE: There's not really anything to do in this exercise to convert from
 * Javascript to Typescript. I explicitly defined the generator type so that
 * the parameter type of "next()" is void rather than unknown (which is what
 * was inferred) because that tells the Typescript compiler that we don't want
 * any parameters passed to "next()", but aside from that, I don't think
 * anything else actually needs to be modified.
 */
function* idGenerator(): Generator<number, void, void> {
	let id = 1
	while (true) {
		yield id++
	}
}
const generator1 = idGenerator()
for (let i = 0; i < 10; i++) {
	console.log(`ID ${i + 1} is ${generator1.next().value}`)
}
console.log(generator1.return()) // Causes the generator to exit.
console.log("Attempting to get an ID after returning:", generator1.next()) // Because the generator already exited, no new value is returned.
