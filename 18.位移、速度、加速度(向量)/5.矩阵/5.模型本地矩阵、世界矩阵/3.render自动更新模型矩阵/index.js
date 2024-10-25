import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//场景
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(2, 3, 4);
const group = new THREE.Group();
group.add(mesh);
scene.add(group);
group.position.set(2, 3, 4);

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
const ambient = new THREE.AmbientLight(0xffffff, 5);
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

// 渲染循环
function render() {
  // render渲染时候，会获取模型`.position`等属性更新计算模型矩阵值
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

console.log("本地矩阵", mesh.matrix);
console.log("世界矩阵", mesh.matrixWorld);

const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
