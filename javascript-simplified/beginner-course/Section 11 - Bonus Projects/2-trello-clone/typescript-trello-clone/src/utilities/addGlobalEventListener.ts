export default function addGlobalEventListener(
	type: string,
	selector: string,
	callback: (e: Event) => void
) {
	document.addEventListener(type, e => {
		if (e.target === null) return // synthetic events (events created by javascript) may not have a target
		if ((e.target as HTMLElement).matches(selector)) callback(e)
	})
}
