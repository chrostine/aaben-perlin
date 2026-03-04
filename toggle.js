let visPreview = false;

document.getElementById("previewKnap").addEventListener("click", () => {
	visPreview = !visPreview;
	document.getElementById("label").style.visibility = visPreview ? "hidden" : "visible";
	document.getElementById("label").style.pointerEvents = visPreview ? "none" : "auto";
	document.getElementById("threejs").style.visibility = visPreview ? "visible" : "hidden";
	document.getElementById("threejs").style.pointerEvents = visPreview ? "auto" : "none";
	document.getElementById("previewKnap").textContent = visPreview ? "2D preview" : "3D preview";
});
