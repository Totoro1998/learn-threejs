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
// SMAA抗锯齿通道
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";
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
camera.position.set(82, 53, 165);
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
//获取.setPixelRatio()设置的设备像素比
const pixelRatio = renderer.getPixelRatio();
// 创建SMAAPass抗锯齿通道
// width、height是canva画布的宽高度
const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
composer.addPass(smaaPass);

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
  css2Renderer.render(scene, camera);
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
const span = document.getElementById("name"); // 用于修改标签内容
let chooseObj = null;
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
    //tag会标注在intersects[0].object.ancestors模型的局部坐标系原点位置
    intersects[0].object.ancestors.add(tag);
    chooseObj = intersects[0].object.ancestors;
    // 获取模型对象对应的标注点
    // console.log('intersects[0].object.ancestors.name', intersects[0].object.ancestors.name);
    // const obj = model.getObjectByName(intersects[0].object.ancestors.name + '标注');
    // //tag会标注在空对象obj对应的位置
    // obj.add(tag);
    // chooseObj = obj;
    span.innerHTML = intersects[0].object.ancestors.name; // 修改标签数据
  } else {
    if (chooseObj) {
      //把原来选中模型对应的标签和发光描边隐藏
      outlinePass.selectedObjects = []; //无发光描边
      chooseObj.remove(tag); //从场景移除
    }
  }
});
