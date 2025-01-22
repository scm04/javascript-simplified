import { Item } from "./items.ts"

// Cart Button:
// 1. When clicked, toggle whether the cart contents are visible.
// 2. When empty, hide the number bubble, disable the button, and change the SVG color to gray. // NOTE: I am having a very difficult time doing this with tailwind. Their disabled utility classes don't seem to work unless the element is in a form, which my button is not. I could potentially define my own classes that do the same thing, but I'm not sure I want to put in the effort. I'll think it over, but I may end up just hiding the cart entirely when it's empty, like Kyle did.
// 3. Persist the cart state between pages. This means if the cart is open on one page, it should be open when visiting another page.
const cart = document.querySelector("[data-cart]") as HTMLElement
const cartToggleButton = cart.querySelector(
	"[data-cart-toggle-button]"
) as HTMLButtonElement
const cartDetails = cart.querySelector("[data-cart-details]") as HTMLDivElement
// cartToggleButton.disabled = true
cartToggleButton.addEventListener("click", e => {
	cartDetails.classList.toggle("invisible")
})

// Cart Item:
// Structure: { id: number, quantity: number }
// "id" will be used to look up the item in items.json and the resulting item will be used to populate the HTML.
// 1. When the "x" button is clicked, remove the item from the cart.
// BONUS: Add a way to increment and decrement the amount directly from the cart.
// BONUS: Add a button to clear all contents from the cart.
// BONUS: Add a "compact" view to the cart that makes each cart item into one row. In this view, clicking on an item will expand the row to show the quantity adjustment controls. Clicking the item again collapses the row and hides the quantity controls. Clicking another item also collapses the row and hides the quantity controls (only one row can be expanded at a time). Add a toggle at the top to turn the "compact" view on and off.
const cartItemList = cart.querySelector("[data-cart-item-list]") as HTMLDivElement

// The cart should persist between pages by using Local Storage. Anytime the cart is updated (whether from the cart itself, or from the store page), Local Storage should be updated.

export function addToCart(item: Item, quantity: number = 1) {
	console.log(item.name, quantity)
}
