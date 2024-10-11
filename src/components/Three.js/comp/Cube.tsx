import * as THREE from 'three';

export const createCube = (scene: any) => {
  const geometry = new THREE.BoxGeometry(2, 4, 4);
  const loader = new THREE.TextureLoader();
  // const material = new THREE.MeshStandardMaterial({
  //   // color: 0xffff00,
  //   wireframe: false,
  //   map:loader.load("logo.svg")
  // });

  const boxMultiMaterial=[
    new THREE.MeshBasicMaterial({map:loader.load("logo.svg")}),
    new THREE.MeshBasicMaterial({map:loader.load("logo.svg")}),
    new THREE.MeshBasicMaterial({map:loader.load("logo.svg")}),
    new THREE.MeshBasicMaterial({map:loader.load("logo.svg")}),
    new THREE.MeshBasicMaterial({map:loader.load("vercel.svg")}),
    new THREE.MeshBasicMaterial({map:loader.load("stars.jpg")}),
  ]


  const cube = new THREE.Mesh(geometry, boxMultiMaterial);
  cube.position.set(6, 5, 8);
  cube.castShadow = true;
  scene.add(cube);

  const cubeId=cube.id

  return {cube,cubeId};
};
