import * as THREE from "three";

const geometry = new THREE.SphereGeometry(5);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);

// 空间中p点坐标
const p = new THREE.Vector3(50, 0, 0);

const T = new THREE.Matrix4();
T.makeTranslation(50, 0, 0); //平移矩阵
const R = new THREE.Matrix4();
R.makeRotationZ(Math.PI / 2); //旋转矩阵

// p点矩阵变换
// p.applyMatrix4(T);// 先平移
// p.applyMatrix4(R);// 后旋转

// R * T * p:先平移、后旋转
const modelMatrix = R.clone().multiply(T);
p.applyMatrix4(modelMatrix);

// // T * R * p：先旋转、后平移
// const modelMatrix = R.clone().multiply(T);
// p.applyMatrix4(modelMatrix);

mesh.position.copy(p); //用小球可视化p点位置

export default mesh;
