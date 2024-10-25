import * as THREE from "three";

const geometry = new THREE.BufferGeometry();
//类型数组创建顶点数据
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  50,
  0,
  0, //顶点2坐标
  0,
  100,
  0, //顶点3坐标
  0,
  0,
  10, //顶点4坐标
  0,
  0,
  100, //顶点5坐标
  50,
  0,
  10, //顶点6坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff, //材质颜色
  side: THREE.FrontSide,
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

// 已知三角形三个顶点的坐标，计算三角形法线方向
const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(50, 0, 0);
const p3 = new THREE.Vector3(0, 100, 0);

// const p1 = new THREE.Vector3(0, 0, 10);
// const p2 = new THREE.Vector3(0, 0, 100);
// const p3 = new THREE.Vector3(50, 0, 10);

// 按照三角形顶点的顺序，构建1指向2的向量，2指向3的向量
const a = p2.clone().sub(p1);
const b = p3.clone().sub(p2);

const c = a.clone().cross(b);
c.normalize(); //向量c归一化表示三角形法线方向

// 可视化向量a和b叉乘结果：向量c
const arrow = new THREE.ArrowHelper(c, p3, 50, 0xff0000);
mesh.add(arrow);

export default mesh;
