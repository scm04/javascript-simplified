/**
 * Activity 1: Create a function called removeDupes that takes in an array and removes
 * 		all the duplicate values in the array using a Set.
 *
 * NOTE: In practice, it is usually not a good idea to use the "any" type (it is better
 * to actually define the types that are allowed), but I decided to leave it that way
 * for a general exercise like this. There are two ways to lock down the type better:
 * 1. Replace "any[]" with "(type1|type2|type3)[]" to create an inline type union of
 * 		the types I want to allow.
 * 2. Define a new type "type AllowedTypes = type1 | type2 | type3", then replace
 * 		"any[]" with "AllowedTypes[]" in the parameter declaration.
 * I'm not 100% clear on the differences between the two methods, but my feeling based
 * on my exposure to typescript is that method 2 should only be used when you want to
 * reuse a specific type in more than one place. Using this exercise as an example,
 * if I was creating a module that had many methods for completing different operations
 * on an array that will always have elements of the same type(s), it would make sense
 * to create a type definition at the top of the module that could be used in the
 * declarations of each of the methods. Doing so means that I'm not re-declaring the
 * type for each method and also makes it so that I only have to update the type in one
 * place if I decide to change what types are allowed, so it greatly reduces the likelihood
 * of breaking the functionality of the module by not updating the type declaration in one
 * of the methods.
 *
 * NOTE 2: I discovered while doing this exercise that I can't set the default value of a
 * parameter to an empty array unless I give the parameter (or the default value) a type.
 * I'm guessing this is because Typescript can't infer enough about the type of the parameter
 * from an empty array, but I'm not sure. That said, in a real-world situation, I would
 * probably declare a type anyway, so this is unlikely to be a problem outside of simple
 * exercises like this one where the parameter type is not as important as the concepts
 * being covered.
 */
function removeDupes(array: any[] = []) {
	return [...new Set(array)]
}
console.log(removeDupes([1, 2, 3, 4, 5, 4, 3, 2, 1, 6]))
console.log(removeDupes([1, 2, 2, 3, "a", "a", "hello, world!", "forty-two", "a"]))
console.log(removeDupes())
