import * as THREE from "three";
const geometry = new THREE.SphereGeometry(5);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
group.add(mesh1, mesh2);

const A = new THREE.Vector3(10, 30, 0); // 人起点A
// 向量v表示人速度，大小√2米每秒，方向是x、y正半轴的角平分线
const v = new THREE.Vector3(1, 1, 0);
// `.multiplyScalar(50)`表示向量x、y、z三个分量和参数分别相乘
const walk = v.clone().multiplyScalar(50);
// 运动50秒结束位置B
const B = A.clone().add(walk);

// 两个小球网格模型可视化A点和B点
mesh1.position.copy(A);
mesh2.position.copy(B);

export default group;
