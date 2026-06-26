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
| `src/core.mjs` | Dependency-free domain logic (distance, stats, themes). Shared by UI **and** tests. |
| `src/data.mjs` | Seed journeys (mocked, no backend). |
| `src/app.mjs` | The Journeys-log web slice + vibe switcher. |
| `styles.css` | Fully token-driven — every colour/font is a CSS variable the app swaps per vibe. |
| `test/core.test.mjs` | Zero-dep assertions over the core. |
| `serve.mjs` | Tiny static server. |

## Scope of this slice

The Journeys log: real journey cards whose **km-of-ground-covered, day count, and
stops** are computed by the same `core.mjs` the tests verify, plus the six
token-driven vibes (retro / sleek / disco / earthy / cute / classic) switchable live.
