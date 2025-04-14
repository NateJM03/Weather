/* FetchDailyForecast.js */
/*
 * Retrieves the daily forecast from the NWS API.
 * Workflow:
 *   1. Call the /points/{lat},{lon} endpoint to get the forecast URL.
 *   2. Fetch the forecast data from that URL.
 *   3. The returned JSON contains a "periods" array with forecast items.
 *   4. For each forecast period, display:
 *        - Name (e.g., "Today", "Tonight")
 *        - Start Time (formatted)
 *        - Temperature and Temperature Unit
 *        - Short Forecast
 *        - Precipitation Chance (only if above 35%)
 *        - Wind Estimate (if available; wind speed and wind direction)
 */

function fetchDailyForecast() {
  console.log("Fetching daily forecast...");

  if (!currentLocation.latitude || !currentLocation.longitude) {
    console.log("No valid location set. Please enter a zip code.");
    return;
  }

  // Construct the URL using the /points endpoint.
  let pointsUrl = `https://api.weather.gov/points/${currentLocation.latitude},${currentLocation.longitude}`;
  
  fetch(pointsUrl, {
    headers: {
      'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
      'Accept': 'application/ld+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log("Points data for daily forecast:", data);
    // Extract the daily forecast URL from data.properties.forecast or data.forecast.
    let forecastUrl = (data.properties && data.properties.forecast)
      ? data.properties.forecast
      : data.forecast;
    if (!forecastUrl) {
      throw new Error("Daily forecast endpoint not found");
    }
    return fetch(forecastUrl, {
      headers: {
        'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
        'Accept': 'application/ld+json'
      }
    });
  })
  .then(response => response.json())
  .then(data => {
    console.log("Daily Forecast Data:", data);
    // Get the periods array from data.properties or directly from data.
    let periods = (data.properties && data.properties.periods)
      ? data.properties.periods
      : data.periods;
    
    if (periods && periods.length > 0) {
      let dailyHtml = periods.map(period => {
        // Format the start time nicely.
        let startTime = period.startTime ? new Date(period.startTime).toLocaleString() : "N/A";
        // Basic forecast information.
        let name = period.name || "Period";
        let temperature = period.temperature !== undefined ? period.temperature : "N/A";
        let temperatureUnit = period.temperatureUnit || "";
        let shortForecast = period.shortForecast || "N/A";
        
        // Precipitation chance: only display if provided and above 35%.
        let precipHtml = "";
        if (typeof period.probabilityOfPrecipitation === "number" && period.probabilityOfPrecipitation > 35) {
          precipHtml = `<p>Precipitation Chance: ${period.probabilityOfPrecipitation}%</p>`;
        }
        
        // Wind estimate: display wind speed and wind direction if available.
        let windInfo = "";
        if (period.windSpeed || period.windDirection) {
          windInfo = `<p>Wind: ${period.windSpeed ? period.windSpeed : "N/A"} ${period.windDirection ? period.windDirection : ""}</p>`;
        }
        
        // Combine all forecast information.
        return `<div style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
                  <p><strong>${name}</strong></p>
                  <p>Start Time: ${startTime}</p>
                  <p>Temperature: ${temperature}°${temperatureUnit}</p>
                  <p>Short Forecast: ${shortForecast}</p>
                  ${precipHtml}
                  ${windInfo}
                </div>`;
      }).join("");
      document.querySelector("#daily-forecast .content").innerHTML = dailyHtml;
    } else {
      document.querySelector("#daily-forecast .content").innerHTML = `<p>No daily forecast data available.</p>`;
    }
  })
  .catch(error => {
    console.error("Error fetching daily forecast:", error);
    document.querySelector("#daily-forecast .content").innerHTML = `<p>Error retrieving daily forecast.</p>`;
  });
}

document.addEventListener("DOMContentLoaded", function() {
  fetchDailyForecast();
  setInterval(fetchDailyForecast, 10 * 60 * 1000);
});
