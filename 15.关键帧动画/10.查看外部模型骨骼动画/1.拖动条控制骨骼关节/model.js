import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../骨骼动画.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);
  // 1. 骨骼辅助显示
  const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
  model.add(skeletonHelper);

  // 2. 根据骨骼关节名字获取骨关节Bone
  // 在三维软件中，骨骼关节层层展开，可以看到下面三个骨骼关节
  const bone1 = gltf.scene.getObjectByName("Bone1"); //关节1
  const bone2 = gltf.scene.getObjectByName("Bone2"); //关节2
  const bone3 = gltf.scene.getObjectByName("Bone3"); //关节3

  // bone2.rotation.x = Math.PI / 6; //关节2旋转
  // bone3.rotation.x = Math.PI / 6; //关节3旋转

  const gui = new GUI();
  gui.add(bone1.rotation, "x", 0, Math.PI / 3).name("关节1");
  gui.add(bone2.rotation, "x", 0, Math.PI / 3).name("关节2");

  // 3. 根据节点名字获取某个骨骼网格模型
  const SkinnedMesh = gltf.scene.getObjectByName("身体");
  console.log("骨骼网格模型", SkinnedMesh);
  console.log("骨架", SkinnedMesh.skeleton);
  console.log("骨架所有关节", SkinnedMesh.skeleton.bones);
  console.log("根关节", SkinnedMesh.skeleton.bones[0]);
});

export default model;
