/**
 * Activity 1: Given the following impure function, modify it so that it is pure.
 */
// Input data
const person = {
	name: "Kyle",
	friends: ["John", "Sally"]
}
// Original function.
function addFriend(friendName) {
	person.friends.push(friendName)
}
addFriend("Joey")
console.log(JSON.stringify(person))
// Pure function.
function addFriendPure(friends, friendName) {
	return [...friends, friendName]
}
console.log(addFriendPure(person.friends, "Joey"))
console.log(JSON.stringify(person))
// Kyle's pure function
function addFriendPureKyle(person, friendName) {
	return { ...person, friends: [...person.friends, friendName] }
}
console.log(JSON.stringify(addFriendPureKyle(person, "Joey")))
console.log(JSON.stringify(person))
