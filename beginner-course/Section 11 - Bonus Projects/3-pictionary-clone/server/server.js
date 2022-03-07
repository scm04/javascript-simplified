const production = process.env.NODE_ENV === "production"
const clientURL = production ? "google.com" : "http://localhost:1234"

const { Server } = require("socket.io")
const io = new Server(3000, {
	cors: {
		origin: clientURL
	}
})

const rooms = {}
const WORDS = ["Dog", "Bike", "Human"]

io.on("connection", socket => {
	socket.on("join-room", ({ name, roomId }) => {
		const user = { id: socket.id, name, socket }

		let room = rooms[roomId]
		if (room == null) {
			room = { users: [], waitList: [], canvasLines: [], id: roomId }
			rooms[roomId] = room
		}

		/**
		 * Challenge 4: Prevent people from joining a room mid-game.
		 * 		- Give the user a warning that the room already has a game in
		 * 			progress and allow them to choose whether to join the wait-
		 * 			list for the current room or go back to select a different room.
		 */
		socket.on("wait-list", () => {
			room.waitList.push(user)
			socket.join(room.id)
			socket.emit("canvas-data", room.canvasLines)
		})
		if (room.inProgress) {
			socket.emit("game-in-progress")
		} else {
			room.users.push(user)
			socket.join(room.id)
		}

		socket.on("ready", () => {
			user.ready = true
			startRound()
		})
		function startRound() {
			if (room.users.every(u => u.ready)) {
				// Set up round
				room.inProgress = true
				room.word = getRandomEntry(WORDS)
				room.drawer = getRandomEntry(room.users)
				// Tell drawer the word
				io.to(room.drawer.id).emit("start-drawer", room.word)
				// Tell everyone else they are guessers
				room.drawer.socket.to(room.id).emit("start-guesser")
			}
		}

		socket.on("draw", data => {
			socket.to(room.id).emit("draw-line", data)
			// For Challenge 4 (see section above for details)
			room.canvasLines.push(data)
		})

		socket.on("make-guess", data => {
			socket.to(room.id).emit("guess", user.name, data.guess)
			if (data.guess.toLowerCase().trim() === room.word.toLowerCase()) {
				io.to(room.id).emit("winner", user.name, room.word)
				room.inProgress = false
				room.users.forEach(u => (u.ready = false))
				// For Challenge 4 (see section above for details)
				while (room.waitList.length > 0) {
					room.users.push(room.waitList.pop())
				}
				room.canvasLines = []
			}
		})

		/**
		 * Challenge 1: Add the ability for the drawer to choose the line color.
		 */
		// Obsoleted during Challenge 4 when drawing was updated to pass
		// all drawing parameters to the server to help facilitate
		// spectating for those on the wait-list.
		// This functionality is now handled in the data passed through the
		// "draw" event.
		// socket.on("change-draw-color", data => {
		// 	socket.to(room.id).emit("draw-color", data.color)
		// })

		/**
		 * Challenge 2: Add the ability for the drawer to choose the line width.
		 */
		// Obsoleted during Challenge 4 when drawing was updated to pass
		// all drawing parameters to the server to help facilitate
		// spectating for those on the wait-list.
		// This functionality is now handled in the data passed through the
		// "draw" event.
		// socket.on("change-line-width", data => {
		// 	socket.to(room.id).emit("line-width", data.lineWidth)
		// })

		/**
		 * Challenge 3: Add the ability for the drawer to erase things.
		 */
		// Obsoleted during Challenge 4 when drawing was updated to pass
		// all drawing parameters to the server to help facilitate
		// spectating for those on the wait-list.
		// This functionality is now handled in the data passed through the
		// "draw" event.
		// socket.on("toggle-erasing", () => {
		// 	socket.to(room.id).emit("toggle-erasing")
		// })

		socket.on("disconnect", () => {
			room.users = room.users.filter(u => u.id !== user.id)
			// For Challenge 4 (see section above for details)
			room.waitList = room.waitList.filter(u => u.id !== user.id)
			if (room.users.length === 0) {
				room.inProgress = false
			} else if (!room.inProgress) {
				startRound()
			}
		})
	})
})

function getRandomEntry(array) {
	let index = Math.floor(Math.random() * array.length)
	return array[index]
}
