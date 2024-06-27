import * as THREE from 'three';

export const createHelpers = (scene: THREE.Scene, dLight: THREE.DirectionalLight) => {
  const axisHelper = new THREE.AxesHelper(10);
  scene.add(axisHelper);

  const dlightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera);
  scene.add(dlightShadowHelper);

  const dLightHelper = new THREE.DirectionalLightHelper(dLight, 5);
  scene.add(dLightHelper);

  return { axisHelper, dlightShadowHelper, dLightHelper };
};
