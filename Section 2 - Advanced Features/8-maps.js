/**
 * Activity 1: Take the provided code and rewrite it using a Map.
 */
// Provided Code
const items = [
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
function getItemFromArray(id) {
	return items.find(item => item.id === id)
}
console.log(getItemFromArray(2))

// My Solution
const itemMap = new Map(items.map(item => [item.id, item]))
function getItemFromMap(id) {
	return itemMap.get(id)
}
console.log(getItemFromMap(3))
