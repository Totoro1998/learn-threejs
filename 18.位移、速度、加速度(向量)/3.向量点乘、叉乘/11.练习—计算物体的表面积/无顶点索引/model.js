import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  80,
  0,
  0, //顶点2坐标
  80,
  80,
  0, //顶点3坐标

  0,
  0,
  0, //顶点4坐标   和顶点1位置相同
  80,
  80,
  0, //顶点5坐标  和顶点3位置相同
  0,
  80,
  0, //顶点6坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  // side: THREE.FrontSide, //默认只有正面可见
  // side: THREE.BackSide, //设置只有背面可见
  side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

const pos = geometry.attributes.position;
let S = 0; // 表示物体表面积
for (let i = 0; i < pos.count; i += 3) {
  const p1 = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
  const p2 = new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1));
  const p3 = new THREE.Vector3(pos.getX(i + 2), pos.getY(i + 2), pos.getZ(i + 2));
  S += AreaOfTriangle(p1, p2, p3); //所有三角形面积累加
}
console.log("S", S);
//三角形面积计算
function AreaOfTriangle(p1, p2, p3) {
  // 三角形两条边构建两个向量
  const a = p2.clone().sub(p1);
  const b = p3.clone().sub(p1);
  // 两个向量叉乘结果c的几何含义：a.length()*b.length()*sin(θ)
  const c = a.clone().cross(b);
  // 三角形面积计算
  const S = 0.5 * c.length();
  return S;
}

export default mesh;
