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

// 正投影相机
const width = window.innerWidth; //canvas画布宽度
const height = window.innerHeight; //canvas画布高度
const k = width / height; //canvas画布宽高比
// const s = 50; //控制left, right, top, bottom范围大小
const s = 2.5; //根据包围盒大小调整s，包围盒y方向尺寸的一半左右，地图基本填充cnavas画布
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
// camera.position.set(300, 300, 300);
// camera.lookAt(0, 0, 0);
const x = 113.51,
  y = 33.88;
camera.position.set(x, y, 300); // 把相机的位置和观察目标的xy坐标设置为一样，这样相机的视线方向就垂直地图平面，这样地图就平行于canvas画布，或者说平行于显示器屏幕。
camera.lookAt(x, y, 0); // 将地图中心点移到画布中间
axesHelper.position.set(x, y, 0);

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
controls.target.set(x, y, 0); //与lookAt参数保持一致
controls.update(); //update()函数内会执行camera.lookAt(controls.target)

// Canvas画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth; //canvas画布宽度
  const height = window.innerHeight; //canvas画布高度
  // 1. WebGL渲染器渲染的Cnavas画布尺寸更新
  renderer.setSize(width, height);
  // 2.1.更新相机参数
  //canvas画布宽高比会影响left, right需要跟着更新
  const k = width / height; //canvas画布宽高比
  camera.left = -s * k;
  camera.right = s * k;
  // 2.2.相机的left, right等属性变化了，通知threejs系统
  camera.updateProjectionMatrix();
};
