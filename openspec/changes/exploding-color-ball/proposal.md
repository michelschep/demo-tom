## Why

Tom needs a jaw-dropping p5.js demo — right now. An exploding ball that bursts into colorful particles with sound will grab attention instantly and keep even the most impatient Gen-Z viewer engaged.

## What Changes

- Add a new `sketch.js` (or `index.html` + `sketch.js`) with a p5.js sketch featuring an exploding ball
- Ball sits in the center of the canvas and can be triggered to explode
- Explosion spawns dozens of colorful particles that fly outward with physics (gravity, friction)
- Each particle has a unique random color from a vivid palette
- A short, punchy explosion sound plays on detonation (using p5.sound or the Web Audio API)
- Click (or any key) re-arms the ball so it can explode again

## Capabilities

### New Capabilities

- `exploding-ball`: Full-screen p5.js sketch with a clickable ball that explodes into colorful flying particles with an accompanying sound effect

### Modified Capabilities

<!-- none -->

## Impact

- New files: `index.html`, `sketch.js`
- Runtime dependency: p5.js + p5.sound via CDN
- No build step required — served with `npx serve .`
