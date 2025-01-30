/**
 * DONE: 2. Select all elements needed (Use the HTML to figure out what classes/IDs
 * will work best for selecting each element.)
 * --------- Error container (class = "errors")
 * --------- Error list (class = "errors-list")
 * --------- Username input (id = "username")
 * --------- Password input (id = "password")
 * --------- Password Confirmation input (id = "password-confirmation")
 * --------- Terms checkbox (id = "terms")
 * --------- Form (id = "form")
 */
const errors = document.querySelector(".errors") as HTMLDivElement
const errorList = document.querySelector(".errors-list") as HTMLUListElement
const usernameInput = document.querySelector("#username") as HTMLInputElement
const passwordInput = document.querySelector("#password") as HTMLInputElement
const passwordConfirmationInput = document.querySelector(
	"#password-confirmation"
) as HTMLInputElement
const termsCheckbox = document.querySelector("#terms") as HTMLInputElement
const form = document.querySelector("#form") as HTMLFormElement

/**
 * DONE: 3. Create an event listener for when the form is submitted and do the
 * following inside of it:
 * --------- 1. Clear any old error messages.
 * --------- 2. Create error messages as needed for the following validations:
 * --------------- 1. Username is at least 6 characters long.
 * --------------- 2. Password is at least 10 characters long.
 * --------------- 3. Password and confirmation password match.
 * --------------- 4. Terms checkbox is checked.
 * --------- 3. If there are any errors, prevent the form from submitting and
 * --------------- show the error messages.
 */
form.addEventListener("submit", e => {
	// Step 3.1
	clearErrors()

	// Step 3.2
	const errorMessages: string[] = []
	// validate username
	if (usernameInput.value.length < 6) {
		errorMessages.push("Username must be at least 6 characters.")
	}
	// validate password and confirmation password
	if (passwordInput.value.length < 10) {
		errorMessages.push("Password must be at least 10 characters.")
	} else if (passwordInput.value !== passwordConfirmationInput.value) {
		errorMessages.push("Passwords must match.")
	}
	// validate that terms were accepted
	if (!termsCheckbox.checked) {
		errorMessages.push("You must accept the terms.")
	}

	// Step 3.3
	if (errorMessages.length === 0) return
	e.preventDefault()
	showErrors(errorMessages)
})

/**
 * DONE: 4. Define the clearErrors function with the following logic:
 * --------- 1. Remove all children from the error-list element.
 * --------------- NOTE: This can't be done with a forEach loop or a normal for
 * --------------------- loop since that would modify the list as it is being
 * --------------------- looped over, which is an error.
 * --------------- HINT: Use a while loop for this part of the task.
 * --------------- NOTE: Setting innerHTML to an empty string will work, but the
 * --------------------- point of this step is to practice while loops, so it
 * --------------------- should be attempted with a while loop first.
 * --------- 2. Remove the "show" class from the errors container.
 */
function clearErrors() {
	// Step 4.1
	while (errorList.children.length > 0) {
		// Note that the optional chaining is necessary here because for some
		// reason, Typescript cannot infer from the loop condition I am using
		// that the firstElementChild property will never be null in the loop body.
		// (I am assuming here that the firstElementChild property points to
		// children[0], which may not be true.)
		// This could also be solved by changing the condition to check whether
		// the firstElementChild property is null, but I like the idea of explicitly
		// checking how many element children are left, and since both solutions are
		// rooted in Javascript, not Typescript, I opted for the solution that
		// changes the least from my original solution.
		errorList.firstElementChild?.remove()
	}

	// Step 4.2
	errors.classList.remove("show")
}

/**
 * DONE: 5. Define the showErrors function with the following logic:
 * --------- 1. Add each error to the error-list element.
 * --------------- HINT: Make sure to use an li as the element for each error.
 * --------- 2. Add the "show" class to the errors container.
 */
function showErrors(errorMessages: string[]) {
	// Step 5.1
	for (let message of errorMessages) {
		const li = document.createElement("li")
		li.innerText = message
		errorList.appendChild(li)
	}

	// Step 5.2
	errors.classList.add("show")
}
