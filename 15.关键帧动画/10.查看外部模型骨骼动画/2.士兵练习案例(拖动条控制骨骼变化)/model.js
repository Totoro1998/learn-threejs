import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../士兵.glb", function (gltf) {
  model.add(gltf.scene);

  // 骨骼辅助显示
  const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
  model.add(skeletonHelper);

  // 根据骨骼关节名字获取骨关节Bone
  // 在三维软件中，骨骼关节始终选择第一个，层层展开，直接找到名为mixamorig:RightShoulder的关节，展开看到下面三个骨骼关节
  const bone1 = gltf.scene.getObjectByName("mixamorigRightArm"); //手臂
  const bone2 = gltf.scene.getObjectByName("mixamorigRightForeArm"); //肘关节
  const bone3 = gltf.scene.getObjectByName("mixamorigRightHand"); //腕关节

  bone1.rotation.x = Math.PI / 3; //手臂
  bone2.rotation.x = Math.PI / 3; //肘关节
  bone3.rotation.x = Math.PI / 3; //腕关节

  const gui = new GUI();
  gui.add(bone1.rotation, "x", 0, Math.PI / 3).name("手臂");
  gui.add(bone2.rotation, "x", 0, Math.PI / 3).name("肘关节");
  gui.add(bone3.rotation, "x", 0, Math.PI / 3).name("腕关节");
});

export default model;
