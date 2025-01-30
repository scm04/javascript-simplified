/**
 * Activity 1: Take the provided code and rewrite it using a Map.
 */
// Typescript modification: add a type for the array items and
// use it to set an explicit type for the array rather than
// allowing Typescript to infer the type. I don't know if it is
// better practice to do one vs the other, but I am going to do
// it this way for now so I can practice explicitly typing things.
type Item = {
	id: number
	name: string
	description: string
}
// Provided Code
const items: Item[] = [
	{
		id: 1,
		name: "Test",
		description: "Description"
	},
	{
		id: 2,
		name: "Test 2",
		description: "Description 2"
	},
	{
		id: 3,
		name: "Test 3",
		description: "Description 3"
	}
]
function getItemFromArray(id: number) {
	return items.find(item => item.id === id)
}
console.log(getItemFromArray(2))

// My Solution
const itemMap: Map<number, Item> = new Map(items.map(item => [item.id, item]))
function getItemFromMap(id: number) {
	return itemMap.get(id)
}
console.log(getItemFromMap(3))
