// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gui from "./gui.js";

// 创建材质子菜单
const matFolder = gui.addFolder("车外壳材质");
matFolder.close();

const loader = new GLTFLoader();
const model = new THREE.Group();
const textureCube = new THREE.CubeTextureLoader()
  .setPath("../环境贴图/环境贴图1/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.colorSpace = THREE.SRGBColorSpace;
loader.load("../轿车.glb", function (gltf) {
  model.add(gltf.scene);
  // 车外壳包含多个Mesh，获取其中一个
  const mesh = gltf.scene.getObjectByName("外壳01");
  mesh.material = new THREE.MeshPhysicalMaterial({
    color: mesh.material.color,
    metalness: 1.0,
    roughness: 0.5,
    envMap: textureCube,
    envMapIntensity: 2.5,
    clearcoat: 1, // 清漆层
    clearcoatRoughness: 0.01, // 清漆层粗糙度
  });

  const obj = {
    color: mesh.material.color.getHex(), // 获取材质默认颜色
  };
  // 材质颜色color
  matFolder.addColor(obj, "color").onChange(function (value) {
    mesh.material.color.set(value);
  });
  // 范围可以参考文档
  matFolder.add(mesh.material, "metalness", 0, 1);
  matFolder.add(mesh.material, "roughness", 0, 1);
  matFolder.add(mesh.material, "clearcoat", 0, 1);
  matFolder.add(mesh.material, "clearcoatRoughness", 0, 1);
  matFolder.add(mesh.material, "envMapIntensity", 0, 10);
});
export default model;
