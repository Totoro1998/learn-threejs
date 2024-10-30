import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as CANNON from "cannon-es";

// 网格凸多面体
const loader = new GLTFLoader();
const gltf = await loader.loadAsync("./凸多面体.glb");
const mesh = gltf.scene.getObjectByName("多面体"); //获取凸多面体网格模型
mesh.position.y = 5;

console.log("mesh.geometry", mesh.geometry);

const world = new CANNON.World();
// 设置物理世界重力加速度
world.gravity.set(0, -9.8, 0);

const box3 = new THREE.Box3();
box3.expandByObject(mesh); //计算模型包围盒
const size = new THREE.Vector3();
box3.getSize(size); //包围盒计算凸多面体的尺寸

const boxMaterial = new CANNON.Material();
const vertices = []; //所有三角形顶点位置数据
const faces = []; //所有三角形面的索引值
const pos = mesh.geometry.attributes.position; //顶点位置
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i);
  const y = pos.getY(i);
  const z = pos.getZ(i);
  vertices.push(new CANNON.Vec3(x, y, z));
}
const index = mesh.geometry.index.array; //三角形顶点索引
for (let i = 0; i < index.length; i += 3) {
  const a = index[i];
  const b = index[i + 1];
  const c = index[i + 2];
  faces.push([a, b, c]);
}
// CannonJS的凸多面体ConvexPolyhedron
const shape = new CANNON.ConvexPolyhedron({
  vertices: vertices,
  faces: faces,
});
// 简化写法
// const shape = new CANNON.ConvexPolyhedron({ vertices, faces });
// 物理凸多面体
const body = new CANNON.Body({
  mass: 0.3, //碰撞体质量
  material: boxMaterial, //碰撞体材质
  shape: shape,
});
body.position.y = 5;
world.addBody(body);

// 设置凸多面体下落的初始姿态角度
mesh.rotation.set(Math.PI / 3, Math.PI / 3, Math.PI / 3);
body.quaternion.setFromEuler(Math.PI / 3, Math.PI / 3, Math.PI / 3);

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
  restitution: 0.2,
});
// 把关联的材质添加到物理世界中
world.addContactMaterial(contactMaterial);

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
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
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
  mesh.position.copy(body.position); // 同步位置
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
