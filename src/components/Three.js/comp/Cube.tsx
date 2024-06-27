import * as THREE from 'three';

export const createCube = (scene: THREE.Scene) => {
  const geometry = new THREE.BoxGeometry(2, 4, 4);
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshStandardMaterial({
    // color: 0xffff00,
    wireframe: false,
    map:loader.load("logo.svg")
  });

  
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(6, 5, 8);
  cube.castShadow = true;
  scene.add(cube);

  return cube;
};
