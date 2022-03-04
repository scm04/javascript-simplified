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
			room = { users: [], id: roomId }
			rooms[roomId] = room
		}

		room.users.push(user)
		socket.join(room.id)

		socket.on("ready", () => {
			user.ready = true
			if (room.users.every(u => u.ready)) {
				// Set up round
				room.word = getRandomEntry(WORDS)
				room.drawer = getRandomEntry(room.users)
				// Tell drawer the word
				io.to(room.drawer.id).emit("start-drawer", room.word)
				// Tell everyone else they are guessers
				room.drawer.socket.to(room.id).emit("start-guesser")
			}
		})

		socket.on("draw", data => {
			socket.to(room.id).emit("draw-line", data.start, data.end)
		})

		socket.on("make-guess", data => {
			socket.to(room.id).emit("guess", user.name, data.guess)
			if (data.guess.toLowerCase().trim() === room.word.toLowerCase()) {
				io.to(room.id).emit("winner", user.name, room.word)
				room.users.forEach(u => (u.ready = false))
			}
		})

		socket.on("disconnect", () => {
			room.users = room.users.filter(u => u.id !== user.id)
		})
	})
})

function getRandomEntry(array) {
	let index = Math.floor(Math.random() * array.length)
	return array[index]
}
