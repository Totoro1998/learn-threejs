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
mesh.position.set(2, 0, -3); //物体位置

// a向量：人的正前方沿着z轴负半轴
const a = new THREE.Vector3(0, 0, -1);

// 扇形范围
const R = 20; //人前方扇形半径
const angle = 60; //人前方扇形角度

// 物体坐标减去人坐标，创建一个人指向物体的向量
const b = mesh.position.clone().sub(person.position);
const L = b.length(); //物体与人的距离

b.normalize(); //归一化
const cos = a.dot(b); //向量a和b夹角余弦值
const rad = THREE.MathUtils.degToRad(angle); // 角度转弧度
const rangeCos = Math.cos(rad / 2); // 扇形角度一半的余弦值

if (L < R) {
  //物体与人的距离在半径R以内
  if (cos > rangeCos) {
    //物体在人前方60度扇形里面
    console.log("人在半径为R，角度为angle的扇形区域内");
  } else {
    console.log("不在扇形区域内");
  }
} else {
  console.log("不在扇形区域内");
}

export default model;
