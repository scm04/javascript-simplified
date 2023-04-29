// 1. Select all elements
const form = document.querySelector("#new-item-form") as HTMLFormElement
const list = document.querySelector("#list") as HTMLDivElement
const input = document.querySelector("#item-input") as HTMLInputElement

// 2. When the form is submitted, add a new element
form.addEventListener("submit", e => {
	e.preventDefault()

	// 1. Create a new item
	const item = document.createElement("div")
	item.innerText = input.value
	item.classList.add("list-item")

	// 2. Add the new item to the list
	list.appendChild(item)

	// 3. Clear the input
	input.value = ""

	// 4. Set an event listener to delete the item when clicked
	item.addEventListener("click", () => item.remove())
})

// What changed in this file? Ironically, although I opted for optional
// chaining over type casting in 39-event-listeners, all I did to convert
// this file is add type casting to each of the "querySelector()" statements.
// In this exercise, I think that makes more sense, because the default type
// of a "querySelector()" result is "Element | null", and the "Element" type
// does not have a lot of the properties and methods that are found on HTML
// elements. In this example, the "Element" type does not have the "value"
// property that is found on input elements, so it was necessary to cast the
// input variable at the top of the file as am HTMLInputElement so that
// Typescript knew the element has the "value" property.
// If I was doing this in vanilla Javascript and was worried about the
// possibility of a null result from "querySelector()", I probably would have
// used optional chaining for the form and list queries, but I wanted to keep
// my "querySelector()" calls uniform, so I opted to cast all of them.
