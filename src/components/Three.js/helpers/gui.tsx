import { GUI } from "dat.gui";
import { Mesh, SphereGeometry, MeshStandardMaterial, Object3DEventMap, DirectionalLight } from "three";

export const setupGUI = (gui: GUI,sphere: Mesh<SphereGeometry, MeshStandardMaterial, Object3DEventMap>, options: { sphereColor: string; spherewireframe: boolean; speed: number; angle: number; penumbra: number; intensity: number; }, dLight: DirectionalLight) => {

  gui.add(options, "spherewireframe").onChange((e) => {
    sphere.material.wireframe = e;
  });

  gui.add(options, "speed", 0, 1);
  gui.add(options, "angle", 0, 1);
  gui.add(options, "penumbra", 0, 5);
  gui.add(options, "intensity", 0, 1);

  return gui;
};
