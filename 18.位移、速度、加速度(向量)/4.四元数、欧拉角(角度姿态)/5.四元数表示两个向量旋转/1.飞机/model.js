// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();
loader.load("../../飞机.glb", function (gltf) {
  const fly = new THREE.Group();
  fly.add(gltf.scene);
  model.add(fly);
  fly.position.set(10, 10, 0); //相对世界坐标系坐标原点偏移
  const axesHelper = new THREE.AxesHelper(20);
  fly.add(axesHelper); //用一个坐标轴可视化模型的局部坐标系(本地坐标系)

  // 可视化飞机方向
  const a = new THREE.Vector3(0, 0, -1); //飞机初始姿态飞行方向
  const O = fly.position.clone(); //飞机位置坐标箭头起点
  model.add(new THREE.ArrowHelper(a, O, 30, 0xff0000));

  // 飞机姿态绕自身坐标原点旋转到v2指向的方向
  const b = new THREE.Vector3(-1, -1, -1).normalize();
  model.add(new THREE.ArrowHelper(b, O, 30, 0x00ff00));

  // a旋转到b构成的四元数
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(a, b); //注意两个参数的顺序
  // quaternion表示的是变化过程，在原来基础上乘以quaternion即可
  fly.quaternion.multiply(quaternion);
});

export default model;
