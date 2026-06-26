// Zero-dependency test runner for the Wanderlines core. Run: node test/core.test.mjs
import {
  haversineKm, groundCoveredKm, daysBetween, journeyStats,
  kmToMi, formatDistance, THEMES, THEME_ORDER, REQUIRED_TOKENS, STOP_KINDS,
} from "../src/core.mjs";
import { JOURNEYS } from "../src/data.mjs";
import { icon, ICON_PATHS, VEHICLES, STOP_ICON } from "../src/icons.mjs";

let passed = 0, failed = 0;
function ok(name, cond) {
  if (cond) { passed++; console.log("  \x1b[32m✓\x1b[0m " + name); }
  else { failed++; console.log("  \x1b[31m✗ " + name + "\x1b[0m"); }
}
const near = (a, b, tol) => Math.abs(a - b) <= tol;

console.log("\nWanderlines core\n");

// distance
const LON = [-0.13, 51.51], PAR = [2.35, 48.86];
ok("haversine London→Paris ≈ 344 km", near(haversineKm(LON, PAR), 344, 6));
ok("haversine symmetric", near(haversineKm(LON, PAR), haversineKm(PAR, LON), 0.001));
ok("haversine identical = 0", haversineKm(LON, LON) === 0);
ok("groundCovered sums legs", groundCoveredKm([{ lon: -0.13, lat: 51.51 }, { lon: 2.35, lat: 48.86 }, { lon: 12.5, lat: 41.9 }])
  === Math.round(haversineKm(LON, PAR) + haversineKm(PAR, [12.5, 41.9])));
ok("groundCovered single = 0", groundCoveredKm([{ lon: 1, lat: 1 }]) === 0);

// units (miles is the default)
ok("kmToMi 100 → 62", kmToMi(100) === 62);
ok("formatDistance defaults to miles", formatDistance(848).unit === "mi" && formatDistance(848).value === "527");
ok("formatDistance km keeps km", formatDistance(848, "km").unit === "km" && formatDistance(848, "km").value === "848");

// days inclusive
ok("daysBetween Feb 3–24 = 22", daysBetween("2024-02-03", "2024-02-24") === 22);
ok("daysBetween same day = 1", daysBetween("2024-02-03", "2024-02-03") === 1);
ok("daysBetween missing = 0", daysBetween("2024-02-03", "") === 0);

// stats over seed
const s = journeyStats(JOURNEYS[0]);            // default miles
ok("SE Asia distance in miles by default", s.distance.unit === "mi");
ok("SE Asia 3 stops / 22 days / 2 travellers", s.stops === 3 && s.days === 22 && s.travellers === 2);
ok("journeyStats honours km", journeyStats(JOURNEYS[0], "km").distance.unit === "km");

// themes
ok("exactly 6 vibes", Object.keys(THEMES).length === 6 && THEME_ORDER.length === 6);
let tokensOk = true, fontsOk = true;
for (const id of THEME_ORDER) {
  for (const tok of REQUIRED_TOKENS) if (!(tok in THEMES[id])) tokensOk = false;
  if (!THEMES[id]["--font-display"] || THEMES[id]["--font-display"] === THEMES[id]["--font"]) {
    // disco/retro/etc. must have a *distinct* display font (the bug we fixed)
    if (id !== "earthy") fontsOk = false; // earthy intentionally shares Georgia family
  }
}
ok("every vibe defines every required token", tokensOk);
ok("each vibe has a distinct display font", fontsOk);
ok("disco title font is Monoton", THEMES.disco["--font-display"].includes("Monoton"));

// icons (no emoji — our own line set)
ok("9 vehicles, each with a path", VEHICLES.length === 9 && VEHICLES.every((v) => ICON_PATHS[v]));
ok("6 stop kinds map to icons", STOP_KINDS.every((k) => ICON_PATHS[STOP_ICON[k]]));
ok("icon() returns an <svg>", icon("plane", 20).startsWith("<svg") && icon("plane").includes("currentColor"));
ok("no emoji leaked into icon paths", !/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(Object.values(ICON_PATHS).join("")));

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
