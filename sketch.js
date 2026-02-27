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

let img_aa_right, img_aa_left, aaben_label;


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

function preload() {
  img_aa_right = loadImage('/assets/aa_right.svg');
  img_aa_left = loadImage('/assets/aa_left.svg');
  aaben_label = loadImage('/assets/aaben_label.png');

}

function setup() {
  cnv = createCanvas(1210, 708);
  cnv.parent("main");

  baggrundsFarve = generateVariation(brugerFarve);
  background(baggrundsFarve);

   // Å logo

  /*image(aaben_label,  0, 0,  width, height, 0, 0, aaben_label.width, aaben_label.height, CONTAIN);

  var h = height / 2;
  var w_left  = h * (img_aa_left.width  / img_aa_left.height);  // bevar aspect ratio
  var w_right = h * (img_aa_right.width / img_aa_right.height);

  image(img_aa_left,  0, height/2 - h/2, w_left,  h);
  image(img_aa_right, width - w_right, height/2 - h/2, w_right, h);*/

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
     // Å logo
    image(aaben_label, 0, 0, width, height, 0, 0, aaben_label.width, aaben_label.height, CONTAIN);
    noLoop();
  }
}

// perlin
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