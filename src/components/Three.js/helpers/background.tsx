import * as THREE from 'three';

export const setBackground = (scene: THREE.Scene) => {

    //add background

    // const loader = new THREE.TextureLoader();
    // scene.background = loader.load("logo.svg")
    // const color3 = new THREE.Color("rgb(255, 0, 0)");

    // scene.background=color3

    const loader = new THREE.CubeTextureLoader();
    const texture = loader
    .setPath("./Images/")
    .load([
            "stars.jpg",   // Right
            "stars.jpg",   // Right
            "stars.jpg",   // Right
            "stars.jpg",   // Right
            "stars.jpg",   // Right
            "stars.jpg",   // Right
        ]);

    //image should be 1:1
    scene.background = texture;

    return loader;
};
