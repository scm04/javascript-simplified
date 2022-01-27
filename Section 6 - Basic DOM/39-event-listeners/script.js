// Activity 1: Add an anchor tag to the HTML and when it is
// clicked, prevent the default and log something to the
// console.
const anchor = document.querySelector("[data-link]")
anchor.addEventListener("blur", e => {
	e.preventDefault()
	console.log("prevented default!")
})

window.addEventListener("resize", () => console.log("resize"))
