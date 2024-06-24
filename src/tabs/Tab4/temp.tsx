/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import CustomDialog from '@/components/Dailog/Dailog';
import LoginForm from '@/components/Forms/LoginForm';

interface UserpageProps {}
const Userpage: React.FC<UserpageProps> = () => {
  const scene = new THREE.Scene();

  // Sizes
  const sizes = {
    width: 800,
    height: 600,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 5;
  scene.add(camera);
  // camera.position.set( 0, 0, 100 );

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);

  // Ref for the mount point of the Three.js scene
  const mount = useRef<HTMLDivElement | null>(null);

  // Use useMemo for creating the mesh to prevent unnecessary recreations
  const mesh = useMemo(() => {
    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const newMesh = new THREE.Mesh(geometry, material);
    scene.add(newMesh);
    return newMesh;
  }, [scene]);

  // State for dialog open/close
  const [bg, setBg] = React.useState(false);

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

    document.addEventListener('mousemove', handleMouseMove);

    // Animation logic
    const animate = () => {
      requestAnimationFrame(animate);

      // Move the cube with the mouse
      mesh.rotation.x = mouseY.current * 2;
      mesh.rotation.y = mouseX.current * 2;

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();

    // Clean up on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      mount.current?.removeChild(renderer.domElement);
    };
  }, [renderer, scene, camera, mesh, sizes.width, sizes.height]);

  return (
    <div>
      <a href="#" onClick={() => setBg(!bg)}>
        <div ref={mount}></div>
      </a>
  
      <CustomDialog
        triggerButtonText={"LOGIN"}
        title={"Login Now"}
        description={"This is description for Login"}
        open={bg}
        onClose={() => setBg(!bg)}
      >
        <LoginForm loginTitle='Login' />
      </CustomDialog>
    </div>
  );
};

export default Userpage;