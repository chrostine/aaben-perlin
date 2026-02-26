var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums = 200;
var noiseScale = 200;
var steps = 800;
var batchSize = 50;
var currentIndex = 0;
var maxTotalOps = 5000000;
var baggrundsFarve;


function generateVariation(hexColor) {
  colorMode(HSL, 360, 100, 100);
  let col = color(hexColor);
  let h = hue(col);
  let s = saturation(col);
  let l = lightness(col);
  colorMode(RGB, 255);

  // Hvis farven er mørk, lav en lys baggrund — og omvendt
  let newL;
  if (l < 50) {
    newL = map(farveInput, 3, 100, 85, 95); // lys baggrund
  } else {
    newL = map(farveInput, 3, 100, 15, 5);  // mørk baggrund
  }

  colorMode(HSL, 360, 100, 100);
  let variation = color(h, s, constrain(newL, 0, 100));
  colorMode(RGB, 255);

  return "#" + hex(red(variation),   2)
             + hex(green(variation), 2)
             + hex(blue(variation),  2);
}

/*function generateVariation(hexColor) {
  colorMode(RGB, 255);
  let col = color(hexColor);

  // Beregn luminans for at afgøre om vi blander mod hvid eller sort
  let r = red(col) / 255;
  let g = green(col) / 255;
  let b = blue(col) / 255;
  let luminans = 0.299 * r + 0.587 * g + 0.114 * b;

  let blendTarget = luminans < 0.5 ? color(255, 255, 255) : color(0, 0, 0);

  // farveInput (3–100) styrer hvor meget vi blander mod hvid/sort
  let blendAmount = map(farveInput, 3, 100, 0.2, 0.7);

  let variation = lerpColor(col, blendTarget, blendAmount);

  return "#" + hex(red(variation),   2)
             + hex(green(variation), 2)
             + hex(blue(variation),  2);
}*/

function setup() {
  cnv = createCanvas(1210, 708);
  cnv.parent("main");

  baggrundsFarve = generateVariation(brugerFarve);
  background(baggrundsFarve);

  setupControls();
  initParticles();
}

function draw() {
  var end = min(currentIndex + batchSize, nums);

  for (var i = currentIndex; i < end; i++) {
    var radius = map(i, 0, nums, 1, 2);

    for (var s = 0; s < steps; s++) {
      stroke(brugerFarve);
      particles_a[i].move();
      particles_a[i].display(radius);
    }
  }

  currentIndex += batchSize;
  if (currentIndex >= nums) {
    noLoop();
  }
}

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
  baggrundsFarve = generateVariation(brugerFarve);
  background(baggrundsFarve);
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