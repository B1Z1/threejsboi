import './style.css';
import * as THREE from 'three';

/**
 * Scene
 */
const size = {
	width: window.innerWidth,
	height: window.innerHeight
};
const scene = new THREE.Scene();

/**
 * AxesHelper
 */
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/**
 * Grouping
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'red' })
);
const cube2 = cube1.clone();

cube2.position.set(1, 1, 0);
cube2.material.color.set('blue');

group.add(cube1, cube2);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
camera.position.z = 10;
scene.add(camera);

/**
 * Renderer
 */
const canvas = document.querySelector('[data-three]');
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
});

renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

console.log('Hej');

let i = 0;

function animate() {
	i += 0.01;

	group.rotation.set(i, i, 0);
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
