import * as THREE from "three";
const geometry = new THREE.SphereGeometry(5);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
group.add(mesh1, mesh2);

const A = new THREE.Vector3(30, 30, 0); // 人起点A
// walk表示运动的位移量用向量
const walk = new THREE.Vector3(100, 50, 0);
// const B = new THREE.Vector3();// 人运动结束点B
// // 计算结束点xyz坐标
// B.x = A.x + walk.x;
// B.y = A.y + walk.y;
// B.z = A.z + walk.z;
// addVectors的含义就是参数中两个向量xyz三个分量分别相加
// B.addVectors(A,walk);
// console.log('B',B);

// A.clone()克隆一个和A一样对象，然后再加上walk，作为B
// A不执行.clone()，A和B本质上都指向同一个对象
const B = A.clone().add(walk);

// 两个小球网格模型可视化A点和B点
mesh1.position.copy(A);
mesh2.position.copy(B);

export default group;
