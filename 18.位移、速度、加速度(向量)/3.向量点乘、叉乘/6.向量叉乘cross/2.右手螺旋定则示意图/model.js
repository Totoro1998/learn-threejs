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

const c = new THREE.Vector3(); // 创建一个向量c保存叉乘结果
c.crossVectors(a, b); //向量a叉乘b
// 可视化向量a和b叉乘结果：向量c
const arrowC = new THREE.ArrowHelper(c.clone().normalize(), O, c.length() / 30, 0x0000ff);
group.add(arrowC);

// 向量c方向与向量a、b构成的平面垂直
// 向量c的长度.length()几何含义，是a长度*b长度*sin(ab夹角θ)

const geometry = new THREE.PlaneGeometry(50, 30);
geometry.translate(-10, -15, 0);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./手掌.jpg");
const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
});
const mesh = new THREE.Mesh(geometry, material);

mesh.rotateY(-Math.PI);
mesh.position.y = 1;
group.add(mesh);

export default group;
