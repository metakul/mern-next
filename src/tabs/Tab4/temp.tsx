/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import CustomDialog from '@/components/Dailog/Dailog';
import LoginForm from '@/components/Forms/LoginForm';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import nft1 from "./Images/3.svg"

interface UserpageProps { }
const Userpage: React.FC<UserpageProps> = () => {
  const scene = new THREE.Scene();
  const gui = new dat.GUI();
  let step=0

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
  renderer.shadowMap.enabled=true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

 

  //add orbitCOntrol for camera changes
  const controls = new OrbitControls(camera, renderer.domElement);
  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(0, 0, 10);
  controls.update();
  
  // Ref for the mount point of the Three.js scene
  const mount = useRef<HTMLDivElement | null>(null);


 //import image
//add bg
 const textureLoader=new THREE.TextureLoader()
//  scene.background=textureLoader.load(nft1)
const cubeTexture=new THREE.CubeTextureLoader()
scene.background=cubeTexture.load([
  nft1,
  nft1,
  nft1,
  nft1,
  nft1,
  nft1,
])


  // Use useMemo for creating the mesh to prevent unnecessary recreations
  // Object
  const geometry = new THREE.SphereGeometry(2, 40, 40);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    wireframe:false
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(4,1, 5)
  sphere.castShadow=true
  scene.add(sphere);

  const options={
    sphereColor:"0xff0000",
    wireframe:false,
    speed:0.01,
    angle:0.2,
    penumbra:0,
    intensity:0.2
  }

  // gui.addColor(options,"sphereColor").onChange(function(e: THREE.ColorRepresentation){
  //   sphere.material.color.set(e)
  // })

  gui.add(options,"wireframe").onChange(function(e: any){
    sphere.material.wireframe=e
  })

  gui.add(options,"speed",0,0.001)
  gui.add(options,"angle",0,1)
  gui.add(options,"penumbra",0,5)
  gui.add(options,"intensity",0,2)
  //add bounce




  //axes add
  const axisHelper = new THREE.AxesHelper(10)
  scene.add(axisHelper)

  const ambientLight=new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)

  // directionalLight
  const dLight= new THREE.DirectionalLight(0xFFFFFF,0.8)
  dLight.position.set(0,20,15)
  dLight.castShadow=true
  dLight.shadow.camera.bottom=-12
  scene.add(dLight)
  
  //shadow helper
  const dlightShadowHelper= new THREE.CameraHelper(dLight.shadow.camera)
  scene.add(dlightShadowHelper)

  const lightHelper=new THREE.DirectionalLightHelper(dLight,5)
  scene.add(lightHelper)


//   //spot light
//   const sLight=new THREE.SpotLight(0xFFFFFF)
//   sLight.position.set(100,50,-100)
//   sLight.castShadow=true
//   sLight.angle=0.2
//   scene.add(sLight)

//   const sLightHelper=new THREE.SpotLightHelper(sLight)
//   scene.add(sLightHelper)

//  const sLightShadowHelper= new THREE.CameraHelper(sLight.shadow.camera)
//   scene.add(sLightShadowHelper)

  
  //create a planGeometry

  const planeGeometry = new THREE.PlaneGeometry(30, 30)
  const materialForPlane = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
  })

  const newPlane = new THREE.Mesh(planeGeometry, materialForPlane)
  newPlane.rotation.x = 0.5 * Math.PI
  newPlane.receiveShadow=true
  scene.add(newPlane)
  //gridHelper
  // const gridHelper = new THREE.GridHelper(30, 30)
  // scene.add(gridHelper)



  // Mouse movement variables
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Animation logic
  const animate = (time: number) => {
    requestAnimationFrame(animate);

    controls.update();

    step+=options.speed
    sphere.position.y=20* Math.abs(Math.sin(step))

      // sLight.angle=options.angle
      // sLight.penumbra=options.penumbra
      dLight.intensity=options.intensity
      lightHelper.update()
    // Move the cube with the mouse
    // sphere.rotation.x = time / 1000;
    // sphere.rotation.y = time / 1000;

    //move axis
    // axisHelper.rotation.x = mouseY.current * 2;
    // axisHelper.rotation.y = mouseX.current * 2;
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


    // Render the scene
    renderer.render(scene, camera);
  };

  useEffect(() => {
    // Append the renderer to thnewMeshe mount point
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



    // Start the animation loop
    renderer.setAnimationLoop(animate);

    // Clean up on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      mount.current?.removeChild(renderer.domElement);
    };
  }, [renderer, scene, camera, sphere, sizes.width, sizes.height]);




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