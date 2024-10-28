import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { model, mixer, player } from "./model.js";

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(8, 10, 14);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 声明一个对象keyStates用来记录键盘事件状态
const keyStates = {
  // 使用W、A、S、D按键来控制前、后、左、右运动
  W: false,
  A: false,
  S: false,
  D: false,
};
// 当某个键盘按下设置对应属性设置为true
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyW") keyStates.W = true;
  if (event.code === "KeyA") keyStates.A = true;
  if (event.code === "KeyS") keyStates.S = true;
  if (event.code === "KeyD") keyStates.D = true;
});
// 当某个键盘抬起设置对应属性设置为false
document.addEventListener("keyup", (event) => {
  if (event.code === "KeyW") keyStates.W = false;
  if (event.code === "KeyA") keyStates.A = false;
  if (event.code === "KeyS") keyStates.S = false;
  if (event.code === "KeyD") keyStates.D = false;
});

// 用三维向量表示玩家角色(人)运动漫游速度
//按下W键对应的人运动速度
const v = new THREE.Vector3(0, 0, 3);

// 渲染循环
const clock = new THREE.Clock();
function render() {
  const deltaTime = clock.getDelta();
  if (keyStates.W) {
    // 在间隔deltaTime时间内，玩家角色位移变化计算(速度*时间)
    const deltaPos = v.clone().multiplyScalar(deltaTime);
    player.position.add(deltaPos); //更新玩家角色的位置
  }
  mixer.update(deltaTime);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
