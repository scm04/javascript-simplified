/**
 * Challenge 4: Prevent people from joining a room mid-game.
 * 		- Pre-fill the user's name if they tried to join a room
 * 			mid-game and chose to come back to the home page to
 * 			try a different room.
 */
const urlParams = new URLSearchParams(window.location.search)
const name = urlParams.get("name")
const nameInput = document.querySelector("#name")
console.log(urlParams)
console.log(name)
console.log(nameInput)
if (name) {
	nameInput.value = name
}
