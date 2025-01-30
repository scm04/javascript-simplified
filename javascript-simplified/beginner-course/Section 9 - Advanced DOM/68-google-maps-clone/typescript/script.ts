// NOTE: This project is non-functional because it does not have access to my API token.
// This is to prevent my token from being abused since I am planning to leave this
// repository publicly accessible so that it can be viewed as part of my portfolio.
// To make this work, just replace the placeholder string below with a mapbox API token.
const MAPBOX_ACCESS_TOKEN = "<mapbox token here>"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true
})

function successLocation(position: GeolocationPosition) {
	setupMap([position.coords.longitude, position.coords.latitude] as LngLat)
}

function errorLocation() {
	setupMap([-2.24, 53.48] as LngLat)
}

// The following statements allow my project to work without any errors.
// I tried very hard to create a project that would allow me to do everything
// with Node modules so that my module could actually know what types the mapboxgl
// and MapboxDirections modules contained, but unfortunately, the MapboxDirections
// package does has some issues that make it impossible for me to do the project in
// Typescript (some of the errors it causes are beyond my ability to fix),
// so for the sake of moving forward with my learning, I decided to do it this way
// and move on.
declare const mapboxgl: any
declare const MapboxDirections: any

type LngLat = [number, number]
function setupMap(centerPosition: LngLat) {
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
