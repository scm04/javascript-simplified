import items from "./items.json"
import addGlobalEventListener from "./util/addGlobalEventListener.js"
import formatCurrency from "./util/formatCurrency.js"

// HTML Element references
const cartButton = document.querySelector("[data-cart-button]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]")
const cartItemTemplate = document.querySelector("#cart-item-template")
const cartItemsContainer = document.querySelector("[data-cart-items]")
const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartTotal = document.querySelector("[data-cart-total]")
const cart = document.querySelector("[data-cart]")

// Constants
const IMAGE_URL = "https://dummyimage.com/210x130"
const SESSION_STORAGE_KEY = "SHOPPING_CART-cart"

// Other global variables
let shoppingCart = []

export function setupShoppingCart() {
	addGlobalEventListener("click", "[data-remove-from-cart-button]", e => {
		const id = e.target.closest("[data-item]").dataset.itemId
		removeFromCart(parseInt(id))
	})
	cartButton.addEventListener("click", () =>
		cartItemsWrapper.classList.toggle("invisible")
	)
	shoppingCart = loadCart()
	renderCart()
}

function saveCart() {
	sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
	return JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) || []
}

export function addToCart(id) {
	const existingItem = shoppingCart.find(entry => entry.id === id)
	if (existingItem) {
		existingItem.quantity++
	} else {
		shoppingCart.push({ id, quantity: 1 })
	}
	renderCart()
	saveCart()
}

function removeFromCart(id) {
	const existingItem = shoppingCart.find(entry => entry.id === id)
	if (existingItem == null) return

	shoppingCart = shoppingCart.filter(entry => entry.id !== id)
	renderCart()
	saveCart()
}

function renderCart() {
	if (shoppingCart.length === 0) {
		hideCart()
	} else {
		showCart()
		renderCartItems()
	}
}

function hideCart() {
	cart.classList.add("invisible")
	cartItemsWrapper.classList.add("invisible")
}

function showCart() {
	cart.classList.remove("invisible")
}

function renderCartItems() {
	cartQuantity.innerText = shoppingCart.length

	const totalCents = shoppingCart.reduce((sum, entry) => {
		const item = items.find(i => entry.id === i.id)
		return sum + item.priceCents * entry.quantity
	}, 0)
	cartTotal.innerText = formatCurrency(totalCents / 100)

	cartItemsContainer.innerHTML = ""
	shoppingCart.forEach(entry => {
		const item = items.find(i => entry.id === i.id)
		const cartItem = cartItemTemplate.content.cloneNode(true)

		const container = cartItem.querySelector("[data-item]")
		container.dataset.itemId = item.id

		const name = cartItem.querySelector("[data-name]")
		name.innerText = item.name

		const image = cartItem.querySelector("[data-image]")
		image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

		if (entry.quantity > 1) {
			const quantity = cartItem.querySelector("[data-quantity]")
			quantity.innerText = `x${entry.quantity}`
		}

		const price = cartItem.querySelector("[data-price]")
		price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100)

		cartItemsContainer.appendChild(cartItem)
	})
}
