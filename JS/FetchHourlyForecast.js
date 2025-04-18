// FetchHourlyForecast.js
// Fetches hourly forecast data and renders flexbox bars with embedded info and a responsive canvas-based line chart for precipitation.

const HOURS_TO_DISPLAY = 72;         // Number of forecast hours to display
const MIN_BAR_HEIGHT = 160;          // Minimum pixel height for a temperature bar
const MAX_BAR_HEIGHT = 500;          // Maximum height range for temperature bars

// Begin fetch chain
function fetchHourlyForecast() {
  if (!currentLocation.latitude || !currentLocation.longitude) return;

  const ptsUrl = `https://api.weather.gov/points/${currentLocation.latitude},${currentLocation.longitude}`;
  fetch(ptsUrl, {
    headers: {
      'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
      'Accept': 'application/ld+json'
    }
  })
    .then(res => res.json())
    .then(data => {
      const hourlyUrl = data.properties?.forecastHourly || data.forecastHourly;
      if (!hourlyUrl) throw new Error("Hourly forecast endpoint not found");
      return fetch(hourlyUrl, {
        headers: {
          'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
          'Accept': 'application/ld+json'
        }
      });
    })
    .then(res => res.json())
    .then(data => {
      const hours = (data.properties?.periods || data.periods || []).slice(0, HOURS_TO_DISPLAY);
      renderHourlyForecast(hours);
    })
    .catch(err => console.error("Hourly forecast fetch error:", err));
}

// Renders all hourly boxes and draws the precip line
function renderHourlyForecast(hourData) {
  const container = document.getElementById('hourly-bars');
  const canvas = document.getElementById('precip-line-canvas');
  container.innerHTML = '';

  const temps = hourData.map(h => h.temperature);
  const precips = hourData.map(h => h.probabilityOfPrecipitation?.value ?? 0);

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  hourData.forEach(hour => {
    const barHeight = MIN_BAR_HEIGHT + ((hour.temperature - minTemp) / (maxTemp - minTemp)) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

    const box = document.createElement('div');
    box.className = 'hour-box';

    const bar = document.createElement('div');
    bar.className = 'temp-bar';
    bar.style.height = `${barHeight}px`;

    const info = document.createElement('div');
    info.className = 'hour-info';
    info.innerHTML = `
      ${hour.startTime.slice(11, 16)}<br>
      🌡 ${hour.temperature}°${hour.temperatureUnit}<br>
      🌫 ${hour.windSpeed || '—'}<br>
      🌧 ${hour.probabilityOfPrecipitation?.value ?? 0}%
    `;

    box.appendChild(bar);
    box.appendChild(info);
    container.appendChild(box);
  });

  drawPrecipLine(precips);
}

// Draws the precipitation line using actual rendered element sizes
function drawPrecipLine(precipArray) {
  const canvas = document.getElementById('precip-line-canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('hourly-bars');
  const firstBox = container.querySelector('.hour-box');

  if (!firstBox) return;

  // Get computed values of first bar (width + margins)
  const style = getComputedStyle(firstBox);
  const barWidth = firstBox.offsetWidth;
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);
  const fullWidthPerBar = barWidth + marginLeft + marginRight;

  // Dynamically set canvas size to match total bar layout
  const width = container.scrollWidth;
  const height = container.offsetHeight;
  const zeroLineOffset = 100; // distance from bottom where 0% appears

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  // Draw style
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.9)';
  ctx.beginPath();

  // Convert precip % to Y coordinate
  const chartHeight = height - zeroLineOffset;
  function getY(value) {
    return chartHeight - (value / 100) * chartHeight;
  }

  // Get array of [x, y] points
  const points = [];

  // Add leading offscreen point
  const firstValue = precipArray[0];
  const preX = -fullWidthPerBar / 2 + marginLeft + barWidth / 2;
  points.push([preX, getY(firstValue)]);
  
  // Add main points
  precipArray.forEach((value, index) => {
    const x = index * fullWidthPerBar + marginLeft + barWidth / 2;
    points.push([x, getY(value)]);
  });
  
  // Add trailing offscreen point
  const lastIndex = precipArray.length - 1;
  const lastValue = precipArray[lastIndex];
  const postX = (lastIndex + 1) * fullWidthPerBar + marginLeft + barWidth / 2;
  points.push([postX, getY(lastValue)]);

  if (points.length < 2) return;

  // Draw smooth line using Bezier spline
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2[0], p2[1]);
  }

  ctx.stroke();
}

document.addEventListener("location-ready", function() {
  fetchHourlyForecast(); // still run once on location ready!
});