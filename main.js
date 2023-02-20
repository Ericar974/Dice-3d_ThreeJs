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
let texture_ft = new THREE.TextureLoader().load('img/1.png');
let texture_bk = new THREE.TextureLoader().load('img/2.png');
let texture_up = new THREE.TextureLoader().load('img/3.png');
let texture_dn = new THREE.TextureLoader().load('img/4.png');
let texture_rt = new THREE.TextureLoader().load('img/5.png');
let texture_lf = new THREE.TextureLoader().load('img/6.png');

let materialArray = [
	new THREE.MeshBasicMaterial({map: texture_rt}),
	new THREE.MeshBasicMaterial({map: texture_lf}),
	new THREE.MeshBasicMaterial({map: texture_up}),
	new THREE.MeshBasicMaterial({map: texture_dn}),
	new THREE.MeshBasicMaterial({map: texture_ft}),
	new THREE.MeshBasicMaterial({map: texture_bk})
];

let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
var cube = new THREE.Mesh( geometry, materialArray );
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
	const number = pickNumber()

	if(number == 1) {
		texture_ft = new THREE.TextureLoader().load('img/1.png');
	}
	if(number == 2) {
		texture_ft = new THREE.TextureLoader().load('img/2.png');
	}
	if(number == 3) {
		texture_ft = new THREE.TextureLoader().load('img/3.png');
	}
	if(number == 4) {
		texture_ft = new THREE.TextureLoader().load('img/4.png');
	}
	if(number == 5) {
		texture_ft = new THREE.TextureLoader().load('img/5.png');
	}
	if(number == 6) {
		texture_ft = new THREE.TextureLoader().load('img/6.png');
	}
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

