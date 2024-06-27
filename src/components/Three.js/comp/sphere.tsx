import * as THREE from 'three';

export const createSphere = (scene: THREE.Scene) => {
  const geometry = new THREE.SphereGeometry(2, 40, 40);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: false,
    // map:text
  });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(4, 1, 5);
  sphere.castShadow = true;
  scene.add(sphere);

  return sphere;
};
