import * as THREE from "three";

const geometry = new THREE.SphereGeometry(5);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);

const mat4 = new THREE.Matrix4();
// 创建一个平移矩阵(沿着x轴平移50)
// 1, 0, 0, x,
// 0, 1, 0, y,
// 0, 0, 1, z,
// 0, 0, 0, 1
mat4.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 0, 0, 1]; // 按列

// 空间中p点坐标
const p = new THREE.Vector3(50, 0, 0);
// 矩阵对p点坐标进行平移变换
p.applyMatrix4(mat4);
console.log("查看平移后p点坐标", p); // 100,0,0

mesh.position.copy(p); //用小球可视化p点位置

export default mesh;
