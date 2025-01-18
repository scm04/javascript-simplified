// Cart Button:
// 1. When clicked, toggle whether the cart contents are visible.
// 2. When empty, make the cart button invisible. (This is what Kyle did. I think it would make more sense to hide the number bubble and make the button either grayscale or black and white to indicate that it's empty rather than hiding it outright, because hiding it kind of suggests that there is no cart functionality.)
// TODO: Decide if I want to add an "empty" state to the cart contents or if I want to just disable the cart button when there is nothing in the cart.
// TODO: Decide if the open/closed state of the cart should be persisted. If I decide to persist it, then if the cart contents are visible, they should remain visible when the page is changed until the user hides them.

// Cart Item:
// Structure: { id: number, quantity: number }
// "id" will be used to look up the item in items.json and the resulting item will be used to populate the HTML.
// TODO: Decide if I want to change items.json into items.ts in order to add functions that more fully simulate integrating with a database.
// 1. When the "x" button is clicked, remove the item from the cart.
// BONUS: Add a way to increment and decrement the amount directly from the cart.
// BONUS: Add a button to clear all contents from the cart.
// BONUS: Add a "compact" view to the cart that makes each cart item into one row. In this view, clicking on an item will expand the row to show the quantity adjustment controls. Clicking the item again collapses the row and hides the quantity controls. Clicking another item also collapses the row and hides the quantity controls (only one row can be expanded at a time). Add a toggle at the top to turn the "compact" view on and off.

// The cart should persist between pages by using Local Storage. Anytime the cart is updated (whether from the cart itself, or from the store page), Local Storage should be updated.
