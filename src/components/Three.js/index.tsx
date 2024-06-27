/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import nft1 from "./Images/3.svg";
import { createLights } from './helpers/lights';
import { createHelpers } from './helpers/camera';
import { setupGUI } from './helpers/gui';
import { createSphere } from './comp/sphere';
import { createPlane } from './comp/plane';
import * as dat from 'dat.gui';
import { createCube } from './comp/Cube';
import stars from "./Images/stars.jpg"
import { setBackground } from './helpers/background';

interface ThreeSceneProps { }

const ThreeScene: React.FC<ThreeSceneProps> = () => {
    const scene = new THREE.Scene();
    let step = 0;
    // Ref for the mount point of the Three.js scene
    const mount = useRef<HTMLDivElement | null>(null);

    
    // Sizes
    const sizes = {
        width: 600,
        height: 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.height / sizes.width);
    camera.position.z = 5;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 10);
    controls.update();


    setBackground(scene)



    const options = {
        sphereColor: "0xff0000",
        spherewireframe: false,
        speed: 0.01,
        angle: 0.2,
        penumbra: 0,
        intensity: 0.2,
    };

    let gui = new dat.GUI();

    // Create the sphere and plane
    const sphere = createSphere(scene);
    const newPlane = createPlane(scene);
    createCube(scene)
    // set light
    const dLight = createLights(scene);

    // Setup GUI
    setupGUI(gui, sphere, options, dLight);

    // Add lights and helpers
    const { axisHelper, dlightShadowHelper, dLightHelper } = createHelpers(scene, dLight);











    // Mouse movement variables
    const mouseX = useRef(0);
    const mouseY = useRef(0);

    // Animation logic
    const animate = (time: number) => {

        requestAnimationFrame(animate);

        controls.update();

        step += options.speed;
        sphere.position.y = 20 * Math.abs(Math.sin(step));

        dLight.intensity = options.intensity;
        dLightHelper.update();

        renderer.render(scene, camera);
    };

    useEffect(() => {
        if (mount.current) {
            mount.current.appendChild(renderer.domElement);
        }

        const handleMouseMove = (event: MouseEvent) => {
            mouseX.current = (event.clientX / sizes.width) * 2 - 1;
            mouseY.current = -(event.clientY / sizes.height) * 2 + 1;
        };
        const handleTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];
            mouseX.current = (touch.clientX / sizes.width) * 2 - 1;
            mouseY.current = -(touch.clientY / sizes.height) * 2 + 1;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);

        renderer.setAnimationLoop(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            mount.current?.removeChild(renderer.domElement);
        };
    }, [renderer, scene, camera, sphere, sizes.width, sizes.height]);

    return <div ref={mount}></div>;
};

export default ThreeScene;
