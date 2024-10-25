import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

// 已知三角形三个顶点的坐标，计算三角形面积
const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(10, 0, 0);
const p3 = new THREE.Vector3(0, 10, 0);

// 三角形两条边构建两个向量
const a = p2.clone().sub(p1);
const b = p3.clone().sub(p1);
// 两个向量叉乘结果c的几何含义：a.length()*b.length()*sin(θ)
const c = a.clone().cross(b);

// 三角形面积计算
const S = 0.5 * c.length();

console.log("S", S);

export default mesh;
