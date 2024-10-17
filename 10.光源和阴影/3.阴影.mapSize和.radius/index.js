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
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
const directionalLight = new THREE.DirectionalLight(0xffffff, 4.0);
directionalLight.position.set(100 * 2, 60 * 2, 50 * 2);
scene.add(directionalLight); //平行光

// 设置产生阴影的光源对象,开启光源阴影的计算功能
directionalLight.castShadow = true;

// 设置三维场景计算阴影的范围
directionalLight.shadow.camera.left = -50 * 10;
directionalLight.shadow.camera.right = 50 * 10;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 600;

// mapSize属性默认512x512
console.log("阴影默认像素", directionalLight.shadow.mapSize);
// directionalLight.shadow.mapSize.set(128,128);
// 如果阴影边缘锯齿感的时候，可以适当提升像素(尺寸一般2的n次方)
// directionalLight.shadow.mapSize.set(1024,1024);
directionalLight.shadow.mapSize.set(2048, 2048);

// 模糊弱化阴影边缘
console.log(".shadow.radius", directionalLight.shadow.radius);
directionalLight.shadow.radius = 6;

// 可视化平行光阴影对应的正投影相机对象
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(153, 697, 676);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 设置渲染器，允许光源阴影渲染
renderer.shadowMap.enabled = true;

// 渲染循环
function render() {
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
