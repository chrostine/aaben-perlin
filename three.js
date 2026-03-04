import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.114.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.114.0/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.114.0/examples/jsm/loaders/OBJLoader.js";
import { RGBELoader } from "https://cdn.jsdelivr.net/npm/three@0.114.0/examples/jsm/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const container = document.getElementById("threejs");
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.useLegacyLights = true;
container.appendChild(renderer.domElement);

let texture = null;
let p5CanvasEl = null;
let ctx = null;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 15;
controls.maxDistance = 15;
controls.enablePan = false;
controls.enableZoom = false;

// HDR environment
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const hdrLoader = new RGBELoader();
hdrLoader.load("studio_small_08_4k.hdr", function (envMap) {
	envMap.mapping = THREE.EquirectangularReflectionMapping;
	scene.environment = envMap;

	const bgGeometry = new THREE.SphereGeometry(500, 64, 64);
	const bgMaterial = new THREE.MeshBasicMaterial({ map: envMap, side: THREE.BackSide });
	scene.add(new THREE.Mesh(bgGeometry, bgMaterial));
});

// Metal can
const metalMaterial = new THREE.MeshStandardMaterial({
	color: 0xaaaaaa,
	metalness: 0.9,
	roughness: 0.2,
});

const objLoader = new OBJLoader();
objLoader.load("can.obj", function (object) {
	object.traverse(function (child) {
		if (child.isMesh) child.material = metalMaterial;
	});
	object.position.sub(new THREE.Vector3(0, 6.25, 0));
	object.scale.set(92, 82, 92);
	scene.add(object);
});

// Label using p5 canvas as texture
const labelMaterial = new THREE.MeshStandardMaterial({
	map: texture,
	transparent: true,
	metalness: 0.1,
	roughness: 0.8,
	envMapIntensity: 0.4,
	side: THREE.FrontSide,
	depthWrite: false,
});

const labelGeometry = new THREE.CylinderGeometry(3.05, 3.05, 9, 64, 1, true);
const label = new THREE.Mesh(labelGeometry, labelMaterial);
label.position.y = 0;
scene.add(label);

scene.add(new THREE.AmbientLight(0xffffff, 1.0));
camera.position.z = 15;

// resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
	requestAnimationFrame(animate);

	if (!p5CanvasEl) {
		p5CanvasEl = document.querySelector("#label canvas");
		if (p5CanvasEl) {
			const offscreen = document.createElement("canvas");
			offscreen.width = Math.round(p5CanvasEl.width / 0.98);
			offscreen.height = p5CanvasEl.height;
			ctx = offscreen.getContext("2d");

			texture = new THREE.CanvasTexture(offscreen);
			texture.encoding = THREE.sRGBEncoding;
			texture.generateMipmaps = false;
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.wrapS = THREE.ClampToEdgeWrapping;
			texture.wrapT = THREE.ClampToEdgeWrapping;
			labelMaterial.map = texture;
			labelMaterial.needsUpdate = true;
		}
	}

	if (texture && ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(p5CanvasEl, 0, 0);
		texture.needsUpdate = true;
	}

	controls.update();
	renderer.render(scene, camera);
}
animate();
