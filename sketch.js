let aaben_label_light;
let aaben_label_dark;
let skrift = "Helvetica";
let darkMode = false;

function preload() {
  aaben_label_light = loadImage('/assets/label_sort.png');
  aaben_label_dark = loadImage('/assets/label_hvid.png');
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
    if(darkMode == false) {
      image(aaben_label_light, 0, 0, width, height, 0, 0, aaben_label_light.width, aaben_label_light.height, CONTAIN);
    } else {
      image(aaben_label_dark, 0, 0, width, height, 0, 0, aaben_label_dark.width, aaben_label_dark.height, CONTAIN);
    }
    
    noLoop();
  }

  // Typografi
  if (darkMode == false){
      fill(0);
  } else {
    fill(255);
  }

  textFont(skrift); // Systemfont aka "Websafe"
  textLeading(32); // linjeafstand

  textSize(75);
  text(navnInput, 1275, 292)
  
  textSize(45);
  text(stilInput, 1275, 355)

  textSize(45);
  text(clInput + " cl / Alc. " + alkoholInput +"% vol.", 1275, 395)

  textSize(30);
  text(beskrivelseInput, 1275, 420, 615, 400)

  textSize(25);
  text(filtreretInput, 1275, 625)
  drawIngredients("Ingredients: " + ingrediensInput, 1275, 675, 610, 400)
}