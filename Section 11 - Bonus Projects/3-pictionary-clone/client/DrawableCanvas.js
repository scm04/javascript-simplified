export default function DrawableCanvas(canvas, socket) {
	this.canDraw = false
	this.strokeColor = "#000000"
	this.lineWidth = 1
	this.clearCanvas = function () {
		const context = canvas.getContext("2d")
		context.clearRect(0, 0, canvas.width, canvas.height)
	}

	let prevPosition = null

	canvas.addEventListener("mousemove", e => {
		const drawing = e.buttons === 1 // && this.canDraw
		if (!drawing) {
			prevPosition = null
			return
		}

		const newPosition = { x: e.layerX, y: e.layerY }
		if (prevPosition != null) {
			console.log(this.canDraw, this.strokeColor, this.lineWidth)
			drawLine(prevPosition, newPosition, this.strokeColor, this.lineWidth)
			socket.emit("draw", {
				start: normalizePosition(prevPosition),
				end: normalizePosition(newPosition)
			})
		}

		prevPosition = newPosition
	})

	canvas.addEventListener("mouseleave", () => (prevPosition = null))

	socket.on("draw-line", (start, end) => {
		drawLine(toCanvasSpace(start), toCanvasSpace(end))
	})

	function drawLine(start, end, strokeColor = "#000000", lineWidth = 1) {
		const context = canvas.getContext("2d")
		context.strokeStyle = strokeColor
		context.lineWidth = lineWidth
		context.beginPath()
		context.moveTo(start.x, start.y)
		context.lineTo(end.x, end.y)
		context.stroke()
	}

	function normalizePosition(position) {
		return {
			x: position.x / canvas.width,
			y: position.y / canvas.height
		}
	}

	function toCanvasSpace(position) {
		return {
			x: position.x * canvas.width,
			y: position.y * canvas.height
		}
	}
}
