/**
 * Activity 1: Create a promise-based version of addEventListener.
 * --------- NOTE: This only works once, but Kyle did not
 * --------------- show how to make it work every time an
 * --------------- event fires like addEventListener does.
 */
const button = document.querySelector("button")

function addEventListenerPromise(element, eventType) {
	return new Promise((resolve, reject) => {
		element.addEventListener(eventType, resolve)
	})
}

const promise = addEventListenerPromise(button, "click")
promise.then(e => {
	console.log("clicked")
	console.log(e)
})
