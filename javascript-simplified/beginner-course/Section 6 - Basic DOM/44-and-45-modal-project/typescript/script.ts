/*
 * DONE: 2. Select the elements with the following IDs:
 * --- modal
 * --- open-modal-btn
 * --- close-modal-btn
 * --- BONUS: overlay
 */
const modal = document.querySelector("#modal") as HTMLDivElement
const openModalBtn = document.querySelector("#open-modal-btn") as HTMLButtonElement
const closeModalBtn = document.querySelector("#close-modal-btn") as HTMLButtonElement
const overlay = document.querySelector("#overlay") as HTMLDivElement

/*
 * DONE: 3. Create a click even listener for the open-modal-btn that adds the class
 * --- "open" to the modal.
 * BONUS: Also add the class "open" to the overlay.
 */
openModalBtn.addEventListener("click", () => {
	modal.classList.add("open")
	overlay.classList.add("open")
})

/*
 * DONE: 4. Create a click event listener for the close-modal-btn that removes the class
 * --- "open" from the modal.
 * BONUS: Also remove the class "open" from the overlay.
 */
closeModalBtn.addEventListener("click", closeModal)

/*
 * BONUS: Add a click event listener to the overlay that removes the class "open" from
 * --- the modal and the overlay.
 */
overlay.addEventListener("click", closeModal)

/**
 * A small helper to remove the "open" class from the modal and the overlay.
 * Helps apply the DRY principle in this file.
 */
function closeModal() {
	modal.classList.remove("open")
	overlay.classList.remove("open")
}
