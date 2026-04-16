let ballX, ballY;
let state = 'idle'; // 'idle' | 'exploding'
let particles = [];
let audioCtx = null;

class Particle {
  constructor(x, y, vx, vy, hue, alphaVal, sz) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.hue = hue;
    this.alpha = alphaVal;
    this.sz = sz;
  }

  update() {
    this.vy += 0.15;       // gravity
    this.vx *= 0.97;       // friction
    this.vy *= 0.97;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;       // fade out
  }

  draw() {
    noStroke();
    fill(this.hue, 100, 100, this.alpha);
    circle(this.x, this.y, this.sz);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  ballX = width / 2;
  ballY = height / 2;
}

function draw() {
  background(0);
  if (state === 'idle') {
    fill(0, 0, 100);
    noStroke();
    circle(ballX, ballY, 60);
  } else if (state === 'exploding') {
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    if (particles.length === 0) {
      ballX = width / 2;
      ballY = height / 2;
      state = 'idle';
    }
  }
}

function playBoom() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);

  gain.gain.setValueAtTime(1, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.25);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

function triggerExplosion() {
  const count = Math.floor(Math.random() * 41) + 80; // 80–120
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 1;
    const hue = Math.random() * 360;
    const sz = Math.random() * 10 + 4;
    particles.push(new Particle(
      ballX, ballY,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      hue, 255, sz
    ));
  }
  state = 'exploding';
}

function mousePressed() {
  if (state === 'idle') triggerExplosion();
}

function keyPressed() {
  if (state === 'idle') triggerExplosion();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballX = width / 2;
  ballY = height / 2;
}
