// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gui from "./gui.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

const textureCube = new THREE.CubeTextureLoader().setPath("./环境贴图/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.colorSpace = THREE.SRGBColorSpace;
loader.load("../工厂.glb", function (gltf) {
  //gltf加载成功后返回一个对象
  // console.log('控制台查看gltf对象结构', gltf);
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      //判断是否是网格模型
      obj.material.envMap = textureCube; //设置环境贴图
      // envMapIntensity：控制环境贴图对mesh表面影响程度
      obj.material.envMapIntensity = 1.0; //默认值1, 设置为0.0,相当于没有环境贴图
    }
  });
  model.add(gltf.scene); //三维场景添加到model组对象中

  const obj = {
    envMapIntensity: 1.0,
  };
  gui.add(obj, "envMapIntensity", 0, 2).onChange(function (value) {
    gltf.scene.traverse(function (obj) {
      if (obj.isMesh) {
        obj.material.envMapIntensity = value;
      }
    });
  });
});

export default model;
