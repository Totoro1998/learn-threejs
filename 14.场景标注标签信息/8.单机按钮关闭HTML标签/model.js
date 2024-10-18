// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();

loader.load("./工厂.glb", function (gltf) {
  model.add(gltf.scene); //三维场景添加到model组对象中
});

export default model;
