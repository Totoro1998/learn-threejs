import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

const A = new THREE.Vector3(30, 30, 0); // 人起点A
const B = new THREE.Vector3(130, 80, 0); // 人运动结束点B
const x1 = A.x;
const x2 = B.x;
const y1 = A.y;
const y2 = B.y;
const AO = x2 - x1;
const BO = y2 - y1;
// AOB三角形位于XOY平面上，先不考虑z轴，勾股定理计算平面上三角形斜边AB的距离
// const L = Math.sqrt(AO*AO + BO*BO);
// 3D空间，A和B两点之间的距离
// const L = Math.sqrt(Math.pow(B.x-A.x,2) + Math.pow(B.y-A.y,2) + Math.pow(B.z-A.z,2));

// const AB = new THREE.Vector3();
// // AB.x = B.x-A.x;
// // AB.y = B.y-A.y;
// // AB.z = B.z-A.z;
// AB.subVectors(B,A);
const AB = B.clone().sub(A);

// console.log('AB',AB);
const L = AB.length(); //向量长度计算，A点到B点的距离

// 计算结果：50√5(111.803)
console.log("L", L);

// v表示速度向量，v的长度是就是速度的大小
const v = new THREE.Vector3(1, 1, 0);
const vL = v.length();
console.log("vL", vL);

export default mesh;
