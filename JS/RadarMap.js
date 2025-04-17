
const staticStations = [
  { id: "KABR", name: "	ABERDEEN	", state: "	ABERDEEN, SD	" },
  { id: "KBIS", name: "	BISMARCK	", state: "	BISMARCK, ND	" },
  { id: "KFTG", name: "	FRONT RANGE AP	", state: "	DENVER/BOULDER, CO	" },
  { id: "KDMX", name: "	JOHNSTON	", state: "	DES MOINES, IA	" },
  { id: "KDTX", name: "	WHITE LAKE	", state: "	DETROIT, MI	" },
  { id: "KDDC", name: "	DODGE CITY	", state: "	DODGE CITY, KS	" },
  { id: "KDLH", name: "	DULUTH	", state: "	DULUTH, MN	" },
  { id: "KCYS", name: "	CHEYENNE	", state: "	CHEYENNE, WY	" },
  { id: "KLOT", name: "	ROMEOVILLE	", state: "	CHICAGO, IL	" },
  { id: "KGLD", name: "	GOODLAND	", state: "	GOODLAND, KS	" },
  { id: "KUEX", name: "	BLUE HILL	", state: "	HASTINGS, NE	" },
  { id: "KGJX", name: "	GRAND JUNCTION	", state: "	GRAND JUNCTION, CO	" },
  { id: "KGRR", name: "	GRAND RAPIDS	", state: "	GRAND RAPIDS, MI	" },
  { id: "KMVX", name: "	GRAND FORKS	", state: "	FARGO/GRAND FORKS, ND	" },
  { id: "KGRB", name: "	GREEN BAY	", state: "	GREEN BAY, WI	" },
  { id: "KIND", name: "	INDIANAPOLIS	", state: "	INDIANAPOLIS, IN	" },
  { id: "KJKL", name: "	JACKSON	", state: "	JACKSON, KY	" },
  { id: "KARX", name: "	LA CROSSE	", state: "	LA CROSSE, WI	" },
  { id: "KILX", name: "	LINCOLN	", state: "	LINCOLN/CENTRAL ILLINOIS, IL	" },
  { id: "KLVX", name: "	FORT KNOX	", state: "	LOUISVILLE, KY	" },
  { id: "KMQT", name: "	NEGAUNEE	", state: "	MARQUETTE	" },
  { id: "KMKX", name: "	DOUSMAN	", state: "	MILWAUKEE, WI	" },
  { id: "KMPX", name: "	CHANHASSEN	", state: "	MINNEAPOLIS, MN	" },
  { id: "KAPX", name: "	GAYLORD	", state: "	GAYLORD/ALPENA, MI	" },
  { id: "KLNX", name: "	NORTH PLATTE	", state: "	NORTH PLATTE, NE	" },
  { id: "KIWX", name: "	NORTH WEBSTER	", state: "	N. WEBSTER/NORTHERN, IN	" },
  { id: "KOAX", name: "	VALLEY	", state: "	OMAHA, NE	" },
  { id: "KPAH", name: "	PADUCAH	", state: "	PADUCAH, KY	" },
  { id: "KEAX", name: "	PLEASANT HILL	", state: "	PLEASANT HILL, MO	" },
  { id: "KPUX", name: "	PUEBLO	", state: "	PUEBLO, CO	" },
  { id: "KDVN", name: "	DAVENPORT	", state: "	QUAD CITIES, IA	" },
  { id: "KUDX", name: "	NEW UNDERWOOD	", state: "	RAPID CITY, SD	" },
  { id: "KRIW", name: "	RIVERTON	", state: "	RIVERTON, WY	" },
  { id: "KSGF", name: "	SPRINGFIELD	", state: "	SPRINGFIELD, MO	" },
  { id: "KLSX", name: "	WELDON SPRING	", state: "	ST. LOUIS, MO	" },
  { id: "KFSD", name: "	SIOUX FALLS	", state: "	SIOUX FALLS, IA	" },
  { id: "KTWX", name: "	TOPEKA	", state: "	TOPEKA, KS	" },
  { id: "KICT", name: "	WICHITA	", state: "	WICHITA, KS	" },
  { id: "KVWX", name: "	OWENSVILLE	", state: "	PADUCAH, KY	" },
  { id: "KLTX", name: "	SHALLOTTE	", state: "	WILMINGTON, NC	" },
  { id: "KCCX", name: "	STATE COLLEGE	", state: "	STATE COLLEGE/CENTRAL, PA	" },
  { id: "KLWX", name: "	STERLING	", state: "	STERLING, VA	" },
  { id: "KFCX", name: "	ROANOKE	", state: "	BLACKSBURG/ROANOKE, VA	" },
  { id: "KRAX", name: "	CLAYTON	", state: "	RALEIGH/DURHAM, NC	" },
  { id: "KGYX", name: "	GRAY	", state: "	PORTLAND, ME	" },
  { id: "KDIX", name: "	FORT DIX	", state: "	MT HOLLY/PHILADELPHIA, PA	" },
  { id: "KPBZ", name: "	CORAOPOLIS	", state: "	PITTSBURGH, PA	" },
  { id: "KAKQ", name: "	WAKEFIELD	", state: "	WAKEFIELD, VA	" },
  { id: "KMHX", name: "	NEWPORT	", state: "	MOREHEAD CITY, NC	" },
  { id: "KGSP", name: "	GREER	", state: "	GREER/GREENVILLE/SPRTBG, SC	" },
  { id: "KILN", name: "	WILMINGTON	", state: "	WILMINGTON/CINCINNATI, OH	" },
  { id: "KCLE", name: "	CLEVELAND	", state: "	CLEVELAND, OH	" },
  { id: "KCAE", name: "	WEST COLUMBIA	", state: "	COLUMBIA, SC	" },
  { id: "KBGM", name: "	BINGHAMTON	", state: "	BINGHAMTON, NY	" },
  { id: "KENX", name: "	EAST BERNE	", state: "	ALBANY, NY	" },
  { id: "KBUF", name: "	BUFFALO	", state: "	BUFFALO, NY	" },
  { id: "KCXX", name: "	COLCHESTER	", state: "	BURLINGTON, VT	" },
  { id: "KCBW", name: "	HOULTON	", state: "	CARIBOU, ME	" },
  { id: "KBOX", name: "	TAUNTON	", state: "	BOSTON /TAUNTON, MA	" },
  { id: "KOKX", name: "	UPTON	", state: "	NEW YORK CITY, NY	" },
  { id: "KCLX", name: "	GRAYS	", state: "	CHARLESTON, SC	" },
  { id: "KRLX", name: "	CHARLESTON	", state: "	CHARLESTON, WV	" },
  { id: "KBRO", name: "	BROWNSVILLE	", state: "	BROWNSVILLE, TX	" },
  { id: "KABX", name: "	ALBUQUERQUE	", state: "	ALBUQUERQUE, NM	" },
  { id: "KAMA", name: "	AMARILLO	", state: "	AMARILLO, TX	" },
  { id: "KFFC", name: "	PEACHTREE CITY	", state: "	PEACHTREE CITY/ATLANTA, GA	" },
  { id: "KEWX", name: "	NEW BRAUNFELS	", state: "	SAN ANTONIO, TX	" },
  { id: "KBMX", name: "	ALABASTER	", state: "	BIRMINGHAM, AL	" },
  { id: "KCRP", name: "	CORPUS CHRISTI	", state: "	CORPUS CHRISTI, TX	" },
  { id: "KFWS", name: "	FORT WORTH	", state: "	DALLAS / FT. WORTH, TX	" },
  { id: "KEPZ", name: "	SANTA TERESA	", state: "	EL PASO, TX	" },
  { id: "KHGX", name: "	DICKINSON	", state: "	HOUSTON/ GALVESTON, TX	" },
  { id: "KJAX", name: "	JACKSONVILLE	", state: "	JACKSONVILLE, FL	" },
  { id: "KBYX", name: "	BOCA CHICA KEY	", state: "	KEY WEST, FL	" },
  { id: "KMRX", name: "	MORRISTOWN	", state: "	MORRISTOWN/KNOXVILLE, TN	" },
  { id: "KLBB", name: "	LUBBOCK	", state: "	LUBBOCK, TX	" },
  { id: "KLZK", name: "	NORTH LITTLE ROCK	", state: "	LITTLE ROCK, AR	" },
  { id: "KLCH", name: "	LAKE CHARLES	", state: "	LAKE CHARLES, LA	" },
  { id: "KOHX", name: "	OLD HICKORY	", state: "	NASHVILLE, TN	" },
  { id: "KMLB", name: "	MELBOURNE	", state: "	MELBOURNE, FL	" },
  { id: "KNQA", name: "	MILLINGTON	", state: "	MEMPHIS, TN	" },
  { id: "KAMX", name: "	MIAMI	", state: "	MIAMI, FL	" },
  { id: "KMAF", name: "	MIDLAND	", state: "	MIDLAND/ODESSA, TX	" },
  { id: "KTLX", name: "	OKLAHOMA CITY	", state: "	NORMAN, OK	" },
  { id: "KHTX", name: "	HYTOP	", state: "	HUNTSVILLE, AL	" },
  { id: "KMOB", name: "	MOBILE	", state: "	MOBILE, AL	" },
  { id: "KTLH", name: "	TALLAHASSEE	", state: "	TALLAHASSEE, FL	" },
  { id: "KTBW", name: "	RUSKIN	", state: "	TAMPA BAY AREA, FL	" },
  { id: "KSJT", name: "	SAN ANGELO	", state: "	SAN ANGELO, TX	" },
  { id: "KINX", name: "	INOLA	", state: "	TULSA, OK	" },
  { id: "KSRX", name: "	CHAFFEE RIDGE	", state: "	TULSA, OK	" },
  { id: "KDGX", name: "	BRANDON	", state: "	JACKSON, MS	" },
  { id: "KSHV", name: "	SHREVEPORT	", state: "	SHREVEPORT, LA	" },
  { id: "KHDC", name: "	HAMMOND	", state: "	NEW ORLEANS/SLIDELL, LA	" },
  { id: "KLGX", name: "	LANGLEY HILL	", state: "	SEATTLE / TACOMA, WA	" },
  { id: "KYUX", name: "	YUMA	", state: "	PHOENIX, AZ	" },
  { id: "KEMX", name: "	TUCSON	", state: "	TUCSON, AZ	" },
  { id: "KOTX", name: "	SPOKANE	", state: "	SPOKANE, WA	" },
  { id: "KNKX", name: "	SAN DIEGO	", state: "	SAN DIEGO, CA	" },
  { id: "KMUX", name: "	LOS GATOS	", state: "	MONTEREY/SAN FRANCISCO, CA	" },
  { id: "KHNX", name: "	HANFORD	", state: "	SAN JOAQUIN/HANFORD, CA	" },
  { id: "KSOX", name: "	SANTA ANA MOUNTAINS	", state: "	SAN DIEGO, CA	" },
  { id: "KATX", name: "	EVERETT	", state: "	SEATTLE / TACOMA, WA	" },
  { id: "KIWA", name: "	PHOENIX	", state: "	PHOENIX, AZ	" },
  { id: "KRTX", name: "	PORTLAND	", state: "	PORTLAND, OR	" },
  { id: "KSFX", name: "	SPRINGFIELD	", state: "	POCATELLO, ID	" },
  { id: "KRGX", name: "	NIXON	", state: "	RENO, NV	" },
  { id: "KDAX", name: "	DAVIS	", state: "	SACRAMENTO, CA	" },
  { id: "KMTX", name: "	SALT LAKE CITY	", state: "	SALT LAKE CITY, UT	" },
  { id: "KPDT", name: "	PENDLETON	", state: "	PENDLETON, OR	" },
  { id: "KMSX", name: "	MISSOULA	", state: "	MISSOULA, MT	" },
  { id: "KESX", name: "	LAS VEGAS	", state: "	LAS VEGAS, NV	" },
  { id: "KVTX", name: "	LOS ANGELES	", state: "	LOS ANGELES, CA	" },
  { id: "KMAX", name: "	MEDFORD	", state: "	MEDFORD, OR	" },
  { id: "KFSX", name: "	FLAGSTAFF	", state: "	FLAGSTAFF, AZ	" },
  { id: "KGGW", name: "	GLASGOW	", state: "	GLASGOW, MT	" },
  { id: "KLRX", name: "	ELKO	", state: "	ELKO, NV	" },
  { id: "KBHX", name: "	EUREKA	", state: "	EUREKA, CA	" },
  { id: "KTFX", name: "	GREAT FALLS	", state: "	GREAT FALLS, MT	" },
  { id: "KCBX", name: "	BOISE	", state: "	BOISE, ID	" },
  { id: "KBLX", name: "	BILLINGS	", state: "	BILLINGS, MT	" },
  { id: "KICX", name: "	CEDAR CITY	", state: "	SALT LAKE CITY, UT	" },
  { id: "PABC", name: "	ANCHORAGE	", state: "	ANCHORAGE, AK	" },
  { id: "PAPD", name: "	FAIRBANKS	", state: "	FAIRBANKS, AK	" },
  { id: "PHKM", name: "	HONOLULU	", state: "	HONOLULU, HI	" },
  { id: "PAHG", name: "	ANCHORAGE	", state: "	ANCHORAGE, AK	" },
  { id: "PAKC", name: "	ANCHORAGE	", state: "	ANCHORAGE, AK	" },
  { id: "PAIH", name: "	ANCHORAGE	", state: "	ANCHORAGE, AK	" },
  { id: "PHMO", name: "	HONOLULU	", state: "	HONOLULU, HI	" },
  { id: "PAEC", name: "	FAIRBANKS	", state: "	FAIRBANKS, AK	" },
  { id: "TJUA", name: "	SAN JUAN	", state: "	SAN JUAN, PR	" },
  { id: "PACG", name: "	JUNEAU	", state: "	JUNEAU, AK	" },
  { id: "PHKI", name: "	HONOLULU	", state: "	HONOLULU, HI	" },
  { id: "PHWA", name: "	HONOLULU	", state: "	HONOLULU, HI	" },
  { id: "KFDR", name: "	NORMAN	", state: "	NORMAN, OK	" },
  { id: "PGUA", name: "	AGANA	", state: "	GUAM	" },
  { id: "KBBX", name: "	SACRAMENTO	", state: "	SACRAMENTO, CA	" },
  { id: "KFDX", name: "	ALBUQUERQUE	", state: "	ALBUQUERQUE, NM	" },
  { id: "KGWX", name: "	JACKSON	", state: "	JACKSON, MS	" },
  { id: "KDOX", name: "	WAKEFIELD	", state: "	WAKEFIELD, VA	" },
  { id: "KDYX", name: "	SAN ANGELO	", state: "	SAN ANGELO, TX	" },
  { id: "KEYX", name: "	LAS VEGAS	", state: "	LAS VEGAS, NV	" },
  { id: "KEVX", name: "	MOBILE	", state: "	MOBILE, AL	" },
  { id: "KHPX", name: "	PADUCAH	", state: "	PADUCAH, KY	" },
  { id: "KGRK", name: "	FORT WORTH	", state: "	DALLAS / FT. WORTH, TX	" },
  { id: "KTYX", name: "	SOUTH BURLINGTON	", state: "	BURLINGTON, VT	" },
  { id: "KPOE", name: "	LAKE CHARLES	", state: "	LAKE CHARLES, LA	" },
  { id: "KEOX", name: "	TALLAHASSEE	", state: "	TALLAHASSEE, FL	" },
  { id: "KHDX", name: "	SANTA TERESA	", state: "	EL PASO, TX	" },
  { id: "KDFX", name: "	NEW BRAUNFELS	", state: "	SAN ANTONIO, TX	" },
  { id: "KMXX", name: "	ALABASTER	", state: "	BIRMINGHAM, AL	" },
  { id: "KMBX", name: "	BISMARCK	", state: "	BISMARCK, ND	" },
  { id: "KVAX", name: "	JACKSONVILLE	", state: "	JACKSONVILLE, FL	" },
  { id: "KJGX", name: "	PEACHTREE CITY	", state: "	PEACHTREE CITY/ATLANTA, GA	" },
  { id: "KVNX", name: "	NORMAN	", state: "	NORMAN, OK	" },
  { id: "KABX", name: "	ALBUQUERQUE	", state: "	ALBUQUERQUE, NM	" },
  { id: "KFDX", name: "	CANNON AFB	", state: "	ALBUQUERQUE, NM	" },
  { id: "PAHG", name: "	KENAI FAA	", state: "	ANCHORAGE, AK	" },
  { id: "PABC", name: "	BETHEL FAA	", state: "	ANCHORAGE, AK	" },
  { id: "PAKC", name: "	KING SALMON FAA	", state: "	ANCHORAGE, AK	" },
  { id: "PAIH", name: "	MIDDLETON ISLAND	", state: "	ANCHORAGE, AK	" },
  { id: "PAPD", name: "	FAIRBANKS FAA	", state: "	FAIRBANKS, AK	" },
  { id: "PAEC", name: "	NOME FAA	", state: "	FAIRBANKS, AK	" },
  { id: "KAKQ", name: "	NORFOLK	", state: "	WAKEFIELD, VA	" },
  { id: "KDOX", name: "	DOVER AFB	", state: "	WAKEFIELD, VA	" },
  { id: "KBIS", name: "	BISMARCK	", state: "	BISMARCK, ND	" },
  { id: "KMBX", name: "	MINOT AFB	", state: "	BISMARCK, ND	" },
  { id: "KBMX", name: "	BIRMINGHAM	", state: "	ALABASTER, AL	" },
  { id: "KMXX", name: "	MAXWELL AFB	", state: "	ALABASTER, AL	" },
  { id: "KCXX", name: "	BURLINGTON	", state: "	COLCHESTER, VT	" },
  { id: "KTYX", name: "	FT DRUM	", state: "	SOUTH BURLINGTON, VT	" },
  { id: "KEPZ", name: "	EL PASO	", state: "	SANTA TERESA, NM	" },
  { id: "KHDX", name: "	EL PASO	", state: "	SANTA TERESA, NM	" },
  { id: "KEWX", name: "	AUSTIN/SAN ANTONIO	", state: "	NEW BRAUNFELS, TX	" },
  { id: "KDFX", name: "	LAUGHLIN AFB	", state: "	NEW BRAUNFELS, TX	" },
  { id: "KFFC", name: "	ATLANTA	", state: "	PEACHTREE CITY, GA	" },
  { id: "KJGX", name: "	ROBINS AFB	", state: "	PEACHTREE CITY, GA	" },
  { id: "KFWS", name: "	DALLAS/FT WORTH	", state: "	FORT WORTH, TX	" },
  { id: "KGRK", name: "	FT CAVAZOS	", state: "	FORT WORTH, TX	" },
  { id: "PHKI", name: "	SOUTH KAUAI	", state: "	HONOLULU, HI	" },
  { id: "PHWA", name: "	SOUTH SHORE FAA	", state: "	HONOLULU, HI	" },
  { id: "PHMO", name: "	MOLOKAI FAA	", state: "	HONOLULU, HI	" },
  { id: "PHKM", name: "	KAMUELA/KOHALA APT	", state: "	HONOLULU, HI	" },
  { id: "KGWX", name: "	COLUMBUS AFB	", state: "	JACKSON, MS	" },
  { id: "KDGX", name: "	JACKSON/BRANDON, MS	", state: "	BRANDON, MS	" },
  { id: "KJAX", name: "	JACKSONVILLE	", state: "	JACKSONVILLE, FL	" },
  { id: "KVAX", name: "	MOODY AFB	", state: "	JACKSONVILLE, FL	" },
  { id: "KLCH", name: "	LAKE CHARLES	", state: "	LAKE CHARLES, LA	" },
  { id: "KPOE", name: "	FT JOHNSON	", state: "	LAKE CHARLES, LA	" },
  { id: "KMOB", name: "	MOBILE	", state: "	MOBILE, AL	" },
  { id: "KEVX", name: "	EGLIN AFB	", state: "	MOBILE, AL	" },
  { id: "KTLX", name: "	NORMAN	", state: "	OKLAHOMA CITY, OK	" },
  { id: "KFDR", name: "	ALTUS AFB	", state: "	NORMAN, OK	" },
  { id: "KVNX", name: "	VANCE AFB	", state: "	NORMAN, OK	" },
  { id: "KPAH", name: "	PADUCAH	", state: "	PADUCAH, KY	" },
  { id: "KHPX", name: "	FT CAMPBELL	", state: "	PADUCAH, KY	" },
  { id: "KVWX", name: "	EVANSVILLE, IN	", state: "	OWENSVILLE, IN	" },
  { id: "KIWA", name: "	PHOENIX	", state: "	PHOENIX, AZ	" },
  { id: "KYUX", name: "	YUMA	", state: "	YUMA, AZ	" },
  { id: "KATX", name: "	SEATTLE	", state: "	EVERETT, WA	" },
  { id: "KLGX", name: "	LANGLEY HILL (NW WASHINGTON)	", state: "	LANGLEY HILL, WA	" },
  { id: "KNKX", name: "	SAN DIEGO	", state: "	SAN DIEGO, CA	" },
  { id: "KSOX", name: "	SANTA ANA MTS	", state: "	SANTA ANA MOUNTAINS, CA	" },
  { id: "KSJT", name: "	SAN ANGELO	", state: "	SAN ANGELO, TX	" },
  { id: "KDYX", name: "	DYESS AFB	", state: "	SAN ANGELO, TX	" },
  { id: "KICX", name: "	CEDAR CITY	", state: "	CEDAR CITY, UT	" },
  { id: "KMTX", name: "	SALT LAKE CITY	", state: "	SALT LAKE CITY, UT	" },
  { id: "KDAX", name: "	SACRAMENTO	", state: "	DAVIS, CA	" },
  { id: "KBBX", name: "	BEALE AFB	", state: "	SACRAMENTO, CA	" },
  { id: "KTLH", name: "	TALLAHASSEE	", state: "	TALLAHASSEE, FL	" },
  { id: "KEOX", name: "	FT NOVOSEL	", state: "	TALLAHASSEE, FL	" },
  { id: "KINX", name: "	TULSA	", state: "	INOLA, OK	" },
  { id: "KSRX", name: "	WESTERN ARKANSAS	", state: "	CHAFFEE RIDGE, AR	" },
  { id: "KESX", name: "	LAS VEGAS	", state: "	LAS VEGAS, NV	" },
  { id: "KEYX", name: "	EDWARDS AFB	", state: "	LAS VEGAS, NV	" },
]
// RadarMap.js

