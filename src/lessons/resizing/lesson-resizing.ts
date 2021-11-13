import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function resizingInit() {
    const size = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    window.addEventListener('resize', () => {
        size.width = window.innerWidth;
        size.height = window.innerHeight;

        // Update camera
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();

        // Renderer
        renderer.setSize(size.width, size.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener('dblclick', () => {
        const fullScreenElement = document.fullscreenElement;

        if (!fullScreenElement) {
            canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

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

    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    const canvas = document.querySelector('[data-three]') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    const render = () => {
        renderer.render(scene, camera);
    };

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);

    // Control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const tick = () => {
        controls.update();

        render();

        window.requestAnimationFrame(() => tick());
    };

    tick();
}
