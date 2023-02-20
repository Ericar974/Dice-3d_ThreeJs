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

// randomize number
const pickNumber = () => {
	const diceValues = [1, 2, 3, 4, 5, 6];

	const randomIndex = Math.floor(Math.random() * diceValues.length);

	const randomValue = diceValues[randomIndex];
	console.log(randomValue);
	return randomValue
}

let start = false
let loopingTime = 2400
canvas.addEventListener('click', () => {
	start = true
	pickNumber()
})


// à chaque image : 60fps
const update = (time) => {
	requestAnimationFrame(update)
	if(start){
		if(time < loopingTime){
			cube.rotation.x = time/100;
			cube.rotation.y = time/100;
		}else{	
			cube.rotation.x = 0
			cube.rotation.y = 0
			start = false
			loopingTime = time + 2400
		}
	}
	// Render WebGL Scene
	renderer.render(scene, camera);
	
}
requestAnimationFrame(update)

