// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const model = new THREE.Group();

const loader = new GLTFLoader();
const person = new THREE.Group();
model.add(person);
loader.load("../../人.glb", function (gltf) {
  // gltf.scene.scale.set(10,10,10);
  person.add(gltf.scene);

  // 已知条件
  person.position.set(0, 0, 2); //人位置
  // 旋转前人正前方
  const a = new THREE.Vector3(0, 0, -1);
  // 旋转后人正前方
  const b = new THREE.Vector3(2, 0, -3).normalize();
  // 箭头可视化旋转前后方向
  const arrowA = new THREE.ArrowHelper(a, person.position, 5, 0xff0000);
  const arrowB = new THREE.ArrowHelper(b, person.position, 5, 0x00ff00);
  model.add(arrowA, arrowB);

  //人正前方从向量a表示方向旋转到向量b表示方向
  const q = new THREE.Quaternion();
  q.setFromUnitVectors(a, b);
  person.quaternion.multiply(q);
});

export default model;
