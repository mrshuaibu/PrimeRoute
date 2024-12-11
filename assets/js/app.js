'use strict';

mapboxgl.accessToken = 'pk.eyJ1Ijoid2VsbGZjIiwiYSI6ImNscTE5azY3eDAzeGwyaXIycTgyMnM0ZW8ifQ.0Bp9MRAu0DmdRpUI8lnDPg';

const track = document.querySelector('.btn');
const map = new mapboxgl.Map({
  container: 'map', // container ID
	style: 'mapbox://styles/mapbox/standard', // style URL
	center: [-97.1727973087, 49.9435258223], // starting position [lng, lat]
	zoom: 12, // starting zoom
});

const headOffice = new mapboxgl.Marker()
  .setLngLat([-97.1727973087, 49.9435258223])
  .addTo(map);

function getLocation(position) {
  let { latitude, longitude } = position.coords;
  const location = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
  map.flyTo({
    center: location.getLngLat(),
    zoom: 15,
    essential: true
  })
}

function errorHandler() {
  console.log('Unable to retrieve your location');
}

const accuracy = { enableHighAccuracy: true };
track.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, accuracy);
  } else {
    console.log('Geolocation is not supported by your browser')
  }
})