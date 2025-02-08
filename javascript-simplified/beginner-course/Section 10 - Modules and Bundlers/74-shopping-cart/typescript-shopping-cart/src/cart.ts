import { getItem, Item } from "./items.ts"
import formatCurrency from "./utilities.ts"

// Persist using Local Storage
// (DONE) 1. Whenever the cart is updated, save it to storage.
// (DONE) 2. Whenever the cart contents are toggled, update the state in storage.
// (DONE) 3. Whenever the compact view is toggled, update the state in storage.
// (DONE) 4. Whenever the cart is rendered, load the above items from storage and apply them as appropriate in the rendering process.
const STORAGE_KEY_CART = "ShoppingCart"
const STORAGE_KEY_CART_CONTENTS = `${STORAGE_KEY_CART}HideContents`
const STORAGE_KEY_COMPACT_VIEW = `${STORAGE_KEY_CART}UseCompactView`
const DEFAULT_CART_STRING = "[]"
const DEFAULT_HIDE_CONTENTS = "true"
const DEFAULT_USE_COMPACT_VIEW = "false"

type CartItemID = number
type CartItemQuantity = number
function saveCart(cart: Map<CartItemID, CartItemQuantity>) {
	localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(Array.from(cart)))
}
function loadCart() {
	const cartString = localStorage.getItem(STORAGE_KEY_CART)
	return new Map<CartItemID, CartItemQuantity>(
		JSON.parse(cartString ?? DEFAULT_CART_STRING)
	)
}

export function addToCart(id: number, quantity: number = 1) {
	let cart = loadCart()
	cart.set(id, (cart.get(id) ?? 0) + quantity)
	saveCart(cart)
	renderCart()
}
function removeFromCart(id: number) {
	let cart = loadCart()
	cart.delete(id)
	saveCart(cart)
	renderCart()
}

// Cart Button:
// (DONE) 1. When clicked, toggle whether the cart contents are visible.
// (DONE) 2. When empty, hide the number bubble, disable the button, and change the SVG color to gray.
const cartElement = document.querySelector("[data-cart]") as HTMLElement
const cartToggleButton = cartElement.querySelector(
	"[data-cart-toggle-button]"
) as HTMLButtonElement
function toggleHideCartContents() {
	localStorage.setItem(STORAGE_KEY_CART_CONTENTS, String(!hideCartContents()))
}
function hideCartContents() {
	return JSON.parse(
		localStorage.getItem(STORAGE_KEY_CART_CONTENTS) ?? DEFAULT_HIDE_CONTENTS
	) as boolean
}
cartToggleButton.addEventListener("click", () => {
	toggleHideCartContents()
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
const cartContents = cartElement.querySelector("[data-cart-contents]") as HTMLDivElement
const cartItemList = cartContents.querySelector("[data-cart-item-list]") as HTMLDivElement
const cartTotalPrice = cartContents.querySelector(
	"[data-cart-total-price]"
) as HTMLSpanElement
// Compact view
function toggleCompactView() {
	localStorage.setItem(STORAGE_KEY_COMPACT_VIEW, String(!useCompactView()))
}
function useCompactView() {
	return JSON.parse(
		localStorage.getItem(STORAGE_KEY_COMPACT_VIEW) ?? DEFAULT_USE_COMPACT_VIEW
	) as boolean
}
const compactViewButton = cartContents.querySelector(
	"[data-compact-view-button]"
) as HTMLButtonElement
const compactViewOffSVG = compactViewButton.querySelector(
	"[data-compact-view-off]"
) as SVGElement
const compactViewOnSVG = compactViewButton.querySelector(
	"[data-compact-view-on]"
) as SVGElement
compactViewButton.addEventListener("click", () => {
	toggleCompactView()
	renderCart()
})
// Clear cart
const clearCartButton = cartContents.querySelector(
	"[data-clear-cart-button]"
) as HTMLButtonElement
clearCartButton.addEventListener("click", () => {
	saveCart(new Map<CartItemID, CartItemQuantity>())
	renderCart()
})
// Render cart
function renderCart() {
	const cart = loadCart()
	if (cart.size === 0) return disableCart()

	const hideContents = hideCartContents()
	const useCompact = useCompactView()
	enableCart(hideContents, useCompact)
	const [totalPrice, totalItems] = populateCart(cart, hideContents, useCompact)
	cartTotalItems.textContent = String(totalItems)
	if (!hideContents) {
		cartTotalPrice.textContent = formatCurrency(totalPrice / 100)
	}
}
function disableCart() {
	cartContents.classList.add("invisible")
	cartTotalItems.classList.add("invisible")
	cartToggleButton.disabled = true
}
function enableCart(hideContents: boolean, useCompactView: boolean) {
	cartItemList.innerHTML = ""
	cartContents.classList.toggle("invisible", hideContents)
	cartTotalItems.classList.remove("invisible")
	compactViewOnSVG.classList.toggle("hidden", !useCompactView)
	compactViewOffSVG.classList.toggle("hidden", useCompactView)
	cartToggleButton.disabled = false
}
function populateCart(
	cart: Map<CartItemID, CartItemQuantity>,
	hideContents: boolean,
	useCompactView: boolean
) {
	let totalPrice = 0
	let totalItems = 0
	for (let [id, quantity] of cart) {
		const item = getItem(id)
		if (item === null) continue

		totalPrice += quantity * item.priceCents
		totalItems += quantity
		if (!hideContents) {
			cartItemList.appendChild(renderCartItem(item, quantity, useCompactView))
		}
	}
	return [totalPrice, totalItems]
}

// Cart Item:
// Structure: { id: number, quantity: number }
// "id" will be used to look up the item in items.ts and the resulting item will be used to populate the HTML.
// When rendered:
// (DONE) 1. Set the image color.
// (DONE) 2. Add an event listener to the button that removes the item from the cart.
// (DONE) 3. Set the item's name.
// (DONE) 4. Set the item's quantity. If the quantity is one, hide the quantity.
// (DONE) 5. Set the price.
const fullCartItemTemplate = cartElement.querySelector(
	"[data-full-cart-item-template]"
) as HTMLTemplateElement
const compactCartItemTemplate = cartElement.querySelector(
	"[data-compact-cart-item-template]"
) as HTMLTemplateElement
function renderCartItem(item: Item, quantity: CartItemQuantity, useCompactView: boolean) {
	// once the compact item template is complete, this should decide which template to use based on useCompactView
	const fragment = (
		useCompactView ? compactCartItemTemplate : fullCartItemTemplate
	).content.cloneNode(true) as DocumentFragment
	const cartItemElement = fragment.children[0] as HTMLDivElement

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
