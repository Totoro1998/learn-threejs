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
mesh.position.set(2, 0, -3); // 物体位置
// mesh.position.set(2, 0, 5);//调整物体挪到人后面测试代码判断是否正确
// a向量：人的正前方沿着z轴负半轴
const a = new THREE.Vector3(0, 0, -1);

// 物体坐标减去人坐标，创建一个人指向物体的向量
const b = mesh.position.clone().sub(person.position);

const dot = a.dot(b); //向量a和b点乘

if (dot > 0) {
  // 物体在人前面，向量a和b夹角0~90度，夹角余弦值大于0，a和b点乘`.dot()`大于0。
  console.log("物体在人前面");
} else if (dot < 0) {
  // 物体在人后面，向量a和b夹角0~180度，夹角余弦值小于0，a和b点乘`.dot()`小于0
  console.log("物体在人后面");
}

export default model;
