// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gui from "./gui.js";

// 创建材质子菜单
const matFolder = gui.addFolder("玻璃材质");
matFolder.close(); //关闭菜单

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
// 加载环境贴图
const textureCube = new THREE.CubeTextureLoader()
  .setPath("../环境贴图/环境贴图1/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.colorSpace = THREE.SRGBColorSpace; //设置纹理贴图编码方式和WebGL渲染器一致
loader.load("../轿车.glb", function (gltf) {
  model.add(gltf.scene);
  const mesh = gltf.scene.getObjectByName("玻璃01");
  mesh.material = new THREE.MeshPhysicalMaterial({
    metalness: 0.0,
    roughness: 0.0,
    envMap: textureCube,
    envMapIntensity: 1.0,
    // transparent: true,
    // opacity: 0.1, // 使用环境贴图时，opacity属性不能很好的反射环境贴图。

    transmission: 1.0, //玻璃材质透光率，transmission替代opacity
    ior: 1.5, // 折射率
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
  matFolder.add(mesh.material, "transmission", 0, 1);
  matFolder.add(mesh.material, "ior", 1, 2.333);
  matFolder.add(mesh.material, "envMapIntensity", 0, 10);
});
export default model;
