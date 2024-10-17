import * as THREE from "three";

// 长方体网格模型
const geometry = new THREE.BoxGeometry(50, 100, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 50;

const planeGeometry = new THREE.PlaneGeometry(400, 250);
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x999999,
});
// 矩形平面网格模型
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotateX(-Math.PI / 2);

const group = new THREE.Group();
group.add(mesh, planeMesh);

// 设置产生投影的网格模型
mesh.castShadow = true;
// 设置接收阴影的投影面
planeMesh.receiveShadow = true;

export default group;
