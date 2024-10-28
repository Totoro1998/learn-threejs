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
const ambient = new THREE.AmbientLight(0xffffff, 4.0);
scene.add(ambient);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(70, width / height, 1, 3000);

// 层级关系：player <—— cameraGroup <—— camera
const cameraGroup = new THREE.Group();
cameraGroup.add(camera);
player.add(cameraGroup);
camera.position.set(0, 1.6, -2.3);
camera.lookAt(0, 1.6, 0);

let leftButtonBool = false; //记录鼠标左键状态
document.addEventListener("mousedown", (event) => {
  leftButtonBool = true;
});
document.addEventListener("mouseup", () => {
  leftButtonBool = false;
});

// 上下俯仰角度范围
const angleMin = THREE.MathUtils.degToRad(-15); //角度转弧度
const angleMax = THREE.MathUtils.degToRad(15);

// 鼠标上下移动后，只改变相机视角，但是不改变玩家角色模型的姿态角度，换句话说，就是玩家角色模型始终站在地面上不会倾斜。
document.addEventListener("mousemove", (event) => {
  if (leftButtonBool) {
    // 左右旋转
    player.rotation.y -= event.movementX / 600;
    // 鼠标上下滑动，让相机视线上下转动
    // 相机父对象cameraGroup绕着x轴旋转,camera跟着转动
    cameraGroup.rotation.x -= event.movementY / 600;
    // // 一旦判断.rotation.x小于-15，就设置为-15，大于15，就设置为15
    // if (cameraGroup.rotation.x < angleMin) cameraGroup.rotation.x = angleMin;
    // if (cameraGroup.rotation.x > angleMax) cameraGroup.rotation.x = angleMax;
  }
});
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
    //限制最高速度
    if (keyStates.W) {
      const front = new THREE.Vector3();
      player.getWorldDirection(front); //获取玩家角色(相机)正前方
      v.add(front.multiplyScalar(a * deltaTime));
    }
    if (keyStates.S) {
      const front = new THREE.Vector3();
      player.getWorldDirection(front);
      // - a：与W按键反向相反
      v.add(front.multiplyScalar(-a * deltaTime));
    }
  }

  v.addScaledVector(v, damping); //阻尼减速

  //更新玩家角色的位置   当v是0的时候，位置更新也不会变化
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
