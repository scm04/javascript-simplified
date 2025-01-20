import { addToCart } from "./cart.ts"
import { getItems, Item } from "./items.ts"
import formatCurrency from "./utilities.ts"

// 1. Populate the items on the page dynamically. Make the "Add to Cart" button functional when creating each item.
// BONUS: In the item layout, add a way to change the quantity before adding it to the cart and adjust the "Add to Cart" button to take into account the set quantity. The quantity should default to 1 to keep the same behavior as the "before" implementation.
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

	const addToCartButton = itemHTML.querySelector(
		"[data-add-to-cart-button]"
	) as HTMLButtonElement
	addToCartButton.addEventListener("click", () => {
		addToCart(item)
	})

	return itemHTML
}

const itemList = document.querySelector("[data-item-list]") as HTMLDivElement
const items = getItems()
for (let item of items) {
	itemList.appendChild(generateItemHTML(item))
}
