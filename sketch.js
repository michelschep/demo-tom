let ballX, ballY;
let state = 'idle'; // 'idle' | 'exploding'
let particles = [];

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
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballX = width / 2;
  ballY = height / 2;
}
