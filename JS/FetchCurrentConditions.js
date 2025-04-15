/*
 * Retrieves current weather conditions from the NWS API using the forecast grid data endpoint.
 * It first fetches the /points/{lat},{lon} endpoint, then uses the returned forecastGridData URL
 * to extract and display various meteorological parameters.
 */

function fetchCurrentConditions() {
  console.log("Fetching current conditions using forecast grid data...");

  // Ensure the location is ready before continuing
  if (!currentLocation.latitude || !currentLocation.longitude) {
    console.log("No valid location set. Please enter a zip code.");
    return;
  }

  // Construct the /points endpoint URL
  let pointsUrl = `https://api.weather.gov/points/${currentLocation.latitude},${currentLocation.longitude}`;

  fetch(pointsUrl, {
    headers: {
      'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
      'Accept': 'application/ld+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Points data:", data);

      // Look for forecastGridData first in data.properties, then at top level.
      let gridDataUrl = (data.properties && data.properties.forecastGridData)
        ? data.properties.forecastGridData
        : data.forecastGridData;

      if (!gridDataUrl) {
        throw new Error("No forecast grid data available");
      }

      // Fetch the grid data for current conditions
      return fetch(gridDataUrl, {
        headers: {
          'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
          'Accept': 'application/ld+json'
        }
      });
    })
    .then(response => response.json())
    .then(gridData => {
      console.log("Forecast grid data:", gridData);

      // Use gridData.properties if available; if not, fall back to gridData itself.
      let prop = (gridData.properties) ? gridData.properties : gridData;

      // Extract each parameter if available.
      let temperatureData = (prop.temperature && Array.isArray(prop.temperature.values) && prop.temperature.values.length > 0)
        ? prop.temperature.values[0].value : null;

      let dewpointData = (prop.dewpoint && Array.isArray(prop.dewpoint.values) && prop.dewpoint.values.length > 0)
        ? prop.dewpoint.values[0].value : null;

      let relativeHumidityData = (prop.relativeHumidity && Array.isArray(prop.relativeHumidity.values) && prop.relativeHumidity.values.length > 0)
        ? prop.relativeHumidity.values[0].value : null;

      let apparentTemperatureData = (prop.apparentTemperature && Array.isArray(prop.apparentTemperature.values) && prop.apparentTemperature.values.length > 0)
        ? prop.apparentTemperature.values[0].value : null;

      let windSpeedData = (prop.windSpeed && Array.isArray(prop.windSpeed.values) && prop.windSpeed.values.length > 0)
        ? prop.windSpeed.values[0].value : null;

      let windDirectionData = (prop.windDirection && Array.isArray(prop.windDirection.values) && prop.windDirection.values.length > 0)
        ? prop.windDirection.values[0].value : null;

      let skyCoverData = (prop.skyCover && Array.isArray(prop.skyCover.values) && prop.skyCover.values.length > 0)
        ? prop.skyCover.values[0].value : null;

      let precipProbData = (prop.probabilityOfPrecipitation && Array.isArray(prop.probabilityOfPrecipitation.values) && prop.probabilityOfPrecipitation.values.length > 0)
        ? prop.probabilityOfPrecipitation.values[0].value : null;

      let qpfData = (prop.quantitativePrecipitation && Array.isArray(prop.quantitativePrecipitation.values) && prop.quantitativePrecipitation.values.length > 0)
        ? prop.quantitativePrecipitation.values[0].value : null;

      let pressureData = (prop.pressure && Array.isArray(prop.pressure.values) && prop.pressure.values.length > 0)
        ? prop.pressure.values[0].value : null;

      console.log("Extracted temperature:", temperatureData);

      // Convert temperature values from Celsius to Fahrenheit.
      let temperatureF = (typeof temperatureData === 'number')
        ? (temperatureData * 9/5 + 32).toFixed(1) : "N/A";

      let dewpointF = (typeof dewpointData === 'number')
        ? (dewpointData * 9/5 + 32).toFixed(1) : "N/A";

      let apparentTemperatureF = (typeof apparentTemperatureData === 'number')
        ? (apparentTemperatureData * 9/5 + 32).toFixed(1) : "N/A";

      // Relative Humidity: display as a percentage.
      let humidityDisplay = (typeof relativeHumidityData === 'number')
        ? relativeHumidityData.toFixed(1) + "%" : "N/A";

      // Wind speed: if provided in km/h, also convert to mph.
      let windSpeedKmh = (typeof windSpeedData === 'number')
        ? windSpeedData.toFixed(1) : "N/A";

      let windSpeedMph = (typeof windSpeedData === 'number')
        ? (windSpeedData * 0.621371).toFixed(1) : "N/A";

      // Wind direction.
      let windDirDisplay = (typeof windDirectionData === 'number')
        ? windDirectionData.toFixed(0) + "°" : "N/A";

      // Sky cover: displayed as a percentage.
      let skyCoverDisplay = (typeof skyCoverData === 'number')
        ? skyCoverData.toFixed(1) + "%" : "N/A";

      // Precipitation probability.
      let precipProbDisplay = (typeof precipProbData === 'number')
        ? precipProbData.toFixed(1) + "%" : "N/A";

      // Quantitative Precipitation (QPF) in mm.
      let qpfDisplay = (typeof qpfData === 'number')
        ? qpfData.toFixed(1) + " mm" : "N/A";

      // Pressure: display as provided.
      let pressureDisplay = (typeof pressureData === 'number')
        ? pressureData.toFixed(1) : "N/A";

      // Combine all the data into HTML.
      let html = `<p>Temperature: ${temperatureF}°F</p>
                  <p>Dew Point: ${dewpointF}°F</p>
                  <p>Relative Humidity: ${humidityDisplay}</p>
                  <p>Apparent Temperature: ${apparentTemperatureF}°F</p>
                  <p>Wind: ${windSpeedKmh} km/h (${windSpeedMph} mph) from ${windDirDisplay}</p>
                  <p>Sky Cover: ${skyCoverDisplay}</p>
                  <p>Precipitation Probability: ${precipProbDisplay}</p>
                  <p>Quantitative Precipitation: ${qpfDisplay}</p>
                  <p>Pressure: ${pressureDisplay}</p>`;

      document.querySelector("#current-conditions .content").innerHTML = html;

    })
    .catch(error => {
      console.error("Error fetching current conditions:", error);
      document.querySelector("#current-conditions .content").innerHTML =
        `<p>Error retrieving current conditions.</p>`;
    });
}

// Wait for the location to be ready before fetching the current conditions
document.addEventListener("location-ready", function () {
  fetchCurrentConditions();
  // Optionally, set an interval to refresh the current conditions every 10 minutes
  setInterval(fetchCurrentConditions, 10 * 60 * 1000); // 10 minutes
});
