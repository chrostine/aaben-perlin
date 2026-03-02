var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums = 200;
var noiseScale = 200;
var steps = 800;
var batchSize = 50;
var currentIndex = 0;
var maxTotalOps = 5000000;

function calcBatchSize() {
  var totalOps = nums * steps * 3;
  var framesNeeded = max(totalOps / maxTotalOps * 60, 1);
  return max(ceil(nums / framesNeeded), 1);
}

function initParticles() {
  particles_a = [];
  particles_b = [];
  particles_c = [];
  for (var i = 0; i < nums; i++) {
    particles_a[i] = new Particle(random(0, width), random(0, height));
    particles_b[i] = new Particle(random(0, width), random(0, height));
    particles_c[i] = new Particle(random(0, width), random(0, height));
  }
}

function newPattern() {
    background(bg);
    currentIndex = 0;
    batchSize = calcBatchSize();
    initParticles();
    loop();
}

function Particle(x, y) {
  this.dir = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.pos = createVector(x, y);
  this.speed = 0.4;
  this.alive = true;

  this.move = function () {
    if (!this.alive) return;

    var angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI * noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);

    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.alive = false;
    }
  }

  this.display = function (r) {
    if (!this.alive) return;
    strokeWeight(r);
    point(this.pos.x, this.pos.y);
  }
}