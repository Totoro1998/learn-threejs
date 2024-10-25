import * as THREE from "three";

// 已知条件
// 直线经过两点坐标A、B
const A = new THREE.Vector3(0, 0, 0);
const B = new THREE.Vector3(100, 0, 0);
// 直线外一点p
const p = new THREE.Vector3(50, 0, 30);

// 小球可视化四个坐标点
const group = new THREE.Group();
const AMesh = createSphereMesh(0xffff00, 2);
AMesh.position.copy(A);
const BMesh = createSphereMesh(0xffff00, 2);
BMesh.position.copy(B);
const pMesh = createSphereMesh(0xff0000, 2);
pMesh.position.copy(p);
group.add(AMesh, BMesh, pMesh);

// Line可视化线段AB
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([A.x, A.y, A.z, B.x, B.y, B.z]);
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
const material = new THREE.LineBasicMaterial({
  color: 0xffff00,
});
const line = new THREE.LineLoop(geometry, material);
group.add(line);
// 创建小球mesh
function createSphereMesh(color, R) {
  const geometry = new THREE.SphereGeometry(R);
  const material = new THREE.MeshLambertMaterial({
    color: color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const AB = B.clone().sub(A);
const width = AB.length(); //AB两点距离

// ApB构建一个三角形，其中两条边构建向量a、向量b
const a = A.clone().sub(p);
const b = B.clone().sub(p);
const c = a.clone().cross(b);
// const S = 0.5*c.length();//叉乘结果长度的一半是三角形ApB的面积

const H = c.length() / width; // 点到直线的距离

console.log("点到直线的距离", H);

export default group;
