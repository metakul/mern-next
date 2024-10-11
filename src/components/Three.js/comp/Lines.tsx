import * as THREE from "three"

function CreateLine(scene: any) {

    // TODO get points, axis, material and length from outside
    {/*
        // Add line material
        // @Types LineDashedMaterial
        // @Types LineBasicMaterial
    */}

    const lineMaterial = new THREE.LineDashedMaterial({
        color: 0x0000ff
    })

    {/*
        // Add Line Position Via Vector
    */}
    const points = []
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(-10, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))
    points.push(new THREE.Vector3(10, 10, 0))

    {/*
        // Use Buffer Geometry to set line Geometry
    */}
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(lineGeometry, lineMaterial)
    scene.add(line)
    return line
}

export default CreateLine