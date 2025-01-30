/**
 * Activity 1: Create a higher-order function called groupBy that takes in an
 * object and a function and groups the object properties using the function.
 */
// Input data
const people = [
	{
		name: "Kyle",
		friends: ["John", "Sally"]
	},
	{
		name: "Joey",
		friends: ["Kyle"]
	},
	{
		name: "Sally",
		friends: ["John", "Kyle"]
	}
]
// My solution
function groupBy(array, func) {
	const result = {}
	array.forEach(elem => {
		const elemResult = func(elem)
		if (result[elemResult] == null) result[elemResult] = []
		result[elemResult] = [...result[elemResult], elem]
	})
	return result
}
console.log(JSON.stringify(groupBy(people, person => person.friends.length)))
// Kyle's solution
function groupByKyle(array, func) {
	return array.reduce((grouping, element) => {
		const key = func(element)
		if (grouping[key] == null) grouping[key] = []
		grouping[key].push(element)
		return grouping
	}, {})
}
console.log(JSON.stringify(groupByKyle(people, person => person.friends.length)))
