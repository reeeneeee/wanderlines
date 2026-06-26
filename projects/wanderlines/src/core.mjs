// Wanderlines — pure, dependency-free domain logic.
// Shared by the web UI (src/app.mjs) and the Node test suite (test/core.test.mjs),
// so the numbers the app shows are the same ones the tests verify.

const R_KM = 6371; // mean Earth radius
const rad = (d) => (d * Math.PI) / 180;

/** Great-circle distance (km) between two [lon, lat] points. */
export function haversineKm(a, b) {
  const [lon1, lat1] = a;
  const [lon2, lat2] = b;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Total ground covered (km, rounded) along a journey's ordered stops. */
export function groundCoveredKm(stops = []) {
  let km = 0;
  for (let i = 1; i < stops.length; i++) {
    km += haversineKm([stops[i - 1].lon, stops[i - 1].lat], [stops[i].lon, stops[i].lat]);
  }
  return Math.round(km);
}

/** Inclusive day count between two YYYY-MM-DD strings (0 if either missing). */
export function daysBetween(start, end) {
  if (!start || !end) return 0;
  const a = new Date(start + "T00:00:00");
  const b = new Date(end + "T00:00:00");
  if (isNaN(a) || isNaN(b)) return 0;
  return Math.max(1, Math.round((b - a) / 86400000) + 1);
}

/** The headline stats for a journey card / detail page. */
export function journeyStats(j) {
  return {
    km: groundCoveredKm(j.stops || []),
    stops: (j.stops || []).length,
    days: daysBetween(j.start, j.end),
    travellers: (j.travelers || []).length,
  };
}

/** Icon for each kind of stop a journey can include (any granularity). */
export const STOP_KINDS = {
  country: "🏳️",
  region: "📍",
  unesco: "🏛️",
  park: "🏞️",
  city: "🏙️",
  water: "🌊",
};

/** The nine ways to get around. */
export const VEHICLES = {
  car: "🚗",
  bus: "🚌",
  train: "🚆",
  walking: "🚶",
  biking: "🚲",
  boat: "⛵",
  horseback: "🐎",
  cruise: "🛳️",
  plane: "✈️",
};

export const REQUIRED_TOKENS = [
  "--ocean", "--land", "--paper", "--ink", "--accent", "--accent2",
  "--c-lived", "--c-visited", "--font", "--font-display",
];

/** Six token-driven vibes. Swapping the active set reskins the whole app. */
export const THEMES = {
  retro: {
    "--ocean": "#edd2a0", "--land": "#39281f", "--paper": "#f8eccf", "--ink": "#2a1d14",
    "--muted": "#9a7e57", "--rule": "#d6a347", "--accent": "#df4d12", "--accent2": "#0c8a6f",
    "--c-lived": "#df4d12", "--c-visited": "#0c8a6f",
    "--font": '"Jost",system-ui,sans-serif', "--font-display": '"Bungee","Jost",sans-serif',
  },
  sleek: {
    "--ocean": "#0e0f12", "--land": "#2c2f36", "--paper": "#16181c", "--ink": "#eef1f5",
    "--muted": "#99a0ac", "--rule": "#33373f", "--accent": "#c4ccd6", "--accent2": "#878f9b",
    "--c-lived": "#d2d8e0", "--c-visited": "#7f8893",
    "--font": '"Inter",system-ui,sans-serif', "--font-display": '"Inter",sans-serif',
  },
  disco: {
    "--ocean": "#16022c", "--land": "#2b0a47", "--paper": "#1d0636", "--ink": "#fdeeff",
    "--muted": "#c79be0", "--rule": "#7a2bd0", "--accent": "#ff2bd6", "--accent2": "#1fe3cb",
    "--c-lived": "#ff2bd6", "--c-visited": "#1fe3cb",
    "--font": '"Righteous",system-ui,sans-serif', "--font-display": '"Righteous",sans-serif',
  },
  earthy: {
    "--ocean": "#dce4d1", "--land": "#3a4a32", "--paper": "#eef0e3", "--ink": "#26301f",
    "--muted": "#7c8a6c", "--rule": "#a8b58f", "--accent": "#5b7a3a", "--accent2": "#a3672f",
    "--c-lived": "#a3672f", "--c-visited": "#5b7a3a",
    "--font": "Georgia,serif", "--font-display": "Georgia,serif",
  },
  cute: {
    "--ocean": "#fdf4f9", "--land": "#ecd9e6", "--paper": "#fdf5fa", "--ink": "#6f5a64",
    "--muted": "#bda4b4", "--rule": "#f0d3e0", "--accent": "#f3a6c6", "--accent2": "#f3d089",
    "--c-lived": "#f1a3c4", "--c-visited": "#eccb84",
    "--font": '"Quicksand",system-ui,sans-serif', "--font-display": '"Quicksand",sans-serif',
  },
  classic: {
    "--ocean": "#ece2cd", "--land": "#dccdab", "--paper": "#f1e8d3", "--ink": "#3a2f25",
    "--muted": "#9a8467", "--rule": "#c3ad84", "--accent": "#a6442e", "--accent2": "#4a5a6a",
    "--c-lived": "#a6442e", "--c-visited": "#4a5a6a",
    "--font": '"EB Garamond",Georgia,serif', "--font-display": '"Caveat",cursive',
  },
};

export const THEME_ORDER = ["retro", "sleek", "disco", "earthy", "cute", "classic"];
