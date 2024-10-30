import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 引入cannon-es
import * as CANNON from "cannon-es";

const world = new CANNON.World();
// 设置物理世界重力加速度
world.gravity.set(0, -9.8, 0);
// world.gravity.set(0, -50, 0);

const sphereMaterial = new CANNON.Material();
// 物理小球：对应threejs的网格小球
const body = new CANNON.Body({
  mass: 0.3, //碰撞体质量
  material: sphereMaterial, //碰撞体材质
  shape: new CANNON.Sphere(0.02),
});
body.position.y = 1;

const audio = new Audio("./碰撞声.wav");
document.getElementById("audio").addEventListener("click", function () {
  audio.volume = 0; //按钮开启声音时候，设置静音
  audio.play();
});

body.addEventListener("collide", (event) => {
  const contact = event.contact;
  const ImpactV = contact.getImpactVelocityAlongNormal();
  console.log("ImpactV", ImpactV);
  // 碰撞越狠，声音越大
  audio.volume = ImpactV / 4.5;
  audio.play();
});

let addBool = false; //标记body是否已经添加到world中
document.getElementById("test").addEventListener("click", function () {
  body.position.y = 1; //点击按钮，body回到下落的初始位置
  if (!addBool) {
    world.addBody(body); //添加到物理世界，才开始下落
    addBool = true;
  }
});

// 物理地面
const groundMaterial = new CANNON.Material();
const groundBody = new CANNON.Body({
  mass: 0, // 质量为0，始终保持静止，不会受到力碰撞或加速度影响
  shape: new CANNON.Plane(),
  material: groundMaterial,
});
// 改变平面默认的方向，法线默认沿着z轴，旋转到平面向上朝着y方向
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); //旋转规律类似threejs 平面
world.addBody(groundBody);

// 设置地面材质和小球材质之间的碰撞反弹恢复系数
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {
  restitution: 0.7, //反弹恢复系数
});
// 把关联的材质添加到物理世界中
world.addContactMaterial(contactMaterial);

// 网格小球
const geometry = new THREE.SphereGeometry(0.02);
const material = new THREE.MeshLambertMaterial({
  // color: 0xffff00,
  map: new THREE.TextureLoader().load("./乒乓球.png"),
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 1;

// 网格地面
const planeGeometry = new THREE.PlaneGeometry(2, 2);
const texture = new THREE.TextureLoader().load("./瓷砖.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(3, 3);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x777777,
  map: texture,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotateX(-Math.PI / 2);

//场景
const scene = new THREE.Scene();
scene.add(mesh, planeMesh); //模型对象添加到场景中

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
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000);
// camera.position.set(292, 223, 185);
camera.position.set(3, 3, 3);
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
  world.step(1 / 60); //更新物理计算
  mesh.position.copy(body.position); // 网格小球与物理小球位置同步
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
