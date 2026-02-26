var numsControl;
var noiseScaleControl;
var stepsControl;
var alkoholControl;
var farveControl;

 // fallback/default
var brugerFarve = "#000000";
var farveInput = 3;

function setupControls() {

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
    var alkohol = parseFloat(alkoholControl.value);
    if (!isNaN(alkohol)) {
      var mapped = map(alkohol, 0, 20, Number(numsControl.min), Number(numsControl.max));
      numsControl.value = constrain(mapped, Number(numsControl.min), Number(numsControl.max));
      nums = Number(numsControl.value);
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