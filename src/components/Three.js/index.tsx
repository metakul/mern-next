/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import nft1 from "./Images/3.svg";
import { createLights } from './helpers/lights';
import { createHelpers } from './helpers/camera';
// import { setupGUI } from './helpers/gui';
import { createSphere } from './comp/sphere';
import { createPlane } from './comp/plane';
import { createCube } from './comp/Cube';
import { setBackground } from './helpers/background';
import { vector } from './comp/Vector';
import { createPlane2 } from './comp/Plane2';
import WebGL from 'three/addons/capabilities/WebGL.js'
import CreateLine from './comp/Lines';
import CreateText from './comp/Text';
import { InitVr } from './helpers/VrHelper';

interface ThreeSceneProps {
    xrEnabled: boolean
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ xrEnabled }) => {
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

    const raycaster = new THREE.Raycaster()


    if (WebGL.isWebGL2Available()) {
        // Create the sphere and plane
        const newPlane = createPlane(scene);
        // const newPlane2 = createPlane2(scene);
        // newPlane2.position.set(10,10,15)
    }

    const line = CreateLine(scene)

    const { sphere, sphereId } = createSphere(scene);


    // const { cube, cubeId } = createCube(scene)
    // set light
    const dLight = createLights(scene);
    const mousePosition = vector(scene)

    // Setup GUI
    // setupGUI( sphere, options, dLight);

    // Add lights and helpers
    const { axisHelper,dLightHelper } = createHelpers(scene, dLight);


    {/*
    Adding Text
    */}
    CreateText(scene);

    {/*
            Init Vr*/}
    InitVr(renderer, xrEnabled)

    // Animation logic
    const animate = (time: number) => {


        controls.update();

        step += options.speed;
        sphere.position.y = 20 * Math.abs(Math.sin(step));

        dLight.intensity = options.intensity;
        dLightHelper.update();

        raycaster.setFromCamera(mousePosition, camera)
        const intersects = raycaster.intersectObjects(scene.children);

        for (let i = 0; i < intersects.length; i++) {

            // intersects[ i ].object.material.color.set( 0xff0000 );

        }


        renderer.render(scene, camera);
    };
    window.requestAnimationFrame(animate);
    useEffect(() => {
        if (mount.current) {
            mount.current.appendChild(renderer.domElement);
        }

        renderer.setAnimationLoop(animate);

    }, []);

    return <div ref={mount}></div>;
};

export default ThreeScene;
