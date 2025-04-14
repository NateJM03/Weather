// RadarMap.js
// Initialize the Leaflet map
const radarMap = L.map('radar-map').setView([39.0, -98.0], 5);

// Add a dark base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(radarMap);

// Function to get a nowCOAST image overlay based on map bounds
function getNowcoastOverlay(bounds) {
  const bbox = bounds.toBBoxString(); // "west,south,east,north"
  const exportUrl = `https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/export?` +
    `bbox=${bbox}` +
    `&bboxSR=4326&imageSR=4326&size=800,600&format=png&transparent=true&f=image`;

  return L.imageOverlay(exportUrl, bounds, {
    opacity: 0.6,
    interactive: false
  });
}

// Add and update the radar overlay
let currentOverlay = null;

function updateRadarOverlay() {
  if (currentOverlay) {
    radarMap.removeLayer(currentOverlay);
  }
  currentOverlay = getNowcoastOverlay(radarMap.getBounds());
  currentOverlay.addTo(radarMap);
}

// Update overlay on map move
radarMap.on('moveend', updateRadarOverlay);

// Initial radar image
updateRadarOverlay();

// Fullscreen toggle on click
document.getElementById("radar-map").addEventListener("click", function () {
  if (!document.fullscreenElement) {
    this.requestFullscreen().catch(err => {
      console.error("Fullscreen error:", err);
    });
  } else {
    document.exitFullscreen();
  }
});

// Optional: Hook to update map center from Location.js
window.updateMapView = function () {
  if (window.currentLocation?.latitude && window.currentLocation?.longitude) {
    radarMap.setView([currentLocation.latitude, currentLocation.longitude], 7);
  }
};
