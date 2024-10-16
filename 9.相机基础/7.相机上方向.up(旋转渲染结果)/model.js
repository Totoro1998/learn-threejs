import * as THREE from "three";

const geometry = new THREE.CylinderGeometry(30, 50, 180, 32);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(30, 64, 64);
const material2 = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.y = 110;

const group = new THREE.Group();
group.add(mesh, mesh2);

export default group;
