var numsControl, noiseScaleControl, stepsControl, alkoholControl, bitterControl, seedControl;

 // fallback/default
var brugerFarve = "#000000";
var farveInput = 3;
var labelCount = 1;
var navnInput = "Cloud Gazing";
var stilInput = "West Coast IPA";
var clInput = "44";
var alkoholInput = "6.2";

function setupControls() {

  // Tekst
  const navnControl = document.getElementById("navn");
  navnControl.addEventListener("sl-input", () => {
    navnInput = navnControl.value || "";
  });

  const stilControl = document.getElementById("stil");
  stilControl.addEventListener("sl-input", () => {
    stilInput = stilControl.value || "";
  });

  const clControl = document.getElementById("cl");
  clControl.addEventListener("sl-input", () => {
    clInput = clControl.value || "";
  });

  alkoholControl = document.getElementById("alkohol");
  alkoholControl.addEventListener("sl-input", () => {
    alkoholInput = parseFloat(alkoholControl.value || 0);
    if (!isNaN(alkoholInput)) {
      var mappedNums = map(alkoholInput, 0, 20, Number(numsControl.min), Number(numsControl.max));
      numsControl.value = constrain(mappedNums, Number(numsControl.min), Number(numsControl.max));
      nums = Number(numsControl.value);

      // Steps
      var mappedSteps = map(alkoholInput, 0, 20, Number(stepsControl.min), Number(stepsControl.max));
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
    getColors();
    newPattern();
  });

  const updateControl = document.getElementById("update");
  updateControl.addEventListener("click", () => {
    newPattern();
  });

  const ImgControl = document.getElementById("nytImg");
  ImgControl.addEventListener("click", () => {
    getImg();
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