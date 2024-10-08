import * as THREE from "three"
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import React from 'react'

async function CreateText(scene: THREE.Scene) {

    const text = "My Text"

    // TODO get text, parameters and material from outside

    {/*
        // Add text material
    */}
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const fontLoader = new FontLoader()

    let textGeometry
    
    const fonts=await fontLoader.load("fonts/genetilis_bol.typeface.json", function (font) {
        textGeometry = new TextGeometry(text, {
            font: font,
            size: 280,
            depth: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });
        return textGeometry
    })

    // const textGeometry=new TextGeometry( text,parameters);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)

    scene.add(textMesh)
    return textMesh
}



export default CreateText