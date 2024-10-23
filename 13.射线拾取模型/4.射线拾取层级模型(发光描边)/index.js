import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 引入后处理扩展库EffectComposer.js
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// 引入渲染器通道RenderPass
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
// 引入OutlinePass通道
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";

// 伽马校正后处理Shader
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
// ShaderPass功能：使用后处理Shader创建后处理通道
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

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

// 设置后处理，renderer.outputEncoding 无效
//

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
const composer = new EffectComposer(renderer);
// 创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
// 设置renderPass通道
composer.addPass(renderPass);

// 创建OutlinePass通道
const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
const outlinePass = new OutlinePass(v2, scene, camera);
// outlinePass.selectedObjects = [mesh];
outlinePass.visibleEdgeColor.set(0x00ffff);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
composer.addPass(outlinePass);

// 创建伽马校正通道
const gammaPass = new ShaderPass(GammaCorrectionShader);
composer.addPass(gammaPass);
// console.log('GammaCorrectionShader',GammaCorrectionShader);

// 渲染循环
function render() {
  composer.render();
  // renderer.render(scene, camera);
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

addEventListener("click", function (event) {
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
    // 通过.ancestors属性判断那个模型对象被选中了
    outlinePass.selectedObjects = [intersects[0].object.ancestors];
  }
});
