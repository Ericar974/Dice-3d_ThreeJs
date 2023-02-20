import * as THREE from 'three';

// Setup scene
const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;

// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true, 
	alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1);

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

// cube
const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const cube = new THREE.Mesh( geometry, material );
scene.add(cube);





// à chaque image : 60fps
const update = (time) => {
	requestAnimationFrame(update)

	cube.rotation.x = time / 2000;
	cube.rotation.y = time / 1000;

	// Render WebGL Scene
	renderer.render(scene, camera);
}
requestAnimationFrame(update)

