import * as THREE from "three";

const geometry = new THREE.SphereGeometry(3);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const R = 100; //半径长度
const angle = Math.PI / 6; //30度
// const angle = Math.PI/2;//90度
// const angle = Math.PI;//180度
const x = R * Math.cos(angle);
const y = R * Math.sin(angle);
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(x, y, 0);

export default mesh;
