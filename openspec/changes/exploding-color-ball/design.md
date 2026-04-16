## Context

This is a standalone p5.js sketch — no framework, no build step. It lives in the repo root alongside `index.html`. The target audience is Tom, a Gen-Z viewer with low patience and high expectations. The demo must load instantly and deliver an immediate visual payoff.

Current repo: vanilla JS + p5.js via CDN.

## Goals / Non-Goals

**Goals:**
- Single-page p5.js sketch that works in any modern browser
- Ball that explodes into vivid, randomised particles on click (or keypress)
- Particle physics: initial burst velocity, gravity, air friction, fade-out
- Auditory feedback: a short punchy boom using the Web Audio API (no extra library required)
- Resetable: after the explosion fades the ball reappears so Tom can click again

**Non-Goals:**
- Multiple balls or complex scenes
- Score, timer, or any game mechanics
- Mobile touch handling beyond what a desktop demo needs
- Accessibility or responsive layout

## Decisions

### D1 — Sound: Web Audio API over p5.sound
**Decision:** Use the Web Audio API directly (an `AudioContext` + `OscillatorNode` + `GainNode`) rather than loading p5.sound.

**Rationale:** p5.sound is a large extra CDN load and requires a user-gesture gate that is easy to mis-handle. The Web Audio API is built into every modern browser, has zero load time, and a 150 ms synthetic boom is trivially achievable with a decaying oscillator. Simpler = faster = Tom stays awake.

**Alternative considered:** `<audio>` element with an MP3 — rejected because we'd need a sound asset file.

### D2 — Particle count and palette
**Decision:** 80–120 particles per explosion; colours drawn from a vivid HSB palette (full saturation, high brightness) using `random(360)` hue.

**Rationale:** Enough particles to look spectacular on a 1080p screen without dropping frames. HSB random hue guarantees no dull colours.

### D3 — Particle lifecycle
**Decision:** Each particle has velocity, gravity (0.15 px/frame²), friction (0.97 multiplier), and an alpha that decays linearly from 255 to 0 over ~90 frames (~1.5 s at 60 fps). When all particles are dead the ball respawns.

**Rationale:** 1.5 s is long enough to look satisfying, short enough that Tom doesn't get bored waiting for the reset.

### D4 — Render mode
**Decision:** Default p5 2D canvas (no WebGL).

**Rationale:** WebGL adds complexity. The 2D renderer handles 120 filled circles at 60 fps without any trouble.

## Risks / Trade-offs

- [AudioContext auto-play policy] Browsers block audio until a user gesture. → Mitigation: Initialise (and resume) the `AudioContext` inside the mouse/key handler, not at sketch setup.
- [p5 reserved name collisions] Variables named `width`, `height`, `color`, etc. will shadow p5 globals and cause silent bugs. → Mitigation: Use distinctive local names (`ballX`, `ballY`, `particles`, `hue`, etc.) and review the lessons-learned list before writing code.
- [Frame-rate jitter on low-end machines] Particle count is fixed, not frame-rate-adaptive. → Accept for a demo; 120 particles is well within budget.
