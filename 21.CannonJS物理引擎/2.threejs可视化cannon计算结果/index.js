import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 引入cannon-es
import * as CANNON from "cannon-es";

const world = new CANNON.World();
// 设置物理世界重力加速度
// world.gravity.set(0, -9.8, 0);
world.gravity.set(0, -50, 0);

// 物理小球：对应threejs的网格小球
const body = new CANNON.Body({
  mass: 0.3, //碰撞体质量
  shape: new CANNON.Sphere(1),
});
body.position.y = 100;
world.addBody(body);

// 网格小球
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 100;

//场景
const scene = new THREE.Scene();
scene.add(mesh); //模型对象添加到场景中

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
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const fixedTimeStep = 1 / 60;
// 渲染循环
function render() {
  world.step(fixedTimeStep);
  // 渲染循环中，同步物理球body与网格球mesh的位置
  mesh.position.copy(body.position);
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
