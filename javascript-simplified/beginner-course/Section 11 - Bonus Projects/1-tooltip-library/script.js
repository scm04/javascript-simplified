import "./tooltip.js"

document.addEventListener("keydown", e => {
	const container = document.querySelector(".container")

	switch (e.key) {
		case "ArrowLeft":
			if (container.classList.contains("x-right")) {
				container.classList.remove("x-right")
			} else {
				container.classList.add("x-left")
			}
			break
		case "ArrowRight":
			if (container.classList.contains("x-left")) {
				container.classList.remove("x-left")
			} else {
				container.classList.add("x-right")
			}
			break
		case "ArrowUp":
			if (container.classList.contains("y-bottom")) {
				container.classList.remove("y-bottom")
			} else {
				container.classList.add("y-top")
			}
			break
		case "ArrowDown":
			if (container.classList.contains("y-top")) {
				container.classList.remove("y-top")
			} else {
				container.classList.add("y-bottom")
			}
			break
	}
})
