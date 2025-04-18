// FetchHourlyForecast.js
// Fetches hourly forecast data and renders flexbox bars with embedded info and a responsive canvas-based line chart for precipitation.

const HOURS_TO_DISPLAY = 72;         // Number of forecast hours to display
const screenHeight = window.innerHeight;
const MIN_BAR_HEIGHT = screenHeight * 0.15;
const MAX_BAR_HEIGHT = screenHeight * 0.25;         // Maximum height range for temperature bars

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
  const oldBoxes = container.querySelectorAll('.hour-box');
  oldBoxes.forEach(box => box.remove());

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

  requestAnimationFrame(() => drawPrecipLine(precips));
}

function drawPrecipLine(precipArray) {
  const canvas = document.getElementById('precip-line-canvas');
  const container = document.getElementById('hourly-bars');
  const boxes = container.querySelectorAll('.hour-box');

  if (!canvas || !container || boxes.length === 0) return;

  const ctx = canvas.getContext('2d');

  // Set canvas size to container's scroll size
  const width = container.scrollWidth;
  const height = container.clientHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.9)';
  ctx.beginPath();

  // Use getBoundingClientRect to find positions relative to canvas
  const containerRect = container.getBoundingClientRect();

  let topOfBars = Infinity;
  let bottomOfText = -Infinity;

  // Calculate vertical bounds
  boxes.forEach(box => {
    const bar = box.querySelector('.temp-bar');
    const info = box.querySelector('.hour-info');

    if (bar && info) {
      const barTop = bar.getBoundingClientRect().top - containerRect.top;
      const infoRect = info.getBoundingClientRect();
      const textTop = infoRect.top - containerRect.top - 4; // 4px padding above text
      
      topOfBars = Math.min(topOfBars, barTop);
      bottomOfText = Math.max(bottomOfText, textTop);
    }
  });

  const chartHeight = bottomOfText - topOfBars;

  const getY = (value) => {
    const ratio = value / 100;
    return bottomOfText - (ratio * chartHeight);
  };

  // Map each point to center of each bar using actual offsetLeft
  const points = [];

  // Add leading point (offscreen)
  const firstBox = boxes[0];
  const boxWidth = firstBox.offsetWidth;
  const firstX = firstBox.offsetLeft + boxWidth / 2;
  const preX = firstX - (boxWidth);
  points.push([preX, getY(precipArray[0])]);

  // Main data points
  boxes.forEach((box, i) => {
    const value = precipArray[i];
    const x = box.offsetLeft + box.offsetWidth / 2;
    const y = getY(value);
    points.push([x, y]);
  });

  // Add trailing point (offscreen)
  const lastBox = boxes[boxes.length - 1];
  const lastX = lastBox.offsetLeft + lastBox.offsetWidth / 2;
  const postX = lastX + (lastBox.offsetWidth);
  points.push([postX, getY(precipArray[precipArray.length - 1])]);

  // Draw curve
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
  fetchHourlyForecast();
});