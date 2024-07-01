import * as THREE from 'three';

export const createPlane2 = (scene: THREE.Scene) => {
  const planeGeometry = new THREE.PlaneGeometry(30, 10,10);
  const materialForPlane = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe:true
  });

  const newPlane = new THREE.Mesh(planeGeometry, materialForPlane);
  newPlane.rotation.x = 0.5 * Math.PI;
  scene.add(newPlane);

  newPlane.geometry.attributes.position.array[0] -=10* Math.random()
  newPlane.geometry.attributes.position.array[1] -=10* Math.random()
  newPlane.geometry.attributes.position.array[2] -=10* Math.random()

  return newPlane;
};
