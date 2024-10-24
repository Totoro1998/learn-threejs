import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { model, mesh1, mesh2, mesh3 } from "./model.js"; //模型对象

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

//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
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

const raycaster = new THREE.Raycaster(new THREE.Vector3(-100, 0, 0), new THREE.Vector3(1, 0, 0));
// console.log('射线属性',raycaster.ray);
// // 设置射线起点
// raycaster.ray.origin = new THREE.Vector3(-100, 0, 0);
// // 设置射线方向射线方向沿着x轴
// raycaster.ray.direction = new THREE.Vector3(1, 0, 0);
//.intersectObjects([mesh1, mesh2, mesh3])对参数中的网格模型对象进行射线交叉计算
// 未选中对象返回空数组[],选中一个对象，数组1个元素，选中多个对象，数组多个元素
const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
console.log("射线器返回的对象", intersects);
// intersects.length大于0说明，说明选中了模型
// 如果选中多个模型，就会按照先后顺序排序
if (intersects.length > 0) {
  // console.log("交叉点", intersects[0].point);
  // console.log("交叉对象",intersects[0].object);
  // console.log("射线原点和交叉点距离",intersects[0].distance);
  // 选中模型的第一个模型，设置为红色
  intersects[0].object.material.color.set(0xff0000);
}
