// RefreshController.js
// ——————————————————————————————————
// Centralized refresh for all weather data and radar,
// with guard to ensure only one interval is ever scheduled.

// Adjustable parameter:
// • REFRESH_ALL_INTERVAL_MS: refresh interval in milliseconds.
//   Increase this value for less frequent updates, or decrease for more frequent.
const REFRESH_ALL_INTERVAL_MS = 600 * 1000; // 10 minutes

// Flag to prevent scheduling multiple intervals
let refreshScheduled = false;

/**
 * Updates the "Last updated" timestamp in the header.
 * - Writes human‑readable time to the DOM.
 * - Logs the ISO timestamp to the console.
 */
function updateLastUpdated() {
  const el = document.getElementById('last-updated');
  const now = new Date();
  if (el) el.textContent = `Last updated: ${now.toLocaleTimeString()}`;
  console.log(`[${now.toISOString()}] Last‑updated set`);
}

/**
 * Performs a full data refresh:
 * 1. Fetches and renders alerts, current conditions, hourly and daily forecasts.
 * 2. Redraws any station‑specific radar layers (if initialized).
 * 3. Updates the "Last updated" timestamp.
 */
function refreshAll() {
    // 1. Refresh all weather data
    fetchActiveAlerts();
    fetchCurrentConditions();
    fetchHourlyForecast();
    fetchDailyForecast();
  
    // 2. Refresh all product layers (station-based overlays)
    if (window.productLayers && typeof window.productLayers === 'object') {
      Object.values(window.productLayers).forEach(layer => {
        if (layer && typeof layer.redraw === 'function') {
          layer.redraw(); // station radar products
        }
      });
    }
  
    // 3. Force refresh of the TimeDimension layer (cloud/radar animations)
    if (window.map && window.map.timeDimension) {
      const now = window.map.timeDimension.getCurrentTime();
      window.map.timeDimension.setCurrentTime(now); // triggers refresh of the current frame
    }
  
    // 4. Update timestamp
    updateLastUpdated();
  }
if (window.productLayers && typeof window.productLayers === 'object') {
    Object.values(window.productLayers).forEach(layer => layer.redraw());
  }
/**
 * Initializes the refresh cycle when a new location is set:
 * - Immediately runs one full refresh.
 * - Schedules recurring refreshes (only once).
 * - Hooks up the manual "Refresh" button.
 */
function onLocationReady() {
  // Schedule first refresh after delay instead of running immediately
  if (!refreshScheduled) {
    setTimeout(() => {
      refreshAll(); // Run once after the delay
      setInterval(refreshAll, REFRESH_ALL_INTERVAL_MS); // Then continue on interval
    }, REFRESH_ALL_INTERVAL_MS);
    refreshScheduled = true;
  }

  // Hook the manual refresh button (only once)
  const btn = document.getElementById('refresh-button');
  if (btn && !btn._hooked) {
    btn.addEventListener('click', () => {
      console.log('🔄 Manual refresh triggered');
      refreshAll();
    });
    btn._hooked = true;
  }
}

// Listen for the custom "location-ready" event to kick everything off
document.addEventListener('location-ready', onLocationReady);
