// Wanderlines web slice — the Journeys log, rendered from real shared core logic.
import { THEMES, THEME_ORDER, STOP_KINDS, VEHICLES, journeyStats } from "./core.mjs";
import { JOURNEYS, THEME_META } from "./data.mjs";

const KEY = "wl_theme";

function applyTheme(id) {
  const tokens = THEMES[id] || THEMES.retro;
  const root = document.documentElement;
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v);
  root.dataset.theme = id;
  try { localStorage.setItem(KEY, id); } catch {}
  renderThemeBar(id);
}

function renderThemeBar(active) {
  const bar = document.getElementById("themebar");
  bar.innerHTML = THEME_ORDER.map((id) => {
    const t = THEMES[id];
    return `<button class="chip ${id === active ? "on" : ""}" data-t="${id}">
      <span class="sw" style="background:${t["--accent"]}"></span>${THEME_META[id]}</button>`;
  }).join("");
  bar.querySelectorAll("button").forEach((b) => (b.onclick = () => applyTheme(b.dataset.t)));
}

function stars(n) {
  return `<span class="rate">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;
}

function journeyCard(j) {
  const s = journeyStats(j);
  const veh = (j.modes || []).map((m) => VEHICLES[m] || "").join(" ");
  const chips = j.stops
    .map((st, i) => `<span class="stop"><b>${i + 1}</b>${STOP_KINDS[st.kind] || "📍"} ${st.name}</span>`)
    .join("");
  return `<article class="card">
    <header><h2>${j.name}</h2>${j.review?.rating ? stars(j.review.rating) : ""}</header>
    <div class="meta">${j.start} – ${j.end}${veh ? " · " + veh : ""}</div>
    <div class="stats">
      <div><b>${s.km.toLocaleString()}</b><span>km covered</span></div>
      <div><b>${s.stops}</b><span>stops</span></div>
      <div><b>${s.days}</b><span>days</span></div>
      <div><b>${s.travellers}</b><span>travellers</span></div>
    </div>
    <div class="stops">${chips}</div>
    ${j.review?.highlight ? `<div class="hl">“${j.review.highlight}”</div>` : ""}
  </article>`;
}

function render() {
  document.getElementById("journeys").innerHTML = JOURNEYS.map(journeyCard).join("");
}

let saved = "retro";
try { saved = localStorage.getItem(KEY) || "retro"; } catch {}
applyTheme(saved);
render();
