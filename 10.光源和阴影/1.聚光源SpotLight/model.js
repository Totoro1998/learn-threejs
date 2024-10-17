import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(400, 200);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);

export default mesh;
