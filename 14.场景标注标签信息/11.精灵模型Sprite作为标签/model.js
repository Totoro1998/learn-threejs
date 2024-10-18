import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import createSprite from "./sprite.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

loader.load("./工厂.glb", function (gltf) {
  model.add(gltf.scene);
  createSprite(gltf.scene.getObjectByName("设备A标注"), "警告");
  createSprite(gltf.scene.getObjectByName("设备B标注"), "故障");
});

export default model;
