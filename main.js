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

// set color depending on house of player
let color = 0x740001;
let house = 'poufsouffle';

switch (house) {
	case 'griffondor':
		color = 0x740001;
		break;
	case 'serpentard':
		color = 0x1A472A;
		break;
	case 'poufsouffle':
		color = 0xFFED86;
		break;
	case 'serdaigle':
		color = 0x0E1A40;
		break;
	default: 'griffondor'
		color = 0x740001;
		break;
}

let materialArray = [
	new THREE.MeshBasicMaterial({
		map: texture_rt, 
		transparent: true,
		color: color,
	}),
	new THREE.MeshBasicMaterial({
		map: texture_lf, 
		transparent: true,
		color: color,
	}),
	new THREE.MeshBasicMaterial({
		map: texture_up, 
		transparent: true,
		color: color,
	}),
	new THREE.MeshBasicMaterial({
		map: texture_dn, 
		transparent: true,
		color: color,
	}),
	new THREE.MeshBasicMaterial({
		map: texture_ft, 
		transparent: true,
		color: color,
	}),
	new THREE.MeshBasicMaterial({
		map: texture_bk, 
		transparent: true,
		color: color,
	})
];

// apply shaders to all mesh
for (let i = 0; i < materialArray.length; i++) {
	materialArray[i].onBeforeCompile = function ( shader ) {
		const custom_map_fragment = THREE.ShaderChunk.map_fragment.replace(
			`diffuseColor *= sampledDiffuseColor;`,
			`diffuseColor = vec4( mix( diffuse, sampledDiffuseColor.rgb, sampledDiffuseColor.a ), opacity );`
		);
	
		shader.fragmentShader = shader.fragmentShader.replace( '#include <map_fragment>', custom_map_fragment );
	};
}

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
let loopingTime = 100
let timeWhenClick = 0
let count = 0
canvas.addEventListener('click', () => {
	start = true
	const number = pickNumber()
	
	if(number == 1) {
		texture_ft = new THREE.TextureLoader().load('img/1.png');
		materialArray[4].map = texture_ft;
	}
	if(number == 2) {
		texture_ft = new THREE.TextureLoader().load('img/2.png');
		materialArray[4].map = texture_ft;
	}
	if(number == 3) {
		texture_ft = new THREE.TextureLoader().load('img/3.png');
		materialArray[4].map = texture_ft;
	}
	if(number == 4) {
		texture_ft = new THREE.TextureLoader().load('img/4.png');
		materialArray[4].map = texture_ft;
	}
	if(number == 5) {
		texture_ft = new THREE.TextureLoader().load('img/5.png');
		materialArray[4].map = texture_ft;
	}
	if(number == 6) {
		texture_ft = new THREE.TextureLoader().load('img/6.png');
		materialArray[4].map = texture_ft;
	}
})


// à chaque image : 60fps
const update = (time) => {
	requestAnimationFrame(update)
	if(start){
		if(count == loopingTime){
			cube.rotation.x = 0
			cube.rotation.y = 0
			start = false
			timeWhenClick = 0
			count = 0
		}else if(timeWhenClick < loopingTime){
			cube.rotation.x = time/100;
			cube.rotation.y = time/100;
			count++
		}
	}
	// Render WebGL Scene
	renderer.render(scene, camera);
	
}
requestAnimationFrame(update)

