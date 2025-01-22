import { addToCart } from "./cart.ts"
import { getItems, Item } from "./items.ts"
import formatCurrency from "./utilities.ts"

// 1 (DONE). Populate the items on the page dynamically. Make the "Add to Cart" button functional when creating each item.
// BONUS (DONE): In the item layout, add a way to change the quantity before adding it to the cart and adjust the "Add to Cart" button to take into account the set quantity. The quantity should default to 1 to keep the same behavior as the "before" implementation.
const storeItemTemplate = document.querySelector(
	"[data-store-item]"
) as HTMLTemplateElement

function generateItemHTML(item: Item) {
	const itemHTML = storeItemTemplate.content.cloneNode(true) as HTMLDivElement

	const image = itemHTML.querySelector("[data-image]") as HTMLImageElement
	image.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`

	const category = itemHTML.querySelector("[data-category]") as HTMLHeadingElement
	category.textContent = item.category

	const name = itemHTML.querySelector("[data-name]") as HTMLHeadingElement
	name.textContent = item.name

	const price = itemHTML.querySelector("[data-price]") as HTMLParagraphElement
	price.textContent = formatCurrency(item.priceCents / 100)

	const reduceQuantityButton = itemHTML.querySelector(
		"[data-reduce-quantity-button]"
	) as HTMLButtonElement
	const increaseQuantityButton = itemHTML.querySelector(
		"[data-increase-quantity-button]"
	) as HTMLButtonElement
	const quantityInput = itemHTML.querySelector(
		"[data-quantity-input]"
	) as HTMLInputElement
	reduceQuantityButton.addEventListener("click", () => {
		if (quantityInput.valueAsNumber < 2) return
		quantityInput.valueAsNumber--
	})
	increaseQuantityButton.addEventListener("click", () => {
		// limit the quantity to 100; to change the limit, just change 99 to another number
		// in a real-world setting, this could be set up to use the number of items that are in stock
		// or a static value that is attached to the item somewhere in the database
		if (quantityInput.valueAsNumber > 99) return
		quantityInput.valueAsNumber++
	})

	const addToCartButton = itemHTML.querySelector(
		"[data-add-to-cart-button]"
	) as HTMLButtonElement
	addToCartButton.addEventListener("click", () => {
		addToCart(item, quantityInput.valueAsNumber)
	})

	return itemHTML
}

const itemList = document.querySelector("[data-item-list]") as HTMLDivElement
const items = getItems()
for (let item of items) {
	itemList.appendChild(generateItemHTML(item))
}
