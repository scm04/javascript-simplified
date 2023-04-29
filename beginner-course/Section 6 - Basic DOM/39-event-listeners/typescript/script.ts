// Activity 1: Add an anchor tag to the HTML and when it is
// clicked, prevent the default and log something to the
// console.
const anchor = document.querySelector("[data-link]")
anchor?.addEventListener("blur", e => {
	e.preventDefault()
	console.log("prevented default!")
})

window.addEventListener("resize", () => console.log("resize"))

// What changed to convert this to Typescript? Just one thing.
// The "querySelector()" method can return null, so Typescript
// does not allow the "addEventListener()" method to be called
// directly on the result of "querySelector()". This can be
// solved by casting the result as an HTMLElement or a class
// representing a specific kind of HTML element (in this case,
// HTMLAnchorElement would do the trick since I am querying
// for an anchor element), but that still leaves the possibility
// of the result of "querySelector()" being null, which could lead
// to unintuitive behavior. In this example, I chose to use optional
// chaining to solve the problem, which means "addEventListener()" is
// only called if the result of "querySelector()" is not null. I think
// this is probably the best method to use in this situation, though
// I am not comfortable enough in Typescript to know whether or not
// there is a better/more widely accepted solution that makes use of
// Typescript-specific features (casting is a Typescript-specific
// feature, but optional chaining is actually vanilla Javascript).
