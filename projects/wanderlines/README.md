# Wanderlines

A **travel log** (not a planner) for trips you've already taken — the ground you
covered, the routes you travelled, how it went, and cute, shareable maps. Built to
stay **100% free** for everyone: no paid APIs, no backend required for the slice.

This is the materialized real project. The full clickable design prototype lives at
[`/prototype/index.html`](../../prototype/index.html).

## Run

```bash
node serve.mjs            # serves http://127.0.0.1:5173
```

No dependencies, no install step.

## Test

```bash
node test/core.test.mjs   # exits non-zero on failure
```

## Layout

| Path | What |
| --- | --- |
| `src/core.mjs` | Dependency-free domain logic (distance, **miles/km**, stats, the six vibes incl. distinct display fonts). Shared by UI **and** tests. |
| `src/icons.mjs` | Our own single-stroke line-icons (no emoji) — vehicles + stop kinds. |
| `src/data.mjs` | Seed journeys (mocked, no backend). |
| `src/app.mjs` | The Journeys-log web slice + vibe switcher + miles/km toggle. |
| `styles.css` | Fully token-driven — every colour/font is a CSS variable the app swaps per vibe. |
| `test/core.test.mjs` | Zero-dep assertions over the core. |
| `serve.mjs` | Tiny static server. |

## Scope of this slice

The Journeys log: real journey cards whose **ground-covered (miles by default), day
count, stops, rating, vehicles, and kind-tagged stops** are rendered with our own
line-icons and computed by the same `core.mjs` the tests verify — plus the six
token-driven vibes (retro / sleek / disco / earthy / cute / classic), each with a
distinct title font, switchable live, and a **Miles ⇄ Kilometres** toggle.

The full interactive app (world map, journey detail, journal with photos, etc.) lives
in the design preview at [`/prototype/index.html`](../../prototype/index.html); this
project is the clean, tested core of that design.
