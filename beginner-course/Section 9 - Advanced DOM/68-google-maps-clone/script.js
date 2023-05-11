// NOTE: This project is non-functional because it does not have access to my API token.
// This is to prevent my token from being abused since I am planning to leave this
// repository publicly accessible so that it can be viewed as part of my portfolio.
// To make this work, just replace the placeholder string below with a mapbox API token.
const MAPBOX_ACCESS_TOKEN = "<mapbox token here>"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true
})

function setupMap(centerPosition) {
	const map = new mapboxgl.Map({
		accessToken: MAPBOX_ACCESS_TOKEN,
		container: "map",
		style: "mapbox://styles/mapbox/streets-v11",
		center: centerPosition,
		zoom: 15
	})

	const navigationControls = new mapboxgl.NavigationControl()
	map.addControl(navigationControls)

	const directionControls = new MapboxDirections({
		accessToken: MAPBOX_ACCESS_TOKEN
	})
	map.addControl(directionControls, "top-left")
}

function successLocation(position) {
	setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
	setupMap([-2.24, 53.48])
}
