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

  // 相机从当前位置camera.position飞行三维场景中某个世界坐标附近
  new TWEEN.Tween({
    // 相机开始坐标
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    // 相机开始指向的目标观察点
    tx: controls.target.x,
    ty: controls.target.y,
    tz: controls.target.z,
  })
    .to(
      {
        // 相机结束坐标
        x: pos2.x,
        y: pos2.y,
        z: pos2.z,
        // 相机结束指向的目标观察点
        tx: pos.x,
        ty: pos.y,
        tz: pos.z,
      },
      2000
    )
    .onUpdate(function (obj) {
      // 动态改变相机位置
      camera.position.set(obj.x, obj.y, obj.z);
      // 动态计算相机视线
      // camera.lookAt(obj.tx, obj.ty, obj.tz);
      // 方式2
      controls.target.set(obj.tx, obj.ty, obj.tz);
      controls.update();
    })
    // .onUpdate(function (obj) {
    //     camera.position.set(obj.x, obj.y, obj.z);
    //     camera.lookAt(obj.tx, obj.ty, obj.tz);
    // })
    // 方式1
    // .onComplete(function(obj){
    //     controls.target.set(obj.tx, obj.ty, obj.tz);
    //     controls.update();
    // })
    .start();
});
