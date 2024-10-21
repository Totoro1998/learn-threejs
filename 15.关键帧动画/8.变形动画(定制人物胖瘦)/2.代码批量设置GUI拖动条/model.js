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
  const obj = {};
  const gui = new GUI();
  for (let i = 0; i < tArr.length; i++) {
    obj["t" + i] = 0; //obj批量定义一个属性表示变性目标的权重系数
    // 批量设置要改变的obj属性，对应name名字，和对应权重
    gui
      .add(obj, "t" + i, 0, 1)
      .name(nameArr[i])
      .onChange(function (v) {
        mesh.morphTargetInfluences[i] = v;
      });
  }
});

export default model;
