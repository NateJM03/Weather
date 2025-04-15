// Location.js

let currentLocation = { latitude: null, longitude: null, city: null };

// Fetch coordinates and city name from a given zip code
function getLocationFromZip(zip) {
  // Use Zippopotam.us API to convert zip code to latitude, longitude, and city name
  const geocodeUrl = `https://api.zippopotam.us/us/${zip}`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.places && data.places.length > 0) {
        // Extract latitude, longitude, and city name
        currentLocation.latitude = parseFloat(data.places[0].latitude);
        currentLocation.longitude = parseFloat(data.places[0].longitude);
        currentLocation.city = data.places[0]["place name"];  // City name
        console.log('Location found:', currentLocation.latitude, currentLocation.longitude, currentLocation.city);
        
        // Update the location display with the city name
        document.getElementById('location-display').textContent = `Location: ${currentLocation.city}`;
        
        // Notify the other scripts that the location is ready
        document.dispatchEvent(new Event('location-ready'));  // Custom event signaling location is ready
      } else {
        console.error('Unable to find location for zip code');
      }
    })
    .catch(error => {
      console.error('Error fetching location from zip code:', error);
    });
}

// Handle form submission for zip code
document.getElementById('zip-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const zip = document.getElementById('zip-input').value;
  if (zip) {
    getLocationFromZip(zip);
  } else {
    alert('Please enter a valid zip code');
  }
});
