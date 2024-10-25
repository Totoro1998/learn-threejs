import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

// 三角形的三个点坐标p1，p2，p3
const p1 = new THREE.Vector3(0, 0, 0); // 点1坐标
const p2 = new THREE.Vector3(20, 0, 0); // 点2坐标
const p3 = new THREE.Vector3(10, 10, 0); // 点3坐标

const a = p3.clone().sub(p1);
const b = p2.clone().sub(p1);

const cos = a.normalize().dot(b.normalize());
const rad = Math.acos(cos);
const angle = THREE.MathUtils.radToDeg(rad);
console.log(cos, rad, angle);

export default mesh;
