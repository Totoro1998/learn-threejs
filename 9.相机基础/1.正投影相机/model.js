import * as THREE from "three";

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(100, 100, 100);
geometry.translate(0, 50, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
// 一片阵列的长方体 尺寸范围大概4000左右
for (let i = -9; i < 10; i++) {
  for (let j = -9; j < 10; j++) {
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // 在XOZ平面上分布
    mesh.position.set(i * 200, 0, j * 200);
    group.add(mesh);
  }
}

export default group;
