// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();
const fly = new THREE.Group();
model.add(fly);

loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);
});

loader.load("../无人机.glb", function (gltf) {
  fly.scale.set(0.5, 0.5, 0.5);
  fly.add(gltf.scene);
  const axesHelper = new THREE.AxesHelper(30);
  fly.add(axesHelper); //用一个坐标轴可视化模型的局部坐标系(本地坐标系)

  const R = 100; //绕转半径
  const H = 30; //绕转高度

  // 初始位置
  fly.position.y = H;
  fly.position.x = R;

  //无人机加载进来默认正反向(相机镜头方向)
  const a = new THREE.Vector3(0, 0, 1);
  // 绕转中心的坐标
  const target = new THREE.Vector3(0, H, 0);
  const q0 = fly.quaternion.clone(); //姿态角度初始值

  let angle = 0;
  function loop() {
    requestAnimationFrame(loop);
    angle += 0.01;
    // 无人机y坐标不变，在平行于XOZ的平面上做圆周运动
    const x = R * Math.cos(angle);
    const z = R * Math.sin(angle);
    fly.position.x = x;
    fly.position.z = z;

    // 保持无人机镜头一直对准旋转中心
    const b = target.clone().sub(fly.position).normalize();
    // 计算当前位置相对初始位置需要旋转的角度
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(a, b);
    const newQ = q0.clone().multiply(q); //初始四元数乘需要增加旋转对应四元数q
    fly.quaternion.copy(newQ);
  }
  loop();
});

export default model;
