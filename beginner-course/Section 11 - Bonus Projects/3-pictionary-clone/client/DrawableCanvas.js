export default function DrawableCanvas(canvas, socket) {
	// Defaults
	this.DEFAULT_COLOR = "#000000"
	this.DEFAULT_LINE_WIDTH = 1

	// Public properties
	this.canDraw = false
	this.strokeColor = this.DEFAULT_COLOR
	this.lineWidth = this.DEFAULT_LINE_WIDTH
	this.erasing = false
	this.resetCanvas = function () {
		this.resetDrawingTools()
		clearCanvas()
	}

	let prevPosition = null

	canvas.addEventListener("mousemove", e => {
		const drawing = e.buttons === 1 && this.canDraw
		if (!drawing) {
			prevPosition = null
			return
		}

		const newPosition = { x: e.layerX, y: e.layerY }
		if (prevPosition != null) {
			drawLine(
				prevPosition,
				newPosition,
				this.strokeColor,
				this.lineWidth,
				this.erasing
			)
			// I want to change this to also include whether or not
			// the drawer is currently erasing, that way I can easily
			// store the history of lines drawn on the server so I can
			// pass the it on to people who join mid-round and they
			// won't be left out.
			socket.emit("draw", {
				start: normalizePosition(prevPosition),
				end: normalizePosition(newPosition),
				strokeColor: this.strokeColor,
				lineWidth: this.lineWidth,
				erasing: this.erasing
			})
		}

		prevPosition = newPosition
	})

	canvas.addEventListener("mouseleave", () => (prevPosition = null))

	socket.on("draw-line", ({ start, end, strokeColor, lineWidth, erasing }) => {
		drawLine(
			toCanvasSpace(start),
			toCanvasSpace(end),
			strokeColor,
			lineWidth,
			erasing
		)
	})

	/**
	 * Challenge 1: Add the ability for the drawer to choose the line color.
	 */
	const colorPicker = document.querySelector("[data-color-picker]")
	colorPicker.addEventListener("change", this.setStrokeColor)
	this.setStrokeColor = e => {
		this.strokeColor = e.target.value

		// Obsoleted during Challenge 4 when drawing was updated to pass
		// all drawing parameters to the server to help facilitate
		// spectating for those on the wait-list.
		// socket.emit("change-draw-color", { color: e.target.value })
	}
	// Obsoleted during Challenge 4 when drawing was updated to pass
	// all drawing parameters to the server to help facilitate
	// spectating for those on the wait-list.
	// socket.on("draw-color", color => (this.strokeColor = color))

	/**
	 * Challenge 2: Add the ability for the drawer to choose the line width.
	 */
	const lineWidthSelector = document.querySelector("[data-line-width-selector]")
	lineWidthSelector.addEventListener("change", this.setLineWidth)
	this.setLineWidth = e => {
		this.lineWidth = e.target.value

		// Obsoleted during Challenge 4 when drawing was updated to pass
		// all drawing parameters to the server to help facilitate
		// spectating for those on the wait-list.
		// socket.emit("change-line-width", { lineWidth: e.target.value })
	}
	// Obsoleted during Challenge 4 when drawing was updated to pass
	// all drawing parameters to the server to help facilitate
	// spectating for those on the wait-list.
	// socket.on("line-width", lineWidth => (this.lineWidth = lineWidth))

	this.resetDrawingTools = function () {
		this.strokeColor = this.DEFAULT_COLOR
		colorPicker.removeEventListener("change", this.setStrokeColor)
		colorPicker.value = this.strokeColor
		colorPicker.addEventListener("change", this.setStrokeColor)

		this.lineWidth = this.DEFAULT_LINE_WIDTH
		lineWidthSelector.removeEventListener("change", this.setLineWidth)
		lineWidthSelector.value = this.lineWidth
		lineWidthSelector.addEventListener("change", this.setLineWidth)
	}

	/**
	 * Challenge 4: Prevent people from joining a room mid-game.
	 * 		- When someone joins the wait-list, the server will
	 * 			send them the previously drawn lines so they can
	 * 			see what's already happened.
	 */
	socket.on("canvas-data", canvasLines => {
		for (const { start, end, strokeColor, lineWidth, erasing } of canvasLines) {
			drawLine(
				toCanvasSpace(start),
				toCanvasSpace(end),
				strokeColor,
				lineWidth,
				erasing
			)
		}
	})

	function clearCanvas() {
		const context = canvas.getContext("2d")
		context.clearRect(0, 0, canvas.width, canvas.height)
	}

	function drawLine(
		start,
		end,
		strokeColor = "#000000",
		lineWidth = 1,
		erasing = false
	) {
		const context = canvas.getContext("2d")
		context.strokeStyle = strokeColor
		context.lineWidth = lineWidth * lineWidthModifier(lineWidth, erasing)
		context.globalCompositeOperation = erasing ? "destination-out" : "source-over"
		context.beginPath()
		context.moveTo(start.x, start.y)
		context.lineTo(end.x, end.y)
		context.stroke()
	}

	function lineWidthModifier(lineWidth, erasing) {
		if (!erasing) return 1
		if (lineWidth < 1) return 50
		if (lineWidth === 1) return 30
		return 20
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
