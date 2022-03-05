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
			socket.emit("draw", {
				start: normalizePosition(prevPosition),
				end: normalizePosition(newPosition)
			})
		}

		prevPosition = newPosition
	})

	canvas.addEventListener("mouseleave", () => (prevPosition = null))

	socket.on("draw-line", (start, end) => {
		drawLine(
			toCanvasSpace(start),
			toCanvasSpace(end),
			this.strokeColor,
			this.lineWidth,
			this.erasing
		)
	})

	/**
	 * Challenge 1: Add the ability for the drawer to choose the line color.
	 */
	const colorPicker = document.querySelector("[data-color-picker]")
	colorPicker.addEventListener("change", this.setStrokeColor)
	this.setStrokeColor = e => {
		this.strokeColor = e.target.value
		socket.emit("change-draw-color", { color: e.target.value })
	}
	socket.on("draw-color", color => (this.strokeColor = color))

	/**
	 * Challenge 2: Add the ability for the drawer to choose the line width.
	 */
	const lineWidthSelector = document.querySelector("[data-line-width-selector]")
	lineWidthSelector.addEventListener("change", this.setLineWidth)
	this.setLineWidth = e => {
		this.lineWidth = e.target.value
		socket.emit("change-line-width", { lineWidth: e.target.value })
	}
	socket.on("line-width", lineWidth => (this.lineWidth = lineWidth))

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
