/* RadarMap.js */
/*
 * Initializes a Leaflet map with base tiles and NOAA nowCOAST radar overlays.
 * Reflectivity uses the ArcGIS REST export endpoint (avoids CORS issues);
 * velocity uses animated GIFs.
 *
 * PARAMETERS you can adjust:
 *   updateWhenIdle       - boolean; wait until panning ends before loading tiles
 *   updateInterval       - number (ms); minimum time between tile reloads
 *   unloadInvisibleTiles - boolean; keep offscreen tiles in memory
 *   reuseTiles           - boolean; reuse <img> elements for tiles
 *   keepBuffer           - number; rows/columns of tiles to keep beyond viewport
 */

let map;
let reflectivityLayer;
let velocityOverlay;
let currentProduct = "N0R";
let lastProduct = "N0R";
let velocityStation = null;
let velocityDebounceTimeout = null;

// Convert tile X/Y/Z to Web Mercator bbox
function tile2bbox(x, y, z) {
  const tileSize = 256;
  const initialResolution = 2 * Math.PI * 6378137 / tileSize;
  const originShift = 2 * Math.PI * 6378137 / 2.0;
  const resolution = initialResolution / Math.pow(2, z);
  const minx = x * tileSize * resolution - originShift;
  const maxx = (x + 1) * tileSize * resolution - originShift;
  const miny = originShift - (y + 1) * tileSize * resolution;
  const maxy = originShift - y * tileSize * resolution;
  return [minx, miny, maxx, maxy];
}

// Define a TileLayer subclass that calls the ArcGIS REST export endpoint
const ReflectivityExportLayer = L.TileLayer.extend({
  getTileUrl: function(coords) {
    const bbox = tile2bbox(coords.x, coords.y, coords.z);
    // Use export to get a 256x256 PNG32 with transparency
    return `https://nowcoast.noaa.gov/arcgis/rest/services/radar_meteo_imagery_nexrad_time/MapServer/export` +
           `?bbox=${bbox.join(',')}` +
           `&bboxSR=3857&imageSR=3857` +
           `&layers=show:1` +
           `&size=256,256` +
           `&format=png32` +
           `&transparent=true` +
           `&f=image`;
  }
});

function initRadarMap() {
  // Create the Leaflet map centered on the continental U.S.
  map = L.map("radar-map").setView([39.8283, -98.5795], 5);

  // Add OpenStreetMap base tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Instantiate the reflectivity layer via export
  reflectivityLayer = new ReflectivityExportLayer({
    attribution: "NOAA nowCOAST",
    tileSize: 256,
    updateWhenIdle: true,
    updateInterval: 500,
    unloadInvisibleTiles: false,
    reuseTiles: true,
    keepBuffer: 2
  });

  // Add reflectivity overlay by default
  reflectivityLayer.addTo(map);

  // Handle switching between reflectivity and velocity
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
  // Recenter map on new location and update overlay
  map.setView([lat, lon], 7);
  updateRadarOverlay(lat, lon);
}

function updateRadarOverlay(lat = currentLocation.latitude, lon = currentLocation.longitude) {
  // Remove existing layers
  clearRadarLayers();

  if (currentProduct === "N0R") {
    // Reflectivity via export tiles
    reflectivityLayer.addTo(map);
  } else if (currentProduct === "N0U") {
    // Velocity overlay (animated GIF)
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

  // Fetch the nearest radar station for velocity product
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
  // Animated GIF URL for velocity product
  const gifUrl = `https://radar.weather.gov/ridge/RadarImg/N0U/${velocityStation}_0.gif`;

  velocityOverlay = L.imageOverlay(gifUrl, map.getBounds(), {
    opacity: 0.8
  }).addTo(map);

  // Debounce updating GIF bounds on map move
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