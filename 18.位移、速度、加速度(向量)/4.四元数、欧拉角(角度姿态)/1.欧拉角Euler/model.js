// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();

loader.load("../飞机.glb", function (gltf) {
  const fly = gltf.scene;
  model.add(fly);

  fly.position.set(10, 10, 0); //相对世界坐标系坐标原点偏移
  const axesHelper = new THREE.AxesHelper(20);
  fly.add(axesHelper); //用一个坐标轴可视化模型的局部坐标系(本地坐标系)

  //   //创建一个欧拉角对象，表示绕x轴旋转60度
  //   const Euler = new THREE.Euler();
  //     Euler.x = Math.PI / 3;
  //   // 复制角度属性，改变默认的
  //   fly.rotation.copy(Euler);

  const Euler = new THREE.Euler();
  Euler.x = Math.PI / 3;
  Euler.y = Math.PI / 3;
  // 你可以对比不同旋转顺序，物体旋转后姿态角度是否相同
  //   Euler.order = "XYZ"; //先绕X轴旋转，在绕Y、Z轴旋转
  Euler.order = "YXZ"; //先绕Y轴旋转，在绕X、Z轴旋转
  fly.rotation.copy(Euler);

  //   // // 直接修改fly.rotation
  //   // fly.rotation.order = 'YXZ';
  //   // fly.rotation.x = Math.PI / 3;
  //   // fly.rotation.y = Math.PI / 3;
});

export default model;
