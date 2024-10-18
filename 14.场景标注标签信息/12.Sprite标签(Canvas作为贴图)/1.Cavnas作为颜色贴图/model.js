import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import {
  GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';
import createSprite from './sprite.js'
const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);
  createSprite(gltf.scene.getObjectByName('设备A标注'),'设备A');
  createSprite(gltf.scene.getObjectByName('设备B标注'),'设备B');
  createSprite(gltf.scene.getObjectByName('停车场标注'),'停车场');
})

export default model;