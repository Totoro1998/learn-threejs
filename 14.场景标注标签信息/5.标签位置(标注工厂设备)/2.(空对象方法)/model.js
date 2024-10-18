import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);
  const div = document.getElementById("tag");
  // HTML元素转化为threejs的CSS2模型对象
  const tag = new CSS2DObject(div);
  // obj是建模软件中创建的一个空对象
  const obj = gltf.scene.getObjectByName("设备A标注");
  // const obj = gltf.scene.getObjectByName('停车场标注');
  //tag会标注在空对象obj对应的位置
  obj.add(tag);
});

export default model;
