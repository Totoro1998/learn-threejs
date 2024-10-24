import * as THREE from "three";

const geometry = new THREE.BoxGeometry(10, 10, 10);
geometry.translate(0, 5, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 300, 0);

export default mesh;
