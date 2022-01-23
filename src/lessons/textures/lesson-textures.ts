import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
import gsap from 'gsap';

export function texturesInit(): void {
    /**
     * Textures
     * Native way to load textures
     */
    // const image = new Image();
    // image.addEventListener('load', () => {
    //     const texture = new THREE.Texture(image);
    //     console.log(texture);
    // });
    // image.src = '/textures/door/basecolor.jpg';

    /**
     * Debugging
     */
    const gui = new GUI();
    const debugObject = {
        color: 0xff0000,
        spin: () => {
            gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
        }
    };

    const colorFolder = gui.addFolder('Color');

    colorFolder.addColor(debugObject, 'color')
        .onChange(() => {
            material.color.set(debugObject.color);
        });

    const animationFolder = gui.addFolder('Animation');

    animationFolder.add(debugObject, 'spin');

    // 3440 x 1440

    /**
     * Base
     */
    const canvas = document.querySelector('[data-three]') as HTMLCanvasElement;

    const scene = new THREE.Scene();

    /**
     * Object
     */
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onProgress = (url, loaded, total) => {
        console.log(url, loaded, total);
    };

    const textureLoader = new THREE.TextureLoader(loadingManager);
    const colorTexture = textureLoader.load('/textures/minecraft.png');

    colorTexture.center.x = 0.5;
    colorTexture.center.y = 0.5;

    colorTexture.rotation = Math.PI / 4;
    // colorTexture.minFilter = THREE.NearestFilter;
    colorTexture.generateMipmaps = false;
    colorTexture.minFilter = THREE.NearestFilter;
    colorTexture.magFilter = THREE.NearestFilter;

    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

    console.log(geometry.attributes.uv);

    const material = new THREE.MeshBasicMaterial({ map: colorTexture });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const positionFolder = gui.addFolder('Position');

    positionFolder.add(mesh.rotation, 'x')
        .min(-3)
        .max(3)
        .step(0.01);
    positionFolder.add(mesh.rotation, 'y')
        .min(-3)
        .max(3)
        .step(0.01);

    const scaleFolder = gui.addFolder('Scale');

    scaleFolder.add(mesh.scale, 'x')
        .min(-3)
        .max(3)
        .step(0.01);
    scaleFolder.add(mesh.scale, 'y')
        .min(-3)
        .max(3)
        .step(0.01);

    const rotationFolder = gui.addFolder('Rotation');

    rotationFolder.add(mesh.rotation, 'x')
        .min(-3)
        .max(3)
        .step(0.01);
    rotationFolder.add(mesh.rotation, 'y')
        .min(-3)
        .max(3)
        .step(0.01);

    const visibilityFolder = gui.addFolder('Visibility');

    visibilityFolder.add(mesh, 'visible');

    const wireframeFolder = gui.addFolder('Wireframe');

    wireframeFolder.add(material, 'wireframe');

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

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
}
