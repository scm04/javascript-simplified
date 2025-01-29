import { getItem, Item } from "./items.ts"
import formatCurrency from "./utilities.ts"

// Persist using Session Storage or Local Storage
// 1. Whenever the cart is updated, save it to storage.
// 2. Whenever the cart details are toggled, update the state in storage.
// 3. Whenever the compact view is toggled, update the state in storage.
// 4. Whenever the cart is rendered, load the above items from storage and apply them as appropriate in the rendering process.
const STORAGE_KEY_CART = "ShoppingCart"
const STORAGE_KEY_CART_DETAILS = `${STORAGE_KEY_CART}HideDetails`
const STORAGE_KEY_COMPACT_VIEW = `${STORAGE_KEY_CART}UseCompactView`
const EMPTY_CART_JSON = "[]"
function saveCart() {
	localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(Array.from(cart)))
}
function loadCart() {
	const cartString = localStorage.getItem(STORAGE_KEY_CART)
	return new Map<CartItemID, CartItemQuantity>(
		JSON.parse(cartString ?? EMPTY_CART_JSON)
	)
}

type CartItemID = number
type CartItemQuantity = number
let cart: Map<CartItemID, CartItemQuantity> = new Map([
	[1, 2],
	[3, 1],
	[7, 100]
])

export function addToCart(id: number, quantity: number = 1) {
	let previousQuantity = cart.get(id) ?? 0
	cart.set(id, previousQuantity + quantity)
	renderCart()
}

function removeFromCart(id: number) {
	cart.delete(id)
	renderCart()
}

// Cart Button:
// (DONE) 1. When clicked, toggle whether the cart contents are visible.
// (DONE) 2. When empty, hide the number bubble, disable the button, and change the SVG color to gray.
const cartElement = document.querySelector("[data-cart]") as HTMLElement
const cartToggleButton = cartElement.querySelector(
	"[data-cart-toggle-button]"
) as HTMLButtonElement
const cartDetails = cartElement.querySelector("[data-cart-details]") as HTMLDivElement
let cartDetailsHidden = false
cartToggleButton.addEventListener("click", () => {
	cartDetailsHidden = !cartDetailsHidden
	renderCart()
})

// Cart Details
// (DONE) 1. When the cart is rendered, update the number of items on the icon.
// (DONE) 2. If the cart details are shown, rerender the items that are in the cart and update the total price whenever the cart is rendered.
// (DONE) BONUS: Add a button to clear all contents from the cart.
// (DONE) BONUS: Add a "compact" view to the cart that makes each cart item into one row. Add a toggle at the top to turn the "compact" view on and off.
const cartTotalItems = cartToggleButton.querySelector(
	"[data-total-cart-items]"
) as HTMLDivElement
const cartItemList = cartDetails.querySelector("[data-cart-item-list]") as HTMLDivElement
const cartTotalPrice = cartDetails.querySelector(
	"[data-cart-total-price]"
) as HTMLSpanElement
// Compact view
let useCompactView = false
const compactViewButton = cartDetails.querySelector(
	"[data-compact-view-button]"
) as HTMLButtonElement
const compactViewOffSVG = compactViewButton.querySelector(
	"[data-compact-view-off]"
) as SVGElement
const compactViewOnSVG = compactViewButton.querySelector(
	"[data-compact-view-on]"
) as SVGElement
compactViewButton.addEventListener("click", () => {
	useCompactView = !useCompactView
	renderCart()
})
// Clear cart
const clearCartButton = cartDetails.querySelector(
	"[data-clear-cart-button]"
) as HTMLButtonElement
clearCartButton.addEventListener("click", () => {
	cart.clear()
	renderCart()
})
// Render cart
function renderCart() {
	if (cart.size === 0) return disableCart()

	enableCart()
	let [totalPrice, totalItems] = populateCart()
	cartTotalItems.textContent = String(totalItems)
	if (!cartDetailsHidden) {
		cartTotalPrice.textContent = formatCurrency(totalPrice / 100)
	}
}
function disableCart() {
	cartDetails.classList.add("invisible")
	cartTotalItems.classList.add("invisible")
	cartToggleButton.disabled = true
}
function enableCart() {
	cartItemList.innerHTML = ""
	cartDetails.classList.toggle("invisible", cartDetailsHidden)
	cartTotalItems.classList.remove("invisible")
	compactViewOnSVG.classList.toggle("hidden", !useCompactView)
	compactViewOffSVG.classList.toggle("hidden", useCompactView)
	cartToggleButton.disabled = false
}
function populateCart() {
	let totalPrice = 0
	let totalItems = 0
	for (let [id, quantity] of cart) {
		const item = getItem(id)
		if (item === null) continue

		totalPrice += quantity * item.priceCents
		totalItems += quantity
		if (!cartDetailsHidden) {
			cartItemList.appendChild(renderCartItem(item, quantity))
		}
	}
	return [totalPrice, totalItems]
}

// Cart Item:
// Structure: { id: number, quantity: number }
// "id" will be used to look up the item in items.ts and the resulting item will be used to populate the HTML.
// When rendered:
// (DONE) 1. Set the image color.
// (DONE) 2. Add an event listener to the "x" button that removes the item from the cart.
// (DONE) 3. Set the item's name.
// (DONE) 4. Set the item's quantity. If the quantity is one, hide the quantity span.
// (DONE) 5. Set the price.
// TODO: Once I'm done implementing everything, the cart contents should be hidden by default.
const fullCartItemTemplate = cartElement.querySelector(
	"[data-full-cart-item-template]"
) as HTMLTemplateElement
const compactCartItemTemplate = cartElement.querySelector(
	"[data-compact-cart-item-template]"
) as HTMLTemplateElement
function renderCartItem(item: Item, quantity: CartItemQuantity) {
	// once the compact item template is complete, this should decide which template to use based on useCompactView
	const cartItemElement = (
		useCompactView ? compactCartItemTemplate : fullCartItemTemplate
	).content.cloneNode(true) as HTMLDivElement

	const image = cartItemElement.querySelector(
		"[data-cart-item-image]"
	) as HTMLImageElement
	image.src = `https://dummyimage.com/210x130/${item.imageColor}/${item.imageColor}`

	const removeFromCartButton = cartItemElement.querySelector(
		"[data-remove-from-cart-button]"
	) as HTMLButtonElement
	removeFromCartButton.addEventListener("click", () => {
		removeFromCart(item.id)
	})

	const name = cartItemElement.querySelector(
		"[data-cart-item-name]"
	) as HTMLHeadingElement
	name.textContent = item.name

	const quantityElement = cartItemElement.querySelector(
		"[data-cart-item-quantity]"
	) as HTMLSpanElement
	quantityElement.textContent = `x${quantity}`
	if (quantity === 1) quantityElement.classList.add("invisible")

	const price = cartItemElement.querySelector(
		"[data-cart-item-price]"
	) as HTMLDivElement
	price.textContent = formatCurrency((item.priceCents * quantity) / 100)

	return cartItemElement
}

// Render the cart when the page is loaded.
renderCart()
