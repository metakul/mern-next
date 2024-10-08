import * as THREE from 'three';

export const vector = (scene: THREE.Scene) => {
  
    const mousePosition=new THREE.Vector2()

    window.addEventListener("mousemove",function (e) {
        mousePosition.x=(e.clientX/window.innerWidth)*2 -1
        mousePosition.y=-(e.clientY/window.innerHeight)*2 +1
    })
  

  return mousePosition;
};
