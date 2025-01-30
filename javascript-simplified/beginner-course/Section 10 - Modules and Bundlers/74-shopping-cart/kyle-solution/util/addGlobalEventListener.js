export default function addGlobalEventListener(type, selector, callback) {
	document.addEventListener(type, e => {
		if (!e.target.matches(selector)) return
		callback(e)
	})
}
