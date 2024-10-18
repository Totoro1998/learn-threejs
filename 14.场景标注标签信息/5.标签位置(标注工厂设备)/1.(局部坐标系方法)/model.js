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
  // const obj = gltf.scene.getObjectByName('设备A');
  const obj = gltf.scene.getObjectByName("设备B");

  // 可视化工厂设备obj的局部坐标系
  const axesHelper = new THREE.AxesHelper(30);
  obj.add(axesHelper);

  //标签tag作为obj子对象，默认标注在工厂设备obj的局部坐标系坐标原点
  obj.add(tag);
});

export default model;
