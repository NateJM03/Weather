/* Location.js */
/*
 * Handles zip code input; converts a 5-digit US zip code to geographic coordinates
 * and the corresponding city and state using the Zippopotam.us API.
 * When the location is successfully set, it immediately triggers forecast updates.
 */

var currentLocation = {
  zip: '',
  city: '',
  state: '',
  latitude: null,
  longitude: null
};

function fetchLocationFromZip(zip) {
  console.log("Fetching location for zip code:", zip);
  fetch(`https://api.zippopotam.us/us/${zip}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Zip code not found");
      }
      return response.json();
    })
    .then(data => {
      if (data && data.places && data.places.length > 0) {
        const place = data.places[0];
        currentLocation.zip = zip;
        currentLocation.city = place["place name"];
        currentLocation.state = place["state abbreviation"];
        currentLocation.latitude = parseFloat(place["latitude"]);
        currentLocation.longitude = parseFloat(place["longitude"]);

        // Update displayed location
        document.getElementById("location-display").innerText =
          `Forecast for: ${currentLocation.city}, ${currentLocation.state}`;
        console.log("Updated currentLocation:", currentLocation);

        // Trigger immediate forecast updates after setting location
        fetchCurrentConditions();
        fetchAlerts();
        fetchHourlyForecast();
        fetchDailyForecast();
      }
    })
    .catch(error => {
      console.error("Error fetching location data:", error);
      document.getElementById("location-display").innerText =
        "Invalid Zip Code. Please try again.";
    });
}

document.addEventListener("DOMContentLoaded", function() {
  const zipForm = document.getElementById("zip-form");
  zipForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const zipInput = document.getElementById("zip-input").value.trim();
    if (/^\d{5}$/.test(zipInput)) {
      fetchLocationFromZip(zipInput);
    } else {
      document.getElementById("location-display").innerText =
        "Please enter a valid 5-digit US zip code.";
    }
  });
});
