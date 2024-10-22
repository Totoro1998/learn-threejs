// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("../金属.glb", function (gltf) {
  model.add(gltf.scene);
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      console.log(obj.material); // MeshStandardMaterial
      obj.material.metalness = 1.0; // 金属度，木材或石材,使用0.0,金属使用1.0
      obj.material.roughness = 0.5; // 表面粗糙度，越光滑镜面反射能力越强，越粗糙，表面镜面反射能力越弱，更多地表现为漫反射
    }
  });
});

export default model;
