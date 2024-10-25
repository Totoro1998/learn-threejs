import * as THREE from "three";

const group = new THREE.Group();

const a = new THREE.Vector3(50, 0, 0);
const b = new THREE.Vector3(30, 0, 30);
// 箭头可视化向量a、向量b
const O = new THREE.Vector3(0, 0, 0); //给箭头设置一个起点
const arrowA = new THREE.ArrowHelper(a.clone().normalize(), O, a.length(), 0xff0000);
group.add(arrowA);
const arrowB = new THREE.ArrowHelper(b.clone().normalize(), O, b.length(), 0x00ff00);
group.add(arrowB);

let c = new THREE.Vector3(); // 创建一个向量c保存叉乘结果
// c.crossVectors(a, b); //向量a叉乘b
// c.crossVectors(b, a); // 向量b叉乘a
c = b.clone().cross(a); // 向量b叉乘a

// 可视化向量a和b叉乘结果：向量c
const arrowC = new THREE.ArrowHelper(c.clone().normalize(), O, c.length() / 30, 0x0000ff);
group.add(arrowC);

// 向量c方向与向量a、b构成的平面垂直
// 向量c的长度.length()几何含义，是a长度*b长度*sin(ab夹角θ)

export default group;
