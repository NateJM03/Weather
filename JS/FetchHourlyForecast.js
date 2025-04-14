/* FetchHourlyForecast.js */
/*
 * Retrieves the hourly forecast from the NWS API.
 * It fetches the /points/{lat},{lon} endpoint to retrieve the forecastHourly URL,
 * then fetches the hourly forecast data and displays detailed information for each period.
 * This version removes the weather icon and adds temperature trend and precipitation chance information (if >35%).
 */

function fetchHourlyForecast() {
  console.log("Fetching hourly forecast...");

  if (!currentLocation.latitude || !currentLocation.longitude) {
    console.log("No valid location set. Please enter a zip code.");
    return;
  }

  let pointsUrl = `https://api.weather.gov/points/${currentLocation.latitude},${currentLocation.longitude}`;
  
  // Fetch the points data to get the forecastHourly URL.
  fetch(pointsUrl, {
    headers: {
      'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
      'Accept': 'application/ld+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Points data for hourly forecast:", data);
      // Check for forecastHourly in data.properties; if not, try top-level.
      let forecastHourlyUrl = (data.properties && data.properties.forecastHourly)
                                ? data.properties.forecastHourly
                                : data.forecastHourly;
      if (!forecastHourlyUrl) {
        throw new Error("Hourly forecast endpoint not found");
      }
      return fetch(forecastHourlyUrl, {
        headers: {
          'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
          'Accept': 'application/ld+json'
        }
      });
    })
    .then(response => response.json())
    .then(data => {
      console.log("Hourly Forecast Data:", data);
      // Retrieve the periods array from either data.properties or directly on data.
      let periods = (data.properties && data.properties.periods)
                      ? data.properties.periods
                      : data.periods;
      
      if (periods && periods.length > 0) {
        let hourlyHtml = periods.map(period => {
          // Extract the time portion (HH:MM) from the startTime string.
          let timeStr = period.startTime ? period.startTime.slice(11, 16) : "N/A";
          let temperatureStr = period.temperature ? `${period.temperature}°${period.temperatureUnit}` : "N/A";
          let shortForecast = period.shortForecast || "N/A";
          // Detailed (long) forecast, if available.
          let detailedForecast = period.detailedForecast ? `<p>${period.detailedForecast}</p>` : "";
          // Wind information.
          let windInfo = "";
          if (period.windSpeed || period.windDirection) {
            windInfo = `<p>Wind: ${period.windSpeed || "N/A"} ${period.windDirection || ""}</p>`;
          }
          // Temperature trend (if available).
          let tempTrend = "";
          if (period.temperatureTrend) {
            tempTrend = `<p>Temp Trend: ${period.temperatureTrend}</p>`;
          }
          // Precipitation chance: only display if over 35%.
          let precipChance = "";
          // Assuming the property is a number:
          if (typeof period.probabilityOfPrecipitation === "number" && period.probabilityOfPrecipitation > 35) {
            precipChance = `<p>Precipitation Chance: ${period.probabilityOfPrecipitation}%</p>`;
          }
          
          return `<div style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
                    <p><strong>${timeStr}</strong></p>
                    <p>Temperature: ${temperatureStr}</p>
                    ${tempTrend}
                    <p>Condition: ${shortForecast}</p>
                    ${windInfo}
                    ${precipChance}
                    ${detailedForecast}
                  </div>`;
        }).join("");
        document.querySelector("#hourly-forecast .content").innerHTML = hourlyHtml;
      } else {
        document.querySelector("#hourly-forecast .content").innerHTML = `<p>No hourly forecast data available.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching hourly forecast:", error);
      document.querySelector("#hourly-forecast .content").innerHTML = `<p>Error retrieving hourly forecast.</p>`;
    });
}

document.addEventListener("DOMContentLoaded", function() {
  fetchHourlyForecast();
  setInterval(fetchHourlyForecast, 10 * 60 * 1000);
});
