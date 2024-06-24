/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import CustomDialog from '@/components/Dailog/Dailog';
import LoginForm from '@/components/Forms/LoginForm';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface UserpageProps { }
const Userpage: React.FC<UserpageProps> = () => {
  const scene = new THREE.Scene();

  // Sizes
  const sizes = {
    width: 600,
    height: 600,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.height/ sizes.width);
  camera.position.z = 5;
  scene.add(camera);


  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);

  //add orbitCOntrol for camera changes
const controls = new OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 0, 10 );
controls.update();


  // Ref for the mount point of the Three.js scene
  const mount = useRef<HTMLDivElement | null>(null);

  // Use useMemo for creating the mesh to prevent unnecessary recreations
    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const newMesh = new THREE.Mesh(geometry, material);
    scene.add(newMesh);


  const axisHelper = new THREE.AxesHelper(10)
  scene.add(axisHelper)


  // Mouse movement variables
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    // Append the renderer to the mount point
    if (mount.current) {
      mount.current.appendChild(renderer.domElement);
    }

    // Handle mouse movement
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

    // Animation logic
    const animate = (time: number) => {
      requestAnimationFrame(animate);

      controls.update();
      // Move the cube with the mouse
      newMesh.rotation.x = time/1000;
      newMesh.rotation.y = time/1000;

      //move axis
      axisHelper.rotation.x = mouseY.current * 2;
      axisHelper.rotation.y = mouseX.current * 2;

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start the animation loop
    renderer.setAnimationLoop(animate);

    // Clean up on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      mount.current?.removeChild(renderer.domElement);
    };
  }, [renderer, scene, camera, newMesh, sizes.width, sizes.height]);



  
  return (
    <div>
      {/* <a href="#" onClick={() => setBg(!bg)}> */}
        <div ref={mount}></div>
      {/* </a> */}

      {/* <CustomDialog
        triggerButtonText={"LOGIN"}
        title={"Login Now"}
        description={"This is description for Login"}
        open={bg}
        onClose={() => setBg(!bg)}
      >
        <LoginForm loginTitle='Login' />
      </CustomDialog> */}
    </div>
  );
};

export default Userpage;