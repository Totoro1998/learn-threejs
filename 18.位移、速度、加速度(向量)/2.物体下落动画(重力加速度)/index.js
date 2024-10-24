import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import mesh from "./model.js"; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(mesh); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);
// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
scene.add(gridHelper);

//光源设置
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
camera.position.set(800, 800, 800);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const v = new THREE.Vector3(0, 0, 0); //物体初始速度
const clock = new THREE.Clock(); //时钟对象
let t = 0;
const g = new THREE.Vector3(0, -9.8, 0);
const pos0 = mesh.position.clone();
// 渲染循环
function render() {
  if (mesh.position.y > 0) {
    const spt = clock.getDelta(); //两帧渲染时间间隔(秒)
    t += spt;
    // 在t时间内，以速度v为初始值的位移量
    const dis = v
      .clone()
      .multiplyScalar(t)
      .add(0.5 * g.clone().multiplyScalar(t * t));
    // 网格模型当前的位置加上spt时间段内运动的位移量
    const newPos = pos0.clone().add(dis);
    mesh.position.copy(newPos);
  }
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
