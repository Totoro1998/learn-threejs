import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../骨骼动画.glb", function (gltf) {
  console.log("控制台查看gltf.scene对象结构", gltf.scene);
  model.add(gltf.scene);
  // 1. 骨骼辅助显示
  const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
  model.add(skeletonHelper);

  // 3. 根据节点名字获取某个骨骼网格模型
  const SkinnedMesh = gltf.scene.getObjectByName("身体");
  console.log("骨骼网格模型", SkinnedMesh);
  console.log("骨架", SkinnedMesh.skeleton);
  console.log("骨架所有关节", SkinnedMesh.skeleton.bones);
  console.log("根关节", SkinnedMesh.skeleton.bones[0]);
});

export default model;
