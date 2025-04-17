// RefreshController.js
// ——————————————————————————————————
// Centralized 30 s refresh for all weather data and radar,
// with guard to ensure only one interval is ever scheduled.

// Adjustable parameter:
// • REFRESH_ALL_INTERVAL_MS: refresh interval in milliseconds
const REFRESH_ALL_INTERVAL_MS = 6000 * 1000; // 30 seconds

// Flag to prevent multiple intervals
let refreshScheduled = false;

// Update the "Last updated" timestamp in the header and log it
function updateLastUpdated() {
  const el = document.getElementById('last-updated');
  const now = new Date();
  if (el) el.textContent = `Last updated: ${now.toLocaleTimeString()}`;
  console.log(`[${now.toISOString()}] Last‑updated set`);
}

// Perform a full refresh: fetch all data, redraw radar, update timestamp
function refreshAll() {
  const start = new Date();
  console.log(`[${start.toISOString()}] 🔄 Starting full refresh`);

  // 1. Refresh weather data
  fetchActiveAlerts();         // alerts
  fetchCurrentConditions();    // current conditions
  fetchHourlyForecast();       // hourly forecast
  fetchDailyForecast();        // daily forecast

  // 2. Refresh radar layers
  if (typeof nationalReflectivity !== 'undefined') {
    console.log('→ Redrawing national reflectivity');
    nationalReflectivity.redraw();
  }
  if (typeof productLayers !== 'undefined') {
    Object.values(productLayers).forEach(layer => {
      console.log('→ Redrawing station layer:', layer);
      layer.redraw();
    });
  }

  // 3. Update header timestamp
  updateLastUpdated();

  const end = new Date();
  console.log(`[${end.toISOString()}] ✅ Full refresh complete`);
}

// Kick off on each location-ready, but schedule interval only once
function onLocationReady() {
  // Immediate refresh on location change
  refreshAll();

  // Schedule recurring refresh only on first invocation
  if (!refreshScheduled) {
    setInterval(refreshAll, REFRESH_ALL_INTERVAL_MS);
    refreshScheduled = true;
  }

  // Hook manual refresh button once
  const btn = document.getElementById('refresh-button');
  if (btn && !btn._hooked) {
    btn.addEventListener('click', () => {
      console.log('🔄 Manual refresh triggered');
      refreshAll();
    });
    btn._hooked = true;
  }
}

document.addEventListener('location-ready', onLocationReady);
