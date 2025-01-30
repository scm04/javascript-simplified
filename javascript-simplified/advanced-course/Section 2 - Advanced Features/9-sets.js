/**
 * Activity 1: Create a function called removeDupes that takes in an array and removes
 * 		all the duplicate values in the array using a Set.
 */
function removeDupes(array) {
	return [...new Set(array)]
}
console.log(removeDupes([1, 2, 3, 4, 5, 4, 3, 2, 1, 6]))
