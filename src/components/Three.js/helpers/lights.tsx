import * as THREE from 'three';

export const createLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dLight.position.set(0, 20, 15);
  dLight.castShadow = true;
  dLight.shadow.camera.bottom = -12;
  scene.add(dLight);

  return dLight;
};
