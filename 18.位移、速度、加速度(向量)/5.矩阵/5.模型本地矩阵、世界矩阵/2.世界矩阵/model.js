import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(2, 3, 4);
const group = new THREE.Group();
group.add(mesh);
group.position.set(2, 3, 4);

group.updateMatrixWorld(); // group和子对象的世界矩阵、本地矩阵属性会更新

console.log("本地矩阵", mesh.matrix);
console.log("世界矩阵", mesh.matrixWorld);

export default group;
