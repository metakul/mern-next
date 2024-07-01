import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

export const InitVr = (renderer: THREE.WebGLRenderer, isXrEnabled: boolean) => {
    // Create the VRButton once and append it to the document body
    const vrButton = VRButton.createButton(renderer);
    if (!document.body.contains(vrButton)) {
        document.body.appendChild(vrButton);
    }

    // Enable or disable XR
    renderer.xr.enabled = isXrEnabled;

    // Toggle the visibility of the VRButton
    vrButton.style.display = isXrEnabled ? 'block' : 'none';

    return isXrEnabled;
};
