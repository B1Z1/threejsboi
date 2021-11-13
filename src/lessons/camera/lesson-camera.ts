import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function cameraInit() {
    const size = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    // Scene
    const scene = new THREE.Scene();

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'red' });
    const cube = new THREE.Mesh(
        geometry,
        material
    );
    scene.add(cube);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
    // const aspectRatio = size.width / size.height;
    // const camera = new THREE.OrthographicCamera(-1 * aspectRatio, aspectRatio, 1, -1, 0.1, 100);

    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    const canvas = document.querySelector('[data-three]') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });

    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);

    // Control
    const orbitControl = new OrbitControls(camera, renderer.domElement);

    orbitControl.enableDamping = true;
    orbitControl.keys = {
        LEFT: 'ArrowLeft', //left arrow
        UP: 'ArrowUp', // up arrow
        RIGHT: 'ArrowRight', // right arrow
        BOTTOM: 'ArrowDown' // down arrow
    };
    // @ts-ignore
    orbitControl.listenToKeyEvents(window);
    orbitControl.enableKeys = true;

    const render = () => {
        renderer.render(scene, camera);
    };

    const tick = () => {
        orbitControl.update();

        render();

        window.requestAnimationFrame(() => tick());
    };

    tick();
}
