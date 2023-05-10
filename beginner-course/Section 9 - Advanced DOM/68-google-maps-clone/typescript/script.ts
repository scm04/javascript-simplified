const MAPBOX_ACCESS_TOKEN =
	"pk.eyJ1Ijoic2NtMDQiLCJhIjoiY2t6NHJnMnM2MGQ3bzJ1cG5tM3Y2OW0xZyJ9.3SgyMm7I8LFK5C2YWDI5yw"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true
})

// The following lines tell the TS compiler that mapboxgl and MapboxDirections
// are defined somewhere else and will be available in this file. Under normal circumstances,
// it would be better to declare an actual type, but I was not able to find an easy way
// to get the types in this file, so I just used "any" so that the I'm not getting an error.
// From my experience with this, I think the best approach for something like this is to
// use npm rather than a CDN as we did with the original solution, as shown by Kyle, because
// that allows us to import the types and have actual type safety, whereas my current solution
// is just giving anything with an unknown type the type of "any" so that it doesn't throw
// any errors.
// With that in mind, I think I am going to do a completely separate typescript version
// of the project so that I can actually use npm to give myself true type safety, so I will do
// that the next time I work on this class.
declare const mapboxgl: any
declare const MapboxDirections: any

function setupMap(centerPosition: [number, number]) {
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

export {}
