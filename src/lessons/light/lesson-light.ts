import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function lightInit(): void {
	/**
	 * Base
	 */
	const canvas = document.querySelector('[data-three]') as HTMLCanvasElement;

	const scene = new THREE.Scene();

	/**
	 * Object
	 */
	const box = new THREE.BoxGeometry(1, 1, 1);
	const sphere = new THREE.SphereBufferGeometry(.5, 32, 32);
	const torus = new THREE.TorusBufferGeometry(.3, .2, 16, 32);
	const plane = new THREE.PlaneGeometry(10, 10);

	const material = new THREE.MeshStandardMaterial();
	material.side = THREE.DoubleSide;
	material.roughness = .3;

	const boxMesh = new THREE.Mesh(box, material);
	const sphereMesh = new THREE.Mesh(sphere, material);
	const torusMesh = new THREE.Mesh(torus, material);
	const planeMesh = new THREE.Mesh(plane, material);

	boxMesh.position.setX(1.5);
	planeMesh.position.setY(-1.5);
	planeMesh.rotation.set(1.5 * Math.PI, 0, 0);
	sphereMesh.position.setX(-1.5);

	scene.add(boxMesh);
	scene.add(sphereMesh);
	scene.add(torusMesh);
	scene.add(planeMesh);

	/**
	 * Lights
	 */
	// const ambientLight = new THREE.AmbientLight(0xffffff, .5);
	//
	// scene.add(ambientLight);
	//
	const directionalLight = new THREE.DirectionalLight(0xffffff, .4);

	directionalLight.position.set(1, 0, 0);
	//
	// scene.add(directionalLight);
	//
	const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x00ffff, .5);

	scene.add(hemisphereLight);
	//
	// const pointLight = new THREE.PointLight(0xffffff, 1);
	//
	// pointLight.position.set(1, -1, 0);
	//
	// scene.add(pointLight);

	// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
	//
	// rectAreaLight.position.set(0, 1, 0)
	// rectAreaLight.lookAt(boxMesh.position);
	//
	// scene.add(rectAreaLight);

	const spotLight = new THREE.SpotLight(0x78ff00, .5, 10, Math.PI, .25, 1);

	spotLight.position.set(0, 3, 0);
	spotLight.target.lookAt(boxMesh.position);

	scene.add(spotLight);
	scene.add(spotLight.target);

	/**
	 * Helpers
	 */
	const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, .2);

	scene.add(directionalLightHelper);

	const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, .2);

	scene.add(hemisphereLightHelper);

	const spotLightHelper = new THREE.SpotLightHelper(spotLight);

	scene.add(spotLightHelper);

	/**
	 * Sizes
	 */
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	/**
	 * Camera
	 */
	const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
	camera.position.z = 3;
	scene.add(camera);

	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Animate
	 */
	const clock = new THREE.Clock();

	const tick = () => {
		const elapsedTime = clock.getElapsedTime();

		boxMesh.rotation.set(0, elapsedTime * .5, elapsedTime * .5);
		torusMesh.rotation.set(elapsedTime * .5, elapsedTime * .5, 0);

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
}
