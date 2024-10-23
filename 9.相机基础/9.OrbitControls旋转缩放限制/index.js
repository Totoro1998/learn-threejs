import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import model from "./model.js"; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

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
camera.position.set(202, 123, 125);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false; //禁止右键拖拽
controls.enableZoom = false; //禁止缩放
// controls.enableRotate = false; //禁止旋转

//透视投影相机：相机距离目标观察点距离越远，工厂模型显示越小，距离越近显示越大

//相机距离观察目标点最小值
controls.minDistance = 200;
//相机距离观察目标点最大值
controls.maxDistance = 500;

// 通过.getDistance()+浏览器控制台可视化设置minDistance和maxDistance
controls.addEventListener("change", function () {
  const dis = controls.getDistance(); //相机位置与目标观察点距离
  console.log("dis", dis);
});

// 上下旋转范围
controls.minPolarAngle = 0; //默认0
// 设置为90度，这样不能看到工厂模型底部
controls.maxPolarAngle = Math.PI / 2; //默认Math.PI

// 左右旋转范围
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