// 2. Initialize map
const map = L.map('radar-map', {
  center: [39.8283, -98.5795],
  zoom: 5,
  attributionControl: false
});

// 3. Base layers
const lightBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
});
const darkBase = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 4. National Reflectivity overlay (added by default)
const proxyUrl = 'https://jolly-math-3a60.accounts-millernj.workers.dev/proxy';
const nationalReflectivity = L.tileLayer.wms(proxyUrl, {
  layers: 'nexrad-n0r',
  format: 'image/png',
  transparent: true,
  attribution: 'National Reflectivity'
}).addTo(map);

// 5. Alert priority weights
const ALERT_PRIORITY = [
  { regex: /tornado warning/i, weight: 10 },
  { regex: /severe thunderstorm warning/i, weight: 9 },
  { regex: /flood warning/i, weight: 8 },
  { regex: /winter storm warning/i, weight: 7 },
  { regex: /watch/i, weight: 6 },
  { regex: /advisory/i, weight: 5 },
  { regex: /statement/i, weight: 1 },
  { regex: /.*/, weight: 0 }
];
function getAlertWeight(event) {
  for (let p of ALERT_PRIORITY) if (p.regex.test(event)) return p.weight;
  return 0;
}

// 6. Alerts overlay (no per-feature popups)
const alertsLayer = L.geoJSON(null, {
  style: f => ({
    color: getAlertColor(f.properties.event),
    fillColor: getAlertColor(f.properties.event),
    fillOpacity: 0.2,
    weight: 2
  })
}).addTo(map);

