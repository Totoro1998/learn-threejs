import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 引入cannon-es
import * as CANNON from "cannon-es";

const world = new CANNON.World();
// 设置物理世界重力加速度
world.gravity.set(0, -9.8, 0);

const boxMaterial = new CANNON.Material();
// 物理长方体
const body = new CANNON.Body({
  mass: 0.3, //碰撞体质量
  material: boxMaterial, //碰撞体材质
  // 长方体xyz方向尺寸分别为：1.0、0.4、0.6
  shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.2, 0.3)),
});

body.position.y = 5;
world.addBody(body);

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
const contactMaterial = new CANNON.ContactMaterial(groundMaterial, boxMaterial, {
  restitution: 0.2, // 如果长方体表示一个箱子，反弹恢复系数就低一点
});
// 把关联的材质添加到物理世界中
world.addContactMaterial(contactMaterial);

// 网格长方体
const geometry = new THREE.BoxGeometry(1.0, 0.4, 0.6);
const material = new THREE.MeshLambertMaterial({
  map: new THREE.TextureLoader().load("./箱子.jpg"),
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 5;

// 设置箱子下落的初始姿态角度
mesh.rotation.set(Math.PI / 3, Math.PI / 3, Math.PI / 3);
body.quaternion.setFromEuler(Math.PI / 3, Math.PI / 3, Math.PI / 3);

// 网格地面
const planeGeometry = new THREE.PlaneGeometry(20, 20);
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
const ambient = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambient);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000);
camera.position.set(10, 10, 10);
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
  mesh.position.copy(body.position); // 网格长方体与物理长方体位置同步
  mesh.quaternion.copy(body.quaternion); //同步姿态角度
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
