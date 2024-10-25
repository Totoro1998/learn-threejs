import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(2, 3, 4);
// mesh.scale.set(6,6,6);
mesh.updateMatrix(); // 更新矩阵，.matrix会变化
console.log("本地矩阵", mesh.matrix);

export default mesh;
