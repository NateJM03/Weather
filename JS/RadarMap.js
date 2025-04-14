let map;
let currentRadarLayer;
const radarTileBase = "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/ridge::";
const radarLayers = {
  "N0R": "Reflectivity",
  "N0U": "Velocity",
  "N0V": "Spectrum Width",
  "N0S": "Storm-Relative Velocity"
};

// Initialize the Leaflet map
function initRadarMap() {
  map = L.map("radar-map").setView([39.8283, -98.5795], 5); // Default: center of USA

  // Add base map layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Load default radar overlay
  setRadarLayer("N0R");

  // Setup listener for radar layer change
  const radarSelect = document.getElementById("radar-layer-select");
  radarSelect.addEventListener("change", (e) => {
    setRadarLayer(e.target.value);
  });

  // Load alerts
  loadNWSAlerts();
}

// Set a radar overlay tile
function setRadarLayer(layerCode) {
  if (currentRadarLayer) {
    map.removeLayer(currentRadarLayer);
  }

  const tileUrl = `${radarTileBase}${layerCode}/{z}/{x}/{y}.png`;

  currentRadarLayer = L.tileLayer(tileUrl, {
    opacity: 0.6,
    zIndex: 100,
    attribution: "Radar imagery from ISU Mesonet"
  });

  currentRadarLayer.addTo(map);
}

// Load and overlay NWS alerts
function loadNWSAlerts() {
  fetch("https://api.weather.gov/alerts/active")
    .then(res => res.json())
    .then(data => {
      const alertsLayer = L.geoJSON(data, {
        style: feature => ({
          color: "#ff6f61",
          weight: 2,
          fillOpacity: 0.25
        }),
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const msg = `<strong>${props.event}</strong><br>${props.headline}<br><em>${props.description || "No description."}</em>`;
          layer.bindPopup(msg);
        }
      });

      alertsLayer.addTo(map);
    })
    .catch(err => console.error("Failed to load alerts:", err));
}

// Wait for DOM
document.addEventListener("DOMContentLoaded", initRadarMap);
