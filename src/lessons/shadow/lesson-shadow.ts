import { GUI } from 'lil-gui';
import {
	AmbientLight,
	Clock,
	DirectionalLight,
	Mesh,
	MeshStandardMaterial, PCFSoftShadowMap,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	SphereGeometry,
	WebGLRenderer
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function shadowInit(): void {
	// Base
	const size = {
		width: window.innerWidth,
		height: window.innerHeight
	}
	const gui = new GUI();
	const canvas = document.querySelector('[data-three]');
	const scene = new Scene();

	// Camera
	const camera = new PerspectiveCamera(
		75,
		size.width / size.height,
		0.1,
		100
	);

	camera.position.set(1, 1, 2);

	scene.add(camera);

	// Lights
	// Ambient Light
	const ambientLight = new AmbientLight(0xffffff, 0.5);

	gui.add(ambientLight, 'intensity')
		.min(0)
		.max(1)
		.step(0.001);

	scene.add(ambientLight);

	// Directional Light
	const directionalLight = new DirectionalLight(0xffffff, 0.5);

	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;

	directionalLight.position.set(2, 2, -1);

	gui.add(directionalLight, 'intensity')
		.min(0)
		.max(1)
		.step(0.001);
	gui.add(directionalLight.position, 'x')
		.min(-5)
		.max(5)
		.step(0.001);
	gui.add(directionalLight.position, 'y')
		.min(-5)
		.max(5)
		.step(0.001);
	gui.add(directionalLight.position, 'z')
		.min(-5)
		.max(5)
		.step(0.001);

	scene.add(directionalLight);

	// Materials
	const material = new MeshStandardMaterial();

	material.roughness = 0.7;

	gui.add(material, 'metalness')
		.min(0)
		.max(1)
		.step(0.001);
	gui.add(material, 'roughness')
		.min(0)
		.max(1)
		.step(0.001);

	const sphere = new Mesh(
		new SphereGeometry(.5, 32, 32),
		material
	);

	sphere.castShadow = true;

	const plane = new Mesh(
		new PlaneGeometry(5, 5),
		material
	);

	plane.receiveShadow = true;
	plane.rotation.set(-Math.PI * .5, 0, 0);
	plane.position.set(0, -.5, 0);

	scene.add(sphere, plane);

	// Renderer
	const renderer = new WebGLRenderer({ canvas: canvas });

	renderer.shadowMap.enabled = true;
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setSize(size.width, size.height);

	renderer.render(scene, camera);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	const clock = new Clock();
	const tick = () => {
		const elapsedTime = clock.getElapsedTime();

		controls.update();

		renderer.render(scene, camera);

		window.requestAnimationFrame(() => tick());
	}

	tick();

	window.addEventListener('resize', () => {
		size.width = window.innerWidth;
		size.height = window.innerHeight;

		camera.aspect = size.width / size.height;
		camera.updateProjectionMatrix();

		renderer.setSize(size.width, size.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});
}