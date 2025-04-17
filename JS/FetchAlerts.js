// FetchAlerts.js
// Overhauled alerts system: fetch and render local watches, warnings, and advisories.
// Displays a top banner with a short summary; clicking it expands to show full details.
// Also populates the “Active Alerts” section with all alert types, separate from the radar map.

// Adjustable parameters:
// • REFRESH_INTERVAL_MS: how often (ms) to re-fetch alerts. Change this value to adjust polling frequency.
// • BANNER_COLLAPSED_HEIGHT: pixel height of the banner when collapsed. Adjust to match your summary row height.
// • BANNER_EXPAND_ANIMATION_MS: duration (ms) of the expand/collapse animation. Match this to your CSS transition.

// Usage notes:
// - The banner can be manually dismissed; it won’t reappear until the location changes.
// - “Active Alerts” always updates regardless of banner dismissal.

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const BANNER_COLLAPSED_HEIGHT = 48;         // px
const BANNER_EXPAND_ANIMATION_MS = 400;      // ms

// State flags
let bannerDismissed = false;
let hideTimeout = null;

// --- DOM references ---
const alertBanner = document.getElementById('alert-banner');
const activeAlertsContainer = document.getElementById('active-alerts');

// Initialize banner markup, styles, and event handlers
function initAlertBanner() {
  bannerDismissed = false;
  // Clear any pending hide
  if (hideTimeout) clearTimeout(hideTimeout);
  document.body.classList.remove('has-alert');
  alertBanner.style.display = 'none';
  alertBanner.style.maxHeight = '0px';

  // Build banner HTML structure
  alertBanner.innerHTML = `
    <div id="alert-row">
      <div id="alert-summary" role="button" tabindex="0"></div>
      <button id="alert-close" aria-label="Close Alerts">&times;</button>
    </div>
    <div id="alert-details"></div>
  `;

  // Base styles for collapse/expand
  alertBanner.style.overflow = 'hidden';
  alertBanner.style.transition = `max-height ${BANNER_EXPAND_ANIMATION_MS}ms ease`;

  // Grab newly created elements
  const summaryEl = document.getElementById('alert-summary');
  const closeBtn  = document.getElementById('alert-close');

  // Close button hides banner until next location change
  closeBtn.addEventListener('click', () => {
    bannerDismissed = true;
    hideAlertBanner(); // fully hide
  });

  // Summary click/keypress toggles details pane
  summaryEl.addEventListener('click', toggleBanner);
  summaryEl.addEventListener('keypress', e => {
    if (e.key === 'Enter' || e.key === ' ') toggleBanner();
  });

  // Initialize Active Alerts section placeholder
  activeAlertsContainer.innerHTML = '<p>No active weather alerts.</p>';
}

// Expand banner to show full details
function expandBanner() {
  const totalHeight = alertBanner.scrollHeight;
  alertBanner.style.maxHeight = `${totalHeight}px`;
}

// Collapse banner back to summary only
function collapseBanner() {
  alertBanner.style.maxHeight = `${BANNER_COLLAPSED_HEIGHT}px`;
}

// Toggle between expanded and collapsed states
function toggleBanner() {
  const isCollapsed = alertBanner.style.maxHeight === `${BANNER_COLLAPSED_HEIGHT}px`;
  if (isCollapsed) expandBanner();
  else collapseBanner();
}

// Show banner with summary and details; type sets CSS styling ('warning' or 'watch')
function showAlertBanner(type, summaryText, detailsHtml) {
  // Cancel any pending hide
  if (hideTimeout) clearTimeout(hideTimeout);

  document.body.classList.add('has-alert');
  alertBanner.className = type;
  alertBanner.style.display = 'block';

  document.getElementById('alert-summary').textContent = summaryText;
  document.getElementById('alert-details').innerHTML = detailsHtml;

  // Start collapsed
  alertBanner.style.maxHeight = `${BANNER_COLLAPSED_HEIGHT}px`;
}

// Hide banner completely (until next showAlertBanner call)
function hideAlertBanner() {
  document.body.classList.remove('has-alert');
  alertBanner.style.maxHeight = '0px';
  // After animation, remove from flow
  hideTimeout = setTimeout(() => {
    alertBanner.style.display = 'none';
  }, BANNER_EXPAND_ANIMATION_MS);
}

// Fetch and render alerts: banner (warnings/watches) and Active Alerts (all types)
function fetchActiveAlerts() {
  if (!currentLocation.latitude || !currentLocation.longitude) return;

  const url = `https://api.weather.gov/alerts/active?point=${currentLocation.latitude},${currentLocation.longitude}`;
  fetch(url, {
    headers: {
      'User-Agent': 'KitchenWeatherDisplay (your.email@example.com)',
      'Accept': 'application/geo+json'
    }
  })
    .then(res => res.json())
    .then(data => {
      const features = data.features || [];
      const bannerItems = [];
      const activeItems = [];

      features.forEach(f => {
        const ev        = f.properties.event || 'Weather Alert';
        const area      = f.properties.areaDesc || '';
        const effective = new Date(f.properties.effective).toLocaleString();
        const desc      = f.properties.description || '';

        const itemHtml = `
          <div class=\"alert-item\">` +
            `<strong>${ev}</strong><br>` +
            `${area}<br>` +
            `Effective: ${effective}<br>` +
            `${desc}` +
          `</div>`;

        activeItems.push(itemHtml);
        if (/warning/i.test(ev) || /watch/i.test(ev)) {
          bannerItems.push({ ev, html: itemHtml });
        }
      });

      // Update Active Alerts section
      activeAlertsContainer.innerHTML = activeItems.length
        ? activeItems.join('')
        : '<p>No active weather alerts.</p>';

      // Banner display logic, honoring manual dismissal
      if (!bannerDismissed && bannerItems.length) {
        const isWarning = bannerItems.some(i => /warning/i.test(i.ev));
        const summary = isWarning
          ? '⚠️ Weather Warning in Your Area'
          : '⚠️ Weather Watch in Your Area';
        const details = bannerItems.map(i => i.html).join('');
        showAlertBanner(isWarning ? 'warning' : 'watch', summary, details);
      } else if (!bannerItems.length) {
        hideAlertBanner();
      }
    })
    .catch(err => {
      console.error('Error fetching alerts:', err);
      hideAlertBanner();
    });
}

// Initialize and schedule fetches on location change
document.addEventListener('location-ready', () => {
  initAlertBanner();
  fetchActiveAlerts();
  setInterval(fetchActiveAlerts, REFRESH_INTERVAL_MS);
});
