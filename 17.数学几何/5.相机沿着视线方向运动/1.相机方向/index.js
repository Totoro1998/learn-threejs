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
camera.position.set(202, 123, 125); // A
camera.lookAt(0, 0, 0); // B

// // 相机目标观察点和相机位置相减,获得一个沿着相机视线方向的向量
// const dir = new THREE.Vector3(0 - 202, 0 - 123, 0 - 125); // 获取AB
// // 归一化,获取一个表示相机视线方向的单位向量。
// dir.normalize();

const dir = new THREE.Vector3(); //用来表示相机视线
camera.getWorldDirection(dir); // 获取相机的视线方向

console.log("相机方向", dir);
console.log("单位向量", dir.length());

// dis向量表示相机沿着相机视线方向平移100的位移量
const dis = dir.clone().multiplyScalar(100);
// 相机沿着视线方向平移
camera.position.add(dis);

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

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