// 7. Color mapping
function getAlertColor(event) {
  const e = event.toLowerCase();
  if (e.includes('tornado')) return '#ff0000';
  if (e.includes('severe storm')) return '#ff8000';
  if (e.includes('flood')) return '#0000ff';
  if (e.includes('freeze')) return '#00ffff';
  if (e.includes('warning')) return '#cc0000';
  if (e.includes('watch')) return '#ffcc00';
  return '#888888';
}

// 8. Fetch and render alerts with prioritization
function fetchAlertsData() {
  fetch('https://api.weather.gov/alerts/active')
    .then(r => r.json())
    .then(data => {
      alertsLayer.clearLayers();
      data.features.sort((a, b) => getAlertWeight(a.properties.event) - getAlertWeight(b.properties.event));
      data.features.forEach(f => alertsLayer.addData(f));
    })
    .catch(console.error);
}
fetchAlertsData();
setInterval(fetchAlertsData, 10 * 60 * 1000);

// 9. Aggregated popup on click
map.on('click', e => {
  const hits = alertsLayer.getLayers().filter(layer => layer.getBounds().contains(e.latlng));
  if (!hits.length) return;
  const html = hits.map(layer => {
    const p = layer.feature.properties;
    return `<strong>${p.event}</strong><br>` +
           `${p.areaDesc}<br>` +
           `Effective: ${new Date(p.effective).toLocaleString()}<br>` +
           `${p.description}<hr>`;
  }).join('');
  L.popup()
    .setLatLng(e.latlng)
    .setContent(html)
    .openOn(map);
});

