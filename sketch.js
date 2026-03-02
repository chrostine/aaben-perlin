let aaben_label;
let skrift = "Helvetica";


function preload() {
  aaben_label = loadImage('/assets/aaben_label_black.png');
}

function setup() {
  cnv = createCanvas(2420, 1416);
  cnv.parent("label");

  background(bg);

  setupControls();
  initParticles();
  getImg();
}

function draw() {
  var end = min(currentIndex + batchSize, nums);

  for (var i = currentIndex; i < end; i++) {
    var radius = map(i, 0, nums, 6, 10); // 1-10 strtyer tykkelse. Hvordan gør jeg tykkelsen afhængig af længden?

    for (var s = 0; s < steps; s++) {
      stroke(farve1);
      particles_a[i].move();
      particles_a[i].display(map(s,0, steps, radius, 0)); // har tidligere været radius
    }

    for (var s = 0; s < steps; s++) {
      stroke(farve2);
      particles_a[i].move();
      particles_a[i].display(map(s,0, steps, radius, 0)); // har tidligere været radius
    }

        for (var s = 0; s < steps; s++) {
      stroke(farve3);
      particles_a[i].move();
      particles_a[i].display(map(s,0, steps, radius, 0)); // har tidligere været radius
    }
  }

   // baggrunds firkant
  fill(bg);
  noStroke();
  rect(1255, 210, 660, 720)

  currentIndex += batchSize;
  if (currentIndex >= nums) {
    // Å logo
    image(aaben_label, 0, 0, width, height, 0, 0, aaben_label.width, aaben_label.height, CONTAIN);
    noLoop();
  }

  // Typografi
  fill(0);
  textFont(skrift); // Systemfont aka "Websafe"
  textSize(75);
  text(navnInput, 1275, 292)

  textFont(skrift);
  textSize(45);
  text(stilInput, 1275, 355)

  textFont(skrift);
  textSize(45);
  text(clInput + " cl / Alc. " + alkoholInput +"% vol.", 1275, 395)
}
