// RadarMap.js

// Initialize the map
let map = L.map('radar-map', {
    center: [39.8283, -98.5795], // Default center (US-wide)
    zoom: 5, // Default zoom level
    attributionControl: false // Disable Leaflet's default attribution
  });
  
  // Set the base layer (OpenStreetMap for context)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Correct WMS URL for Iowa State Radar Service
  const proxyUrl = "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi";  // Use this base URL for WMS requests
  
  // Reflectivity Layer from Cloudflare Proxy (Updated to N0R layer)
  const reflectivityLayer = L.tileLayer.wms(proxyUrl, {
    layers: 'nexrad-n0r',  // Updated to use the N0R layer
    format: 'image/png',
    transparent: true,
    attribution: "Iowa State NEXRAD Reflectivity"
  });
  
  // Velocity Layer from Cloudflare Proxy (Updated to N0S layer)
  const velocityLayer = L.tileLayer.wms(proxyUrl, {
    layers: 'nexrad-n0s',  // Updated to use the N0S layer
    format: 'image/png',
    transparent: true,
    attribution: "Iowa State NEXRAD Velocity"
  });
  
  // Watches and Warnings Layer from Cloudflare Proxy
  const watchesWarningsLayer = L.tileLayer.wms(proxyUrl, {
    layers: '0', // Layer for active watches and warnings
    format: 'image/png',
    transparent: true,
    attribution: "NOAA Watches and Warnings"
  });
  
  // Add reflectivity layer by default
  reflectivityLayer.addTo(map);
  
  // Function to toggle between reflectivity and velocity layers
  function toggleRadarLayer(layerType) {
    if (layerType === "reflectivity") {
      map.removeLayer(velocityLayer);
      reflectivityLayer.addTo(map);
    } else if (layerType === "velocity") {
      map.removeLayer(reflectivityLayer);
      velocityLayer.addTo(map);
    }
  }
  
  // Function to toggle watches/warnings layer
  function toggleWatchesWarningsLayer() {
    if (map.hasLayer(watchesWarningsLayer)) {
      map.removeLayer(watchesWarningsLayer);
    } else {
      watchesWarningsLayer.addTo(map);
    }
  }
  
  // Add buttons to toggle between layers
  const control = L.control({ position: 'topright' });
  control.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-control-layers');
    div.innerHTML = `
      <button onclick="toggleRadarLayer('reflectivity')">Reflectivity</button>
      <button onclick="toggleRadarLayer('velocity')">Velocity</button>
      <button onclick="toggleWatchesWarningsLayer()">Toggle Watches/Warnings</button>
    `;
    return div;
  };
  control.addTo(map);
  