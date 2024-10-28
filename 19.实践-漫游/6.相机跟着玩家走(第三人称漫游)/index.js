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
const gridHelper = new THREE.GridHelper(60, 50, 0x004444, 0x004444);
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
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// fov视角改成70度，视野范围更大
const camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);

// 把相机作为玩家角色的子对象，这样相机的位置和姿态就会跟着玩家角色改变
player.add(camera);
// 你可以根据需要放相机相对玩家角色位置，比如我这里相机与人高度相近，把相机放在人后脑勺，拉开一定距离，然后相机镜头对准人的后脑勺
camera.position.set(0, 1.6, -5.5); //玩家角色后面一点
camera.lookAt(0, 1.6, 0); //对着人身上某个点

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
const v = new THREE.Vector3(0, 0, 0); //初始速度设置为0
const a = 12; //WASD按键的加速度：调节按键加速快慢
const damping = -0.04; //阻尼 当没有WASD加速的时候，人、车等玩家角色慢慢减速停下来
const vMax = 5; //限制玩家角色最大速度
// 渲染循环
const clock = new THREE.Clock();
function render() {
  const deltaTime = clock.getDelta();
  if (v.length() < vMax) {
    // 限制最高速度
    if (keyStates.W) {
      const front = new THREE.Vector3(0, 0, 1); //先假设W键对应运动方向为z
      v.add(front.multiplyScalar(a * deltaTime));
    }
    if (keyStates.S) {
      // 与W按键相反方向
      const front = new THREE.Vector3(0, 0, -1);
      v.add(front.multiplyScalar(a * deltaTime));
    }
  }

  v.addScaledVector(v, damping); //阻尼减速

  const deltaPos = v.clone().multiplyScalar(deltaTime);
  player.position.add(deltaPos);

  mixer.update(deltaTime);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
