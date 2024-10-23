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
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 0);
// controls.update();

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// 切换到设备A预览状态
document.getElementById("A").addEventListener("click", function () {
  const A = model.getObjectByName("设备A标注");
  const pos = new THREE.Vector3();
  A.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
  // 相机飞行到的位置和观察目标拉开一定的距离
  const pos2 = pos.clone().addScalar(30);
  createCameraTween(pos2, pos);
});
// 切换到设备B的预览状态
document.getElementById("B").addEventListener("click", function () {
  const B = model.getObjectByName("设备B标注");
  const pos = new THREE.Vector3();
  B.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
  // 相机飞行到的位置和观察目标拉开一定的距离
  const pos2 = pos.clone().addScalar(30);
  // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
  createCameraTween(pos2, pos);
});
// 切换到设备停车场的预览状态
document.getElementById("car").addEventListener("click", function () {
  const car = model.getObjectByName("停车场标注");
  const pos = new THREE.Vector3();
  //获取三维场景中某个对象世界坐标
  car.getWorldPosition(pos);
  // 向量的x、y、z坐标分别在pos基础上增加30
  const pos2 = pos.clone().addScalar(30);
  createCameraTween(pos2, pos);
});

// 相机整体预览对应的位置和观察目标
const cameraPos0 = new THREE.Vector3(202, 123, 125);
const target0 = new THREE.Vector3(0, 0, 0);
// 切换整体预览状态
document.getElementById("all").addEventListener("click", function () {
  // 相机从当前位置camera.position回到整体预览状态
  createCameraTween(cameraPos0, target0);
});

// 相机动画函数，从A点飞行到B点，A点表示相机当前所处状态
// pos: 三维向量Vector3，表示动画结束相机位置
// target: 三维向量Vector3，表示相机动画结束lookAt指向的目标观察点
function createCameraTween(endPos, endTarget) {
  new TWEEN.Tween({
    // 不管相机此刻处于什么状态，直接读取当前的位置和目标观察点
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    tx: controls.target.x,
    ty: controls.target.y,
    tz: controls.target.z,
  })
    .to(
      {
        // 动画结束相机位置坐标
        x: endPos.x,
        y: endPos.y,
        z: endPos.z,
        // 动画结束相机指向的目标观察点
        tx: endTarget.x,
        ty: endTarget.y,
        tz: endTarget.z,
      },
      2000
    )
    .onUpdate(function (obj) {
      // 动态改变相机位置
      camera.position.set(obj.x, obj.y, obj.z);
      // 动态计算相机视线
      // camera.lookAt(obj.tx, obj.ty, obj.tz);
      controls.target.set(obj.tx, obj.ty, obj.tz);
      controls.update(); // 内部会执行.lookAt()
    })
    .start();
}
