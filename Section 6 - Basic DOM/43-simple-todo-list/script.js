// 1. Select all elements
const form = document.querySelector("#new-item-form")
const list = document.querySelector("#list")
const input = document.querySelector("#item-input")

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
