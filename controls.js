var numsControl;
var noiseScaleControl;
var stepsControl;
var alkoholControl;
var farveControl;
var bitterControl;
var seedControl;

 // fallback/default
var brugerFarve = "#000000";
var farveInput = 3;

var labelCount = 1;
var navnInput = "";

function setupControls() {

  const navnControl = document.getElementById("navn");
  navnControl.addEventListener("sl-input", () => {
    navnInput = navnControl.value || "";
  });

  // color picker
  farveControl = document.getElementById("farve");
  farveControl.addEventListener("sl-change", () => {
    brugerFarve = farveControl.value;
  });

  // ebc
  const colorControl = document.getElementById("ebc");
  colorControl.addEventListener("sl-input", () => {
  farveInput = parseFloat(colorControl.value) || 3;
});

  alkoholControl = document.getElementById("alkohol");
  alkoholControl.addEventListener("sl-input", () => {
    var alkohol = parseFloat(alkoholControl.value || 0);
    if (!isNaN(alkohol)) {
      var mappedNums = map(alkohol, 0, 20, Number(numsControl.min), Number(numsControl.max));
      numsControl.value = constrain(mappedNums, Number(numsControl.min), Number(numsControl.max));
      nums = Number(numsControl.value);

      // Steps
      var mappedSteps = map(alkohol, 0, 20, Number(stepsControl.min), Number(stepsControl.max));
      stepsControl.value = constrain(mappedSteps, Number(stepsControl.min), Number(stepsControl.max));
      steps = Number(stepsControl.value);
    }
  });

  bitterControl = document.getElementById("bitter");
  bitterControl.addEventListener("sl-input", () => {
    var bitter = parseFloat(bitterControl.value);
    if (!isNaN(bitter)) {
      // Map bitter (0-120 IBU) til noiseScale (min-max)
      var mapped = map(bitter, 0, 120, Number(noiseScaleControl.max), Number(noiseScaleControl.min));
      noiseScaleControl.value = constrain(mapped, Number(noiseScaleControl.min), Number(noiseScaleControl.max));
      noiseScale = Number(noiseScaleControl.value);
    }
  });

  numsControl = document.getElementById("nums");
  numsControl.value = nums;
  numsControl.addEventListener("sl-input", () => {
    nums = Number(numsControl.value);
  });

  noiseScaleControl = document.getElementById("noiseScale");
  noiseScaleControl.value = noiseScale;
  noiseScaleControl.addEventListener("sl-input", () => {
    noiseScale = Number(noiseScaleControl.value);
  });

  stepsControl = document.getElementById("steps");
  stepsControl.value = steps;
  stepsControl.addEventListener("sl-input", () => {
    steps = Number(stepsControl.value);
  });

  const createControl = document.getElementById("create");
  createControl.addEventListener("click", () => {
    newPattern();
  });

  const randomizeControl = document.getElementById("randomize");
  randomizeControl.addEventListener("click", () => {
    randomizeParameters();
  });

  const gemControl = document.getElementById("gem");
  gemControl.addEventListener("click", () => {
    var nummer = String(labelCount).padStart(4, "0");
    saveCanvas(cnv, `${navnInput}_label_${nummer}`, "png");
    labelCount++;
  });
}

function randomizeParameters() {
  randomSeed(millis());

  numsControl.value = random(Number(numsControl.min), Number(numsControl.max));
  noiseScaleControl.value = random(Number(noiseScaleControl.min), Number(noiseScaleControl.max));
  stepsControl.value = random(Number(stepsControl.min), Number(stepsControl.max));

  nums = Number(numsControl.value);
  noiseScale = Number(noiseScaleControl.value);
  steps = Number(stepsControl.value);

  console.log({ nums, noiseScale, steps });

  numsControl.dispatchEvent(new CustomEvent("sl-input", { detail: { value: numsControl.value } }));
  noiseScaleControl.dispatchEvent(new CustomEvent("sl-input", { detail: { value: noiseScaleControl.value } }));
  stepsControl.dispatchEvent(new CustomEvent("sl-input", { detail: { value: stepsControl.value } }));

  newPattern();
}