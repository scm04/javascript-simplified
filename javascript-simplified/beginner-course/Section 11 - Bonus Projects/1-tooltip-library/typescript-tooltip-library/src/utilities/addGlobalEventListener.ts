export default function addGlobalEventListener(
	type: string,
	selector: string,
	callback: (e: Event) => void
) {
	document.addEventListener(type, e => {
		if (e.target === null) return // Skip this event if it is synthetic (events created in JavaScript may not have a target)
		if ((e.target as HTMLElement).matches(selector)) callback(e)
	})
}
