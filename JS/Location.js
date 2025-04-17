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
function geolocateByIP() {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
      const { latitude, longitude, city, region } = data;
      setLocation(latitude, longitude, `${city}, ${region}`);
    })
    .catch(err => {
      console.warn('IP geolocation failed:', err);
      // If you want to fallback to a default, you could call setLocation here
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
