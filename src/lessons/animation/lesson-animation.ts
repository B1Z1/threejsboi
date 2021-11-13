import gsap from 'gsap';
import * as THREE from 'three';

export function animationInit(): void {
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
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1);

    camera.position.z = 6;
    scene.add(camera);

    // Renderer
    const canvas = document.querySelector('[data-three]') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });

    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);

    const render = () => {
        renderer.render(scene, camera);
    };

    // Native animations
    // const frameRateValue = deltaTimeFrameRate();
    // const frameRateValue = clockFrameRate();
    //
    // const tick = () => {
    //     const value = frameRateValue();
    //
    //     // When delta time frame rate using, use adding value
    //     // cube.rotation.y += 0.001 * value;
    //     // When clock is using, do not add the value to parameter. Just equal it
    //     // cube.rotation.y = value * Math.PI * 2;
    //     camera.position.y = Math.sin(value);
    //     camera.position.x = Math.cos(value);
    //     camera.lookAt(cube.position);
    //
    //     render();
    //
    //     window.requestAnimationFrame(() => tick());
    // };
    //
    // tick();

    gsap.to(cube.position, { duration: 1, delay: 2, x: 2 });

    const tick = () => {
        render();
        window.requestAnimationFrame(() => tick());
    };

    tick();
}

function deltaTimeFrameRate(): () => number {
    let time = Date.now();

    return () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - time;

        time = currentTime;

        return deltaTime;
    };
}

function clockFrameRate(): () => number {
    const clock = new THREE.Clock();

    return () => {
        return clock.getElapsedTime();
    };
}
