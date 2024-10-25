import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

const pos = geometry.attributes.position;
const index = geometry.index;
console.log("geometry", geometry.index);
let S = 0; //表示物体表面积
for (var i = 0; i < index.count; i += 3) {
  // 获取当前三角形对应三个顶点的索引
  const i1 = index.getX(i);
  const i2 = index.getX(i + 1);
  const i3 = index.getX(i + 2);

  //获取三个顶点的坐标
  const p1 = new THREE.Vector3(pos.getX(i1), pos.getY(i1), pos.getZ(i1));
  const p2 = new THREE.Vector3(pos.getX(i2), pos.getY(i2), pos.getZ(i2));
  const p3 = new THREE.Vector3(pos.getX(i3), pos.getY(i3), pos.getZ(i3));
  S += AreaOfTriangle(p1, p2, p3);
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
