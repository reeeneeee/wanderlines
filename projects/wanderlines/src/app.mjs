// Wanderlines web slice: the Journeys log, rendered from real shared core logic.
import { THEMES, THEME_ORDER, journeyStats } from "./core.mjs";
import { icon, STOP_ICON } from "./icons.mjs";
import { JOURNEYS, THEME_LABELS } from "./data.mjs";

const TKEY = "wl_theme", UKEY = "wl_units";
let units = (() => { try { return localStorage.getItem(UKEY) || "mi"; } catch { return "mi"; } })();

function applyTheme(id) {
  const tokens = THEMES[id] || THEMES.retro;
  const root = document.documentElement;
  for (const [k, v] of Object.entries(tokens)) root.style.setProperty(k, v);
  root.dataset.theme = id;
  try { localStorage.setItem(TKEY, id); } catch {}
  renderControls(id);
}

function renderControls(activeTheme) {
  document.getElementById("themebar").innerHTML = THEME_ORDER.map((id) =>
    `<button class="chip ${id === activeTheme ? "on" : ""}" data-t="${id}">
       <span class="sw" style="background:${THEMES[id]["--accent"]}"></span>${THEME_LABELS[id]}</button>`
  ).join("");
  document.querySelectorAll("#themebar button").forEach((b) => (b.onclick = () => applyTheme(b.dataset.t)));
  document.querySelectorAll("#units button").forEach((b) =>
    (b.classList.toggle("on", b.dataset.u === units), (b.onclick = () => {
      units = b.dataset.u; try { localStorage.setItem(UKEY, units); } catch {}
      renderControls(activeTheme); render();
    })));
}

const stars = (n) => `<span class="rate">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></span>`;

function journeyCard(j) {
  const s = journeyStats(j, units);
  const veh = (j.modes || []).map((m) => `<span class="vic">${icon(m, 16)}</span>`).join("");
  const chips = j.stops.map((st, i) =>
    `<span class="stop"><b>${i + 1}</b><span class="kic">${icon(STOP_ICON[st.kind] || "pin", 14)}</span>${st.name}</span>`).join("");
  return `<article class="card">
    <header><h2>${j.name}</h2>${j.review?.rating ? stars(j.review.rating) : ""}</header>
    <div class="meta">${j.start} – ${j.end} ${veh}</div>
    <div class="stats">
      <div><b>${s.distance.value}</b><span>${s.distance.unit} covered</span></div>
      <div><b>${s.stops}</b><span>stops</span></div>
      <div><b>${s.days}</b><span>days</span></div>
      <div><b>${s.travelers}</b><span>travelers</span></div>
    </div>
    <div class="stops">${chips}</div>
    ${j.review?.highlight ? `<div class="hl">“${j.review.highlight}”</div>` : ""}
  </article>`;
}

function render() {
  document.getElementById("journeys").innerHTML = JOURNEYS.map(journeyCard).join("");
}

let savedTheme = "retro";
try { savedTheme = localStorage.getItem(TKEY) || "retro"; } catch {}
applyTheme(savedTheme);
render();
