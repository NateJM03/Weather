/* FetchAlerts.js */
/*
 * Retrieves and displays active alerts from the NWS API.
 * It uses the endpoint: https://api.weather.gov/alerts/active?point={lat},{lon}
 * The results are rendered into the container with id "active-alerts".
 */

function fetchActiveAlerts() {
  console.log("Fetching active alerts...");

  if (!currentLocation.latitude || !currentLocation.longitude) {
    console.log("No valid location set. Please enter a zip code.");
    return;
  }

  // Construct the alerts URL using current latitude and longitude.
  const alertsUrl = `https://api.weather.gov/alerts/active?point=${currentLocation.latitude},${currentLocation.longitude}`;
  
  fetch(alertsUrl, {
    headers: {
      'User-Agent': 'TheClearWeather (web@millernj.com)',
      'Accept': 'application/ld+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Active Alerts Data:", data);
      let html = "";
      // Check if the data contains a non-empty "@graph" array.
      if (data["@graph"] && data["@graph"].length > 0) {
        html = data["@graph"].map(item => {
          // For each alert, display the headline and description.
          let headline = item.headline || "Alert";
          let description = item.description || "No description available.";
          return `<div style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
                    <p><strong>${headline}</strong></p>
                    <p>${description}</p>
                  </div>`;
        }).join("");
      } else {
        html = `<p>No active alerts.</p>`;
      }
      document.getElementById("active-alerts").innerHTML = html;
    })
    .catch(error => {
      console.error("Error fetching active alerts:", error);
      document.getElementById("active-alerts").innerHTML = `<p>Error retrieving active alerts.</p>`;
    });
}

function fetchAlerts() {
  fetchActiveAlerts();
}

document.addEventListener("DOMContentLoaded", function() {
  fetchAlerts();
  // Refresh active alerts every 10 minutes.
  setInterval(fetchAlerts, 10 * 60 * 1000);
});
