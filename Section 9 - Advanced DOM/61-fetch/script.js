const BASE_URL = "https://jsonplaceholder.typicode.com"
const USERS_URL = `${BASE_URL}/users`

fetch(USERS_URL)
	.then(response => response.json())
	/**
	 * Activity 1: Log the name of each user retrieved by
	 * the API call above. (Each name can be logged
	 * individually or all names can be logged in an array.)
	 */
	.then(data => console.log(data.map(user => user.name)))

/**
 * Activity 2: Make the same API call as above using
 * async/await and print the names of the users.
 */
async function getUsers() {
	const response = await fetch(USERS_URL)
	const users = await response.json()
	console.log(users.map(user => user.name))
}
getUsers()

/**
 * Activity 3: Retrieve all comments with postId = 1 using
 * either of the asynchronous methods that were practiced
 * in Activities 1 and 2.
 */
const COMMENTS_URL = `${BASE_URL}/comments?postId=1`
async function getComments() {
	const response = await fetch(COMMENTS_URL)
	const comments = await response.json()
	console.log(comments)
}
getComments()
