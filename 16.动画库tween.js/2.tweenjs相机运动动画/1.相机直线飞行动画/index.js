import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
import model from "./model.js"; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
const ambient = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambient);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

// 相机动画:从一个点移动到另一个点
new TWEEN.Tween(camera.position)
  .to({ x: 180, y: 100, z: 50 }, 3000)
  // tweenjs改变参数对象的过程中，.onUpdate方法会被重复调用执行
  .onUpdate(function () {
    // 只改变相机位置，默认方向保持不变，如果你想重新计算计算视线方向，可以执行lookAt()
    camera.lookAt(0, 0, 0);
    cameraHelper.update();
  })
  .start();

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 渲染循环
function render() {
  TWEEN.update();
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
