import items from "./items.js"

// HTML Elements
const itemsWrapper = document.querySelector("[data-items-wrapper]")
const itemTemplate = document.querySelector("[data-item-template]")
const cartSection = document.querySelector("[data-cart]")
const cartItemTemplate = document.querySelector("[data-cart-item-template]")
const cartItemsList = document.querySelector("[data-cart-items-list]")
const cartTotalPrice = document.querySelector("[data-cart-total-price]")
const itemsInCartBadge = document.querySelector("[data-items-in-cart-badge]")
const cartToggle = document.querySelector("[data-cart-toggle]")
const cartDisplay = document.querySelector("[data-cart-display]")

// Constants
const LOCAL_STORAGE_PREFIX = "SHOPPING_CART"
const CART_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-cart`
const CART_DISPLAYED_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-cartDisplayed`

// Other variables
let cart = loadCart()
let cartDisplayed = getCartDisplayed()

/*
 * Populate the store items dynamically from items.json.
 */
if (itemsWrapper != null && itemTemplate != null) {
	itemsWrapper.innerHTML = ""
	for (let item of items) {
		// Clone the template.
		const itemElement = itemTemplate.content.cloneNode(true)

		// Store the item Id in the data-item attribute on the item div.
		// const itemDiv = itemElement.querySelector("[data-item]")
		// itemDiv.dataset.item = item.id

		// Set the image src URL.
		const image = itemElement.querySelector("[data-item-image]")
		image.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`

		// Set the item's category, name, and price.
		const category = itemElement.querySelector("[data-item-category]")
		category.innerText = item.category

		const name = itemElement.querySelector("[data-item-name]")
		name.innerText = item.name

		const price = itemElement.querySelector("[data-item-price]")
		price.innerText = `$${formatMoney(item.priceCents)}`

		// Set up the click listener on the "Add To Cart" button
		const button = itemElement.querySelector("[data-add-to-cart-btn]")
		button.addEventListener("click", () => addItemToCart(item.id))

		// Add the item to the wrapper.
		itemsWrapper.appendChild(itemElement)
	}
}

/*
 * Give the following functionality to the cart:
 * --- Invisible when empty.
 * --- Visible when at least one item is in it.
 * --- Can be clicked to toggle full display when visible.
 * --- Full display shows:
 * 		1. Each item in the cart with:
 * 			a. The item's image.
 * 			b. The item's name and quantity.
 * 			c. The item's total price (price * quantity).
 * 		2. The total price of all items.
 */
cartToggle.addEventListener("click", toggleCartDisplay)

function toggleCartDisplay() {
	cartDisplayed = !cartDisplayed
	saveCartDisplayed()
	cartDisplay.classList.toggle("invisible", !cartDisplayed)
}

function toggleCartVisibility() {
	cartSection.classList.toggle("invisible", cart.length === 0)
}

function addItemToCart(itemId) {
	const item = items.find(i => i.id === itemId)
	if (item == null) return

	const cartItem = cart.find(i => i.id === itemId) || {
		id: itemId,
		name: item.name,
		color: item.imageColor,
		quantity: 0,
		price: 0
	}
	cartItem.quantity++
	cartItem.price += item.priceCents

	cart = cart.filter(i => i.id !== itemId)
	cart.push(cartItem)

	updateCartItemsList()
}

function removeItemFromCart(itemId) {
	const cartItem = cart.find(i => i.id === itemId)
	if (cartItem === null) return

	cartItem.quantity--
	if (cartItem.quantity === 0) cart = cart.filter(i => i.id !== itemId)
	updateCartItemsList()
}

function updateCartItemsList() {
	saveCart()
	toggleCartVisibility()

	const totalPrice = cart.reduce((sum, item) => {
		return sum + item.price
	}, 0)
	cartTotalPrice.innerText = `$${formatMoney(totalPrice)}`

	itemsInCartBadge.innerText = cart.length

	cartItemsList.innerHTML = ""
	for (let cartItem of cart) {
		renderCartItem(cartItem)
	}
}

function renderCartItem(cartItem) {
	// Clone the template
	const cartItemElement = cartItemTemplate.content.cloneNode(true)

	// Set the image src URL.
	const image = cartItemElement.querySelector("[data-cart-item-image]")
	image.src = `https://dummyimage.com/210x130/${cartItem.color}/${cartItem.color}`

	// Set the item's name, quantity (if > 1), and price.
	const name = cartItemElement.querySelector("[data-cart-item-name]")
	name.innerText = cartItem.name

	if (cartItem.quantity > 1) {
		const quantityElement = document.createElement("span")
		quantityElement.classList.add("text-gray-600", "text-sm", "font-bold", "ml-1")
		quantityElement.innerText = `x${cartItem.quantity}`
		name.insertAdjacentElement("afterend", quantityElement)
	}

	const price = cartItemElement.querySelector("[data-cart-item-price]")
	price.innerText = `$${formatMoney(cartItem.price)}`

	// Set up the click listener on the remove from cart button
	const button = cartItemElement.querySelector("[data-remove-from-cart-button]")
	button.addEventListener("click", () => removeItemFromCart(cartItem.id))

	// Add the item to the wrapper.
	cartItemsList.appendChild(cartItemElement)
}

/*
 * Make the cart data persistent across pages using Local Storage.
 */
function saveCart() {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

function loadCart() {
	return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []
}

function saveCartDisplayed() {
	localStorage.setItem(CART_DISPLAYED_STORAGE_KEY, JSON.stringify(cartDisplayed))
}

function getCartDisplayed() {
	return JSON.parse(localStorage.getItem(CART_DISPLAYED_STORAGE_KEY)) || false
}

// Helpers
/**
 * Given a money amount as a number of pennies, convert to dollars and
 * format as a string with two decimal places visible.
 * @param {number} money The money amount (in pennies) to format.
 * @returns The formatted amount as a string displaying two decimal places.
 */
function formatMoney(money) {
	return (money / 100).toFixed(2)
}

updateCartItemsList()
// Messy way to initialize the cart's visibility based on its last state.
// Couldn't think of a better way to do this.
cartDisplayed = !cartDisplayed
toggleCartDisplay()
