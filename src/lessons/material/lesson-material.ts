import gsap from 'gsap';
import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function materialInit(): void {
	/**
	 * Debugging
	 */
	const gui = new GUI();
	const debugObject = {
		color: 0xff0000,
		spin: () => {
			gsap.to(torusMesh.rotation, { duration: 1, y: torusMesh.rotation.y + Math.PI * 2 });
		}
	};

	// For MeshNormalMaterial doesn't work
	// const colorFolder = gui.addFolder('Color');
	//
	// colorFolder.addColor(debugObject, 'color')
	//     .onChange(() => {
	//         material.color.set(debugObject.color);
	//     });

	const animationFolder = gui.addFolder('Animation');

	animationFolder.add(debugObject, 'spin');

	/**
	 * Base
	 */
	const canvas = document.querySelector('[data-three]') as HTMLCanvasElement;

	const scene = new THREE.Scene();

	/**
	 * Loader
	 */
	const loader = new THREE.TextureLoader();
	const cubeLoader = new THREE.CubeTextureLoader();

	const doorTexture = loader.load('/textures/door/color.jpg');
	const doorAmbientOcclusionTexture = loader.load('/textures/door/ambientOcclusion.jpg');
	const doorDisplacementMap = loader.load('/textures/door/height.jpg');
	const doorMetalnessMap = loader.load('/textures/door/metalness.jpg');
	const doorRoughnessMap = loader.load('/textures/door/roughness.jpg');
	const doorNormalMap = loader.load('/textures/door/normal.jpg');
	const doorAlphaMap = loader.load('/textures/door/alpha.jpg');
	const matcapTexture = loader.load('/textures/matcaps/8.png');
	const gradientTexture = loader.load('/textures/gradients/5.jpg');

	gradientTexture.minFilter = THREE.NearestFilter;
	gradientTexture.magFilter = THREE.NearestFilter;
	gradientTexture.generateMipmaps = false;

	const environmentMapTexture = cubeLoader.load([
		'/textures/environmentMaps/3/px.jpg',
		'/textures/environmentMaps/3/nx.jpg',
		'/textures/environmentMaps/3/py.jpg',
		'/textures/environmentMaps/3/ny.jpg',
		'/textures/environmentMaps/3/pz.jpg',
		'/textures/environmentMaps/3/nz.jpg'
	]);

	/**
	 * Object
	 */
	const sphere = new THREE.SphereGeometry(.5, 16, 16);
	const plane = new THREE.PlaneGeometry(1, 1, 100, 100);
	const torus = new THREE.TorusGeometry(.3, .2, 16, 32);

	// const material = new THREE.MeshBasicMaterial({ map: doorTexture });
	// material.alphaMap = alphaTexture;
	// material.transparent = true;
	// material.side = THREE.DoubleSide;

	// const material = new THREE.MeshNormalMaterial();

	// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

	// const material = new THREE.MeshDepthMaterial();

	// const material = new THREE.MeshLambertMaterial({ color: 'white' });

	// const material = new THREE.MeshPhongMaterial();

	// const material = new THREE.MeshToonMaterial();
	// material.gradientMap = gradientTexture;

	/**
	 * Beautiful doors
	 */
		// const material = new THREE.MeshStandardMaterial();
		//
		// material.map = doorTexture;
		//
		// material.aoMap = doorAmbientOcclusionTexture;
		// // material.aoMapIntensity = 2;
		//
		// material.displacementMap = doorDisplacementMap;
		// material.displacementScale = .05;
		//
		// material.normalMap = doorNormalMap;
		//
		// material.metalnessMap = doorMetalnessMap;
		// material.roughnessMap = doorRoughnessMap;
		//
		// material.alphaMap = doorAlphaMap;
		// material.transparent = true;

	const material = new THREE.MeshStandardMaterial();

	material.metalness = 1;
	material.roughness = 0;
	material.envMap = environmentMapTexture;

	const sphereMesh = new THREE.Mesh(sphere, material);
	const planeMesh = new THREE.Mesh(plane, material);
	const torusMesh = new THREE.Mesh(torus, material);

	sphereMesh.position.setX(-1.5);
	torusMesh.position.setX(1.5);

	scene.add(sphereMesh);
	scene.add(planeMesh);
	scene.add(torusMesh);

	const materialFolder = gui.addFolder('Material');

	// materialFolder.add(material, 'metalness').min(0).max(1).step(.0001);
	// materialFolder.add(material, 'roughness').min(0).max(1).step(.0001);
	// materialFolder.add(material, 'aoMapIntensity').min(0).max(10).step(.1);
	// materialFolder.add(material, 'displacementScale').min(0).max(1).step(.0001);

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
	 * Light
	 */
	const ambientLight = new THREE.AmbientLight(0xffffff, .5);

	// scene.add(ambientLight);

	const pointLight = new THREE.PointLight(0xffffff, .5);

	pointLight.position.x = 2;
	pointLight.position.y = 3;
	pointLight.position.z = 4;

	scene.add(pointLight);

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

		// torusMesh.rotation.set(elapsedTime, 0, elapsedTime);
		// sphereMesh.rotation.set(elapsedTime, 0, elapsedTime);
		// planeMesh.rotation.set(elapsedTime, 0, elapsedTime);

		// Update controls
		controls.update();

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
}
