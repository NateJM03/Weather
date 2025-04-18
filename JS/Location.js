// Location.js

let currentLocation = {
  latitude: null,
  longitude: null,
  city: null
};

// Centralize setting the location and firing the “location-ready” event
function setLocation(lat, lon, cityName) {
  currentLocation.latitude  = lat;
  currentLocation.longitude = lon;
  currentLocation.city      = cityName;
  document.getElementById('location-display').textContent = `Location: ${cityName}`;
  // let everyone know
  document.dispatchEvent(new Event('location-ready'));
}

// 1) Try IP Geolocation on first load
// 1) Try IP Geolocation on first load
function geolocateByIP() {
  // use ip-api.com for CORS-friendly lookup
  fetch('http://ip-api.com/json/')
    .then(r => {
      if (!r.ok) throw new Error('IP lookup failed');
      return r.json();
    })
    .then(data => {
      const { lat, lon, city, regionName } = data;
      setLocation(lat, lon, `${city}, ${regionName}`);
    })
    .catch(err => {
      console.warn('IP geolocation failed:', err);
      // optional: fallback to default coordinates
    });
}

// 2) Zip‑code override
function getLocationFromZip(zip) {
  const geocodeUrl = `https://api.zippopotam.us/us/${zip}`;
  fetch(geocodeUrl)
    .then(r => {
      if (!r.ok) throw new Error('Invalid ZIP');
      return r.json();
    })
    .then(data => {
      const place = data.places[0];
      setLocation(
        parseFloat(place.latitude),
        parseFloat(place.longitude),
        `${place['place name']}, ${data['post code']}`
      );
    })
    .catch(err => {
      console.error('Error fetching location for ZIP:', err);
      alert('Cannot find that ZIP code.');
    });
}

// Wire up the ZIP form
document.getElementById('zip-form').addEventListener('submit', e => {
  e.preventDefault();
  const zip = document.getElementById('zip-input').value.trim();
  if (zip) getLocationFromZip(zip);
});

// Kick off IP geolocation once the DOM is ready
window.addEventListener('DOMContentLoaded', geolocateByIP);
