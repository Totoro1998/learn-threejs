// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const model = new THREE.Group();

const loader = new GLTFLoader();
const person = new THREE.Group();
model.add(person);
loader.load("./人.glb", function (gltf) {
  // gltf.scene.scale.set(10,10,10);
  person.add(gltf.scene);
});

const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
geometry.translate(0, 0.2, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
model.add(mesh);

// 已知条件
person.position.set(0, 0, 2); //人位置
// a向量：人的正前方沿着z轴负半轴
const a = new THREE.Vector3(0, 0, -5);
// 箭头可视化向量a
const arrowA = new THREE.ArrowHelper(a.clone().normalize(), person.position, a.length(), 0xff0000);
model.add(arrowA);

mesh.position.set(2, 0, -3); // 物体位置在人右边 向量c朝下
// mesh.position.set(-2, 0, -3);// 物体位置在人左边 向量c朝上

// 物体坐标减去人坐标，创建一个人指向物体的向量
const b = mesh.position.clone().sub(person.position);
const arrowB = new THREE.ArrowHelper(b.clone().normalize(), person.position, b.length(), 0x00ff00);
model.add(arrowB);

const c = a.clone().cross(b);
c.normalize();

// 可视化向量c方向
const arrowC = new THREE.ArrowHelper(c, person.position, 2.5, 0x0000ff);
model.add(arrowC);

// 根据向量c方向，判断物体在人的左侧还是右侧。
if (c.y < 0) {
  console.log("物体在人右侧");
} else if (c.y > 0) {
  console.log("物体在人左侧");
}

export default model;
