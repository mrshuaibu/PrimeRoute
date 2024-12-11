'use strict';
import * as utils from './utils.js';
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VsbGZjIiwiYSI6ImNscTE5azY3eDAzeGwyaXIycTgyMnM0ZW8ifQ.0Bp9MRAu0DmdRpUI8lnDPg';

const track = utils.select('.btn');
const map = new mapboxgl.Map({
  container: 'map',
  center: [-97.17335053110165, 49.94432281545956],
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 8
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
  map.flyTo({
    center: [-97.17335053110165, 49.94432281545956],
    zoom: 14,
    pitch: 50,
    essential: true
  });
});


// setting the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setText(
  'PrimeRoute Head Office, come visit!'
);


const officeMarker = document.createElement('div');
officeMarker.id = 'office-marker';
const packageMarker = document.createElement('div');
packageMarker.id = 'package-marker';

    // create the marker
new mapboxgl.Marker(officeMarker)
  .setLngLat([-97.17335053110165, 49.94432281545956])
  .setPopup(popup)
  .addTo(map);

function getLocation(position) {
  let { latitude, longitude } = position.coords;
  const location = new mapboxgl.Marker(packageMarker)
    .setLngLat([longitude, latitude])
    .addTo(map);
  map.flyTo({
    center: location.getLngLat(),
    zoom: 15,
    pitch: 0,
    essential: true
  })
}

function errorHandler() {
  console.log('Unable to retrieve your location');
}

const accuracy = { enableHighAccuracy: true };

utils.listen('click', track, () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getLocation, errorHandler, accuracy);
  } else {
    console.log('Geolocation is not supported by your browser')
  }
})