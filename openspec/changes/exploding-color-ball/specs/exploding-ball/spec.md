## ADDED Requirements

### Requirement: Ball renders on canvas
The sketch SHALL display a single circular ball centred on the canvas at startup, ready to be triggered.

#### Scenario: Ball visible on load
- **WHEN** the page loads
- **THEN** a solid circular ball is visible at the centre of the canvas

### Requirement: Explosion triggered by user interaction
The sketch SHALL explode the ball into particles when the user clicks the canvas or presses any key.

#### Scenario: Click triggers explosion
- **WHEN** the user clicks anywhere on the canvas while the ball is present
- **THEN** the ball disappears and particles burst outward from its centre

#### Scenario: Keypress triggers explosion
- **WHEN** the user presses any key while the ball is present
- **THEN** the ball disappears and particles burst outward from its centre

#### Scenario: Interaction ignored during explosion
- **WHEN** the user clicks or presses a key while an explosion is already in progress
- **THEN** no second explosion is triggered

### Requirement: Particles have randomised vivid colours
Each particle SHALL be assigned a unique random colour from the full HSB hue range at full saturation and high brightness.

#### Scenario: Particle colours are vivid
- **WHEN** an explosion occurs
- **THEN** each particle has a visually distinct, fully-saturated colour

### Requirement: Particles follow physics
Each particle SHALL move according to initial burst velocity, gravity, and friction until its alpha reaches zero.

#### Scenario: Particles fly outward and fall
- **WHEN** the explosion starts
- **THEN** particles accelerate outward, arc downward due to gravity, and slow due to friction

#### Scenario: Particles fade out
- **WHEN** a particle has been alive for its full lifetime (~90 frames)
- **THEN** its alpha has decayed to zero and it is removed from the scene

### Requirement: Ball reappears after explosion
After all particles have faded, the sketch SHALL respawn the ball at the canvas centre so the interaction can be repeated.

#### Scenario: Ball respawns
- **WHEN** the last particle reaches zero alpha
- **THEN** the ball reappears at the canvas centre

### Requirement: Explosion plays a sound
The sketch SHALL play a short, punchy boom sound via the Web Audio API when the explosion is triggered.

#### Scenario: Sound on explosion
- **WHEN** the user triggers an explosion
- **THEN** a brief synthetic boom sound is audible

#### Scenario: Sound respects browser autoplay policy
- **WHEN** the AudioContext is in a suspended state
- **THEN** the sketch resumes it inside the user-gesture handler before playing sound
