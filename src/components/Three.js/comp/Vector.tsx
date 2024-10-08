import * as THREE from 'three';

export const vector = (scene: THREE.Scene) => {
  
    const mousePosition=new THREE.Vector2()

    window.addEventListener("mousemove",function (e) {
        mousePosition.x=(e.clientX/window.innerWidth)*2 -1
        mousePosition.y=-(e.clientY/window.innerHeight)*2 +1
    })

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    let textGeometry
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)

    scene.add(textMesh)

  return mousePosition;
};
