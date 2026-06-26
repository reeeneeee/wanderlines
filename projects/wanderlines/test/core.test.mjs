// Zero-dependency test runner for the Wanderlines core. Run: node test/core.test.mjs
import {
  haversineKm, groundCoveredKm, daysBetween, journeyStats,
  THEMES, THEME_ORDER, REQUIRED_TOKENS, VEHICLES, STOP_KINDS,
} from "../src/core.mjs";
import { JOURNEYS } from "../src/data.mjs";

let passed = 0, failed = 0;
function ok(name, cond) {
  if (cond) { passed++; console.log("  \x1b[32m✓\x1b[0m " + name); }
  else { failed++; console.log("  \x1b[31m✗ " + name + "\x1b[0m"); }
}
function near(a, b, tol) { return Math.abs(a - b) <= tol; }

console.log("\nWanderlines core\n");

// London -> Paris is a well-known ~344 km great-circle hop.
const LON = [-0.13, 51.51], PAR = [2.35, 48.86];
ok("haversine London→Paris ≈ 344 km", near(haversineKm(LON, PAR), 344, 6));
ok("haversine is symmetric", near(haversineKm(LON, PAR), haversineKm(PAR, LON), 0.001));
ok("haversine of identical points is 0", haversineKm(LON, LON) === 0);

// groundCovered sums the legs of a route.
const stops = [{ lon: -0.13, lat: 51.51 }, { lon: 2.35, lat: 48.86 }, { lon: 12.5, lat: 41.9 }];
ok("groundCovered sums legs", groundCoveredKm(stops) === Math.round(haversineKm(LON, PAR) + haversineKm(PAR, [12.5, 41.9])));
ok("groundCovered of single stop is 0", groundCoveredKm([{ lon: 1, lat: 1 }]) === 0);
ok("groundCovered of empty is 0", groundCoveredKm([]) === 0);

// daysBetween is inclusive.
ok("daysBetween Feb 3–24 = 22 (inclusive)", daysBetween("2024-02-03", "2024-02-24") === 22);
ok("daysBetween same day = 1", daysBetween("2024-02-03", "2024-02-03") === 1);
ok("daysBetween missing end = 0", daysBetween("2024-02-03", "") === 0);

// journeyStats wires it together for the seed data.
const s1 = journeyStats(JOURNEYS[0]);
ok("SE Asia journey covers > 0 km", s1.km > 0);
ok("SE Asia journey has 3 stops", s1.stops === 3);
ok("SE Asia journey lasts 22 days", s1.days === 22);
ok("SE Asia journey has 2 travellers", s1.travellers === 2);

// Themes are complete and well-formed.
ok("exactly 6 vibes", Object.keys(THEMES).length === 6 && THEME_ORDER.length === 6);
let tokensOk = true;
for (const id of THEME_ORDER) {
  for (const tok of REQUIRED_TOKENS) if (!(tok in THEMES[id])) tokensOk = false;
}
ok("every vibe defines every required token", tokensOk);

// Reference data is present.
ok("9 vehicle types", Object.keys(VEHICLES).length === 9);
ok("water is a loggable stop kind", STOP_KINDS.water === "🌊");

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
