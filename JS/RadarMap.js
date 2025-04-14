/* RadarMap.js */
let map;
let currentRadarLayer;

function initRadarMap() {
  map = L.map('radar-map').setView([39.8283, -98.5795], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
}

function updateRadarMap(lat, lon) {
  // Determine the nearest radar station and update the radar layer
  fetch(`https://mesonet.agron.iastate.edu/json/radar.py?operation=available&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(data => {
      if (data.available && data.available.length > 0) {
        const site = data.available[0];
        setRadarLayer(site);
      } else {
        console.error("No radar stations available for this location.");
      }
    })
    .catch(err => console.error("Error fetching radar stations:", err));
}

function setRadarLayer(siteID) {
  const tileUrl = `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/ridge::${siteID}-N0U-0/{z}/{x}/{y}.png`;
  if (currentRadarLayer) {
    map.removeLayer(currentRadarLayer);
  }
  currentRadarLayer = L.tileLayer(tileUrl, {
    opacity: 0.6,
    zIndex: 100,
    attribution: 'Radar imagery from ISU Mesonet'
  }).addTo(map);
}

document.addEventListener("DOMContentLoaded", initRadarMap);