// 10. Layers control
const layersControl = L.control.layers(
  { 'Light Mode': lightBase, 'Dark Mode': darkBase },
  { 'National Reflectivity': nationalReflectivity, 'Alerts': alertsLayer },
  { collapsed: false }
).addTo(map);

// 11. Radar station products (unchanged)
const radarProducts = [
  { id: 'sr_bref', name: 'Super‑Res Reflectivity' },
  { id: 'sr_bvel', name: 'Super‑Res Velocity' },
  { id: 'bdhc',   name: 'Hydrometeor Classification' },
  { id: 'boha',   name: '1‑hr Precip Accumulation' },
  { id: 'bdsa',   name: 'Storm Total Precipitation' }
];
let productLayers = {};

function populateStationSelect() {
  const sel = document.getElementById('radar-select');
  staticStations.slice().sort((a, b) => a.name.localeCompare(b.name))
    .forEach(s => {
      const o = document.createElement('option');
      o.value = s.id;
      o.text = `${s.name} (${s.id}) – ${s.state}`;
      sel.appendChild(o);
    });
}
populateStationSelect();

function updateStationProducts(id) {
  Object.values(productLayers).forEach(l => {
    map.removeLayer(l);
    layersControl.removeLayer(l);
  });
  productLayers = {};
  if (!id) return;
  const ws = id.toLowerCase();
  const url = `https://opengeo.ncep.noaa.gov/geoserver/${ws}/ows?service=WMS&request=GetCapabilities&version=1.3.0`;
  fetch(url)
    .then(r => r.text())
    .then(xmlStr => {
      const xml = new DOMParser().parseFromString(xmlStr, 'application/xml');
      const names = Array.from(xml.getElementsByTagName('Name')).map(n => n.textContent);
      radarProducts.forEach(prod => {
        const layerName = `${ws}_${prod.id}`;
        if (names.includes(layerName)) {
          const ly = L.tileLayer.wms(`https://opengeo.ncep.noaa.gov/geoserver/${ws}/ows`, {
            layers: layerName,
            format: 'image/png',
            transparent: true,
            attribution: `${prod.name} @ ${id}`
          });
          productLayers[prod.id] = ly;
          layersControl.addOverlay(ly, prod.name);
        }
      });
    })
    .catch(console.error);
}

// 12. On location-ready: center map and refresh alerts only
//    No default station selection; user chooses manually
document.addEventListener('location-ready', () => {
  const { latitude, longitude } = currentLocation;
  map.setView([latitude, longitude], 7);
  fetchAlertsData();
});

// 13. User-triggered station selection
//    Show chosen station's layers when user picks a station
document.getElementById('radar-select').addEventListener('change', e => {
  updateStationProducts(e.target.value);
});

// 14. FAQ modal logic (unchanged)
const helpIcon = document.getElementById('radar-help'),
      faqModal = document.getElementById('faq-modal'),
      faqClose = document.getElementById('faq-close');
if (helpIcon && faqModal && faqClose) {
  helpIcon.addEventListener('click', () => faqModal.style.display = 'block');
  faqClose.addEventListener('click', () => faqModal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === faqModal) faqModal.style.display = 'none'; });
}
