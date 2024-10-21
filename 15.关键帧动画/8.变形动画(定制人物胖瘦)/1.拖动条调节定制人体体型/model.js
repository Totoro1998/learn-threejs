import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../人.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);

  const mesh = gltf.scene.children[0]; // 访问人体网格模型
  // 获取所有变形目标的顶点数据
  const tArr = mesh.geometry.morphAttributes.position;
  // console.log('所有变形目标', tArr);
  // console.log('所有权重', mesh.morphTargetInfluences);
  // 每个变形目标对应的含义(注意和变形目标对应起来)
  const nameArr = ["变胖", "丰乳肥臀", "增肌", "年龄", "变瘦"];
  // GUI拖动条可视化改变变形目标权重系数
  const obj = {
    t0: 0,
    t1: 0,
  };
  const gui = new GUI();
  gui
    .add(obj, "t0", 0, 1)
    .name("变胖")
    .onChange(function (v) {
      mesh.morphTargetInfluences[0] = v;
    });
  gui
    .add(obj, "t1", 0, 1)
    .name("丰乳肥臀")
    .onChange(function (v) {
      mesh.morphTargetInfluences[1] = v;
    });
});

export default model;
