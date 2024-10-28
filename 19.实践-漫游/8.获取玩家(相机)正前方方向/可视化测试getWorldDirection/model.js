// 引入three.js
import * as THREE from "three";

const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(50, 0, 0);
const group = new THREE.Group();
group.add(mesh); //网格模型添加到组中
group.position.set(50, 0, 0);

//可视化mesh的局部坐标系
const meshAxesHelper = new THREE.AxesHelper(50);
mesh.add(meshAxesHelper);

// 模型没有任何旋转情况，getWorldDirection()结果(0,0,1)
// 模型绕y旋转90度情况，getWorldDirection()结果(1,0,0)
mesh.rotateY(Math.PI / 2);
const dir = new THREE.Vector3();
mesh.getWorldDirection(dir);
console.log("dir", dir);

export default group;
