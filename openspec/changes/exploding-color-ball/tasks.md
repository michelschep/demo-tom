## 1. Project scaffold

- [x] 1.1 Create `index.html` with p5.js CDN script tag and a `<script src="sketch.js">` reference
- [x] 1.2 Create an empty `sketch.js` with `setup()` and `draw()` stubs

## 2. Canvas and ball

- [x] 2.1 In `setup()`: create a full-window canvas (`windowWidth × windowHeight`), set `colorMode(HSB)`, store ball position at centre
- [x] 2.2 In `draw()`: when state is `idle`, draw the ball as a filled circle at its centre position

## 3. Particle system

- [x] 3.1 Define a `Particle` class/object factory with properties: `x`, `y`, `vx`, `vy`, `hue`, `alpha`, `size`
- [x] 3.2 Implement `Particle.update()`: apply gravity (+=0.15), apply friction (*=0.97), move by velocity, decay alpha
- [x] 3.3 Implement `Particle.draw()`: render a filled circle using HSB colour with current alpha
- [x] 3.4 In `draw()`: when state is `exploding`, update and draw all particles; remove dead ones (alpha ≤ 0)
- [x] 3.5 When particle array empties, transition state back to `idle` (ball respawns)

## 4. Explosion trigger

- [x] 4.1 Implement `triggerExplosion()`: spawn 80–120 particles at ball centre with random burst velocities and random hues; set state to `exploding`
- [x] 4.2 Wire `mousePressed()` to call `triggerExplosion()` only when state is `idle`
- [x] 4.3 Wire `keyPressed()` to call `triggerExplosion()` only when state is `idle`

## 5. Sound

- [x] 5.1 Initialise a module-level `AudioContext` variable (not created until first gesture)
- [x] 5.2 Implement `playBoom()`: create/resume `AudioContext`, connect an `OscillatorNode` (type `sine`, start freq 120 Hz sweeping down) through a `GainNode` that decays to 0 over 0.25 s
- [x] 5.3 Call `playBoom()` inside `triggerExplosion()`

## 6. Polish and verification

- [x] 6.1 Verify no p5 reserved names used as variables (`width`, `height`, `color`, `fill`, `stroke`, `random`, `map`, `key`, etc.)
- [x] 6.2 Open browser console — confirm zero errors on load and on explosion
- [ ] 6.3 Click at least 3 times and confirm ball respawns each time and sound plays
