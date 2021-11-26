import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function geometryInit() {
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

    // Positions
    const geometry = new THREE.BufferGeometry();

    // Here is x y z for 3 verticies. Its means, that in 2 row we will get x = 0 y = 1 and z = 0
    // const positionsArray = new Float32Array([
    //     0, 0, 0,
    //     0, 1, 0,
    //     1, 0, 0
    // ]);

    const count = 500;
    const positionsArray = new Float32Array(count * 3 * 3);

    for (let i = 0; i < count * 3 * 3; i++) {
        positionsArray[i] = (Math.random() - .5) * 5;
    }

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

    geometry.setAttribute('position', positionsAttribute);

    // const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
    const mesh = new THREE.Mesh(
        geometry,
        material
    );
    scene.add(mesh);

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
