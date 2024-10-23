import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入CSS2渲染器CSS2DRenderer
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

import model from "./model.js"; //模型对象
import tag from "./tag.js";
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

// 创建一个CSS2渲染器CSS2DRenderer
const css2Renderer = new CSS2DRenderer();
css2Renderer.setSize(width, height);
// HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
css2Renderer.domElement.style.position = "absolute";
css2Renderer.domElement.style.top = "0px"; //具体值根据canvas画布位置来定
//设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
css2Renderer.domElement.style.pointerEvents = "none";
document.body.appendChild(css2Renderer.domElement);

// 渲染循环
function render() {
  TWEEN.update();
  css2Renderer.render(scene, camera);
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
const span = document.getElementById("name");
let chooseObj = null;
const divTag = document.getElementById("tag");
renderer.domElement.addEventListener("click", function (event) {
  const px = event.offsetX;
  const py = event.offsetY;
  //屏幕坐标转标准设备坐标
  const x = (px / window.innerWidth) * 2 - 1;
  const y = -(py / window.innerHeight) * 2 + 1;
  const raycaster = new THREE.Raycaster();
  //.setFromCamera()在点击位置生成raycaster的射线ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const cunchu = model.getObjectByName("存储罐");
  // 射线拾取模型对象(包含多个Mesh)
  // 可以给待选对象的所有子孙后代Mesh，设置一个祖先属性ancestors,值指向祖先(待选对象)
  for (let i = 0; i < cunchu.children.length; i++) {
    const group = cunchu.children[i];
    //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
    group.traverse(function (obj) {
      if (obj.isMesh) {
        obj.ancestors = group;
      }
    });
  }
  // 射线交叉计算拾取模型
  const intersects = raycaster.intersectObjects(cunchu.children);
  console.log("intersects", intersects);
  if (intersects.length > 0) {
    //tag会标注在intersects[0].object.ancestors模型的局部坐标系原点位置
    intersects[0].object.ancestors.add(tag);
    chooseObj = intersects[0].object.ancestors;
    // 获取模型对象对应的标注点
    // console.log('intersects[0].object.ancestors.name', intersects[0].object.ancestors.name);
    // const obj = model.getObjectByName(intersects[0].object.ancestors.name + '标注');
    // //tag会标注在空对象obj对应的位置
    // obj.add(tag);
    // chooseObj = obj;
    span.innerHTML = intersects[0].object.ancestors.name; //修改标签数据

    new TWEEN.Tween({ opacity: 0 })
      .to({ opacity: 1.0 }, 1000)
      .onUpdate(function (obj) {
        //动态更新div元素透明度
        divTag.style.opacity = obj.opacity;
      })
      .start();
  }
});

// 鼠标单击按钮，关闭HTML标签
document.getElementById("close").addEventListener("click", function () {
  if (chooseObj) {
    // chooseObj.remove(tag); //从场景移除
    new TWEEN.Tween({ opacity: 1 })
      .to({ opacity: 0 }, 400)
      .onUpdate(function (obj) {
        //动态更新div元素透明度
        divTag.style.opacity = obj.opacity;
      })
      .onComplete(function () {
        // 动画结束再从场景中移除标签
        chooseObj.remove(tag); //从场景移除
      })
      .start();
  }
});
