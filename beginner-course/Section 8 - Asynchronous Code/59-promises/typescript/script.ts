/**
 * Activity 1: Create a promise-based version of addEventListener.
 * --------- NOTE: This only works once, but Kyle did not
 * --------------- show how to make it work every time an
 * --------------- event fires like addEventListener does.
 */
const button = document.querySelector("button") as HTMLButtonElement

// NOTE: If I was implementing this in a real world scenario, I would
// union all of the values that are accepted as event types by addEventListener
// rather than just listing "click". I would have done so here, but I couldn't
// quickly find a list of all the event types, as accepted by addEventListener
// (MDN had some references that linked to each other, but the lists given only
// had the interface names rather than the name used in addEventListener), so I
// set up the type, but I only populated it with the type I needed for this
// exercise.
type EventType = "click"
function addEventListenerPromise(element: HTMLElement, eventType: EventType) {
	return new Promise<Event>((resolve: (e: Event) => void, _) => {
		element.addEventListener(eventType, resolve)
	})
}

const promise = addEventListenerPromise(button, "click")
promise.then(e => {
	console.log("clicked")
	console.log(e)
})
