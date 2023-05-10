// When the Expand/Collapse buttons are clicked, the following needs to happen:
// 1. If the card is already expanded, collapse the card and change the button's text to "Collapse".
// 2. If the card is already collapsed, expand the card and change the button's text to "Expand".
// NOTE: The cards do not affect each other, so it is fine for multiple cards to be expanded at the same time.

// My initial solution
// Works for the given HTML, but cannot react to dynamically added cards,
// so any cards added after the page loads and the JavaScript has been run
// would not be able to expand or collapse.
/*
const buttons = document.querySelectorAll(".expand-button") as NodeListOf<HTMLButtonElement>
buttons.forEach(button => {
	button.addEventListener("click", e => {
		if (e.target == null) return
		const target = e.target as HTMLButtonElement
		const expand = target.innerText === "Expand"
		const card = target.closest(".card") as HTMLDivElement
		const body = card.querySelector(".card-body") as HTMLDivElement

		target.innerText = expand ? "Collapse" : "Expand"
		body.classList.toggle("show", expand)
	})
})
*/

// My final solution, based on the beginning of Kyle's walk-through.
// This approach should be able to handle adding new cards after the page is
// loaded.
// Essentially, I moved my listener from the buttons to the document, then added
// a filter at the beginning of the callback to make sure I only run the listener
// code when I clicked one of the buttons. The rest of my logic was correct, but
// having the listener on the document and filtering out clicks on other elements
// means I will capture clicks on any card, no matter when it was added to the DOM.
document.addEventListener("click", e => {
	if (e.target == null) return
	const target = e.target as HTMLElement
	if (!target.matches(".expand-button")) return
	const button = target as HTMLButtonElement

	const expand = button.innerText === "Expand"
	const card = button.closest(".card") as HTMLDivElement
	const body = card.querySelector(".card-body") as HTMLDivElement

	button.innerText = expand ? "Collapse" : "Expand"
	body.classList.toggle("show", expand)
})
