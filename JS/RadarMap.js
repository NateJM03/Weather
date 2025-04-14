/* RadarMap.js */

let map;
let reflectivityLayer;
let velocityOverlay;
let currentProduct = "N0R";
let lastProduct = "N0R";
let velocityStation = null;
let velocityDebounceTimeout = null;

// nowCOAST WMS for national reflectivity
const NOWCOAST_WMS = "https://nowcoast.noaa.gov/arcgis/services/radar_meteo_imagery_nexrad_time/MapServer/WMSServer";

function initRadarMap() {
  map = L.map("radar-map").setView([39.8283, -98.5795], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  reflectivityLayer = L.tileLayer.wms(NOWCOAST_WMS, {
    layers: "1",
    format: "image/png",
    transparent: true,
    version: "1.1.1",
    attribution: "NOAA nowCOAST"
  });

  reflectivityLayer.addTo(map);

  document.getElementById("radar-layer-select").addEventListener("change", () => {
    const selected = document.getElementById("radar-layer-select").value;
    if (selected !== currentProduct) {
      lastProduct = currentProduct;
      currentProduct = selected;
      updateRadarOverlay();
    }
  });
}

function updateRadarMap(lat, lon) {
  map.setView([lat, lon], 7);
  updateRadarOverlay(lat, lon);
}

function updateRadarOverlay(lat = currentLocation.latitude, lon = currentLocation.longitude) {
  clearRadarLayers();

  if (currentProduct === "N0R") {
    reflectivityLayer.addTo(map);
  } else if (currentProduct === "N0U") {
    addVelocityOverlay(lat, lon);
  } else {
    console.warn(`${currentProduct} not supported; reverting to reflectivity.`);
    reflectivityLayer.addTo(map);
    document.getElementById("radar-layer-select").value = "N0R";
    currentProduct = "N0R";
  }
}

function clearRadarLayers() {
  if (map.hasLayer(reflectivityLayer)) map.removeLayer(reflectivityLayer);
  if (velocityOverlay) {
    map.removeLayer(velocityOverlay);
    map.off("moveend", debounceVelocityOverlay);
    velocityOverlay = null;
  }
}

function addVelocityOverlay(lat, lon) {
  if (!lat || !lon) {
    console.warn("Velocity overlay requires a valid location.");
    return;
  }

  fetch(`https://api.weather.gov/points/${lat},${lon}`)
    .then(response => response.json())
    .then(data => {
      const station = data.properties.radarStation;
      if (!station) throw new Error("No radar station found.");
      velocityStation = station;
      loadVelocityOverlay();
    })
    .catch(err => {
      console.error("Velocity fetch failed:", err);
      reflectivityLayer.addTo(map);
      document.getElementById("radar-layer-select").value = "N0R";
      currentProduct = "N0R";
    });
}

function loadVelocityOverlay() {
  if (!velocityStation) return;
  const gifUrl = `https://radar.weather.gov/ridge/RadarImg/N0U/${velocityStation}_0.gif`;

  velocityOverlay = L.imageOverlay(gifUrl, map.getBounds(), {
    opacity: 0.8
  }).addTo(map);

  map.on("moveend", debounceVelocityOverlay);
}

function debounceVelocityOverlay() {
  if (velocityDebounceTimeout) clearTimeout(velocityDebounceTimeout);
  velocityDebounceTimeout = setTimeout(() => {
    if (velocityOverlay) {
      velocityOverlay.setBounds(map.getBounds());
    }
  }, 150);
}

document.addEventListener("DOMContentLoaded", initRadarMap);
