// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./黑色.png"); // 加载手机mesh另一个颜色贴图
texture.colorSpace = THREE.SRGBColorSpace;
// 纹理对象texture.flipY默认值
console.log("texture.flipY", texture.flipY);
texture.flipY = false; //是否翻转纹理贴图

loader.load("./手机模型.glb", function (gltf) {
  console.log("gltf.scene", gltf.scene);
  const mesh = gltf.scene.children[0]; //获取Mesh
  // 查看gltf里面Mesh颜色贴图的.flipY值
  console.log(".flipY", mesh.material.map.flipY);

  mesh.material.map = texture; //更换不同风格的颜色贴图

  model.add(gltf.scene);
});

export default model;
