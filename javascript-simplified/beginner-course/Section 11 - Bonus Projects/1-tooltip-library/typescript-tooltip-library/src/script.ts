import "./tooltip.ts"

document.addEventListener("keyup", e => {
	const container = document.querySelector("[data-container]") as HTMLDivElement

	switch (e.key) {
		case "ArrowLeft":
			container.classList.replace("x-center", "x-left")
			container.classList.replace("x-right", "x-center")
			break
		case "ArrowRight":
			container.classList.replace("x-center", "x-right")
			container.classList.replace("x-left", "x-center")
			break
		case "ArrowUp":
			container.classList.replace("y-center", "y-top")
			container.classList.replace("y-bottom", "y-center")
			break
		case "ArrowDown":
			container.classList.replace("y-center", "y-bottom")
			container.classList.replace("y-top", "y-center")
			break
	}
})
