import * as THREE from 'three';

export const createPlane = (scene: any) => {
  const planeGeometry = new THREE.PlaneGeometry(30, 30);
  const materialForPlane = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });

  const newPlane = new THREE.Mesh(planeGeometry, materialForPlane);
  newPlane.rotation.x = 0.5 * Math.PI;
  newPlane.receiveShadow = true;
  scene.add(newPlane);

  return newPlane;
};
