import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  100,
  25,
  0, //顶点1坐标
  100,
  -25,
  25, //顶点2坐标
  100,
  -25,
  -25, //顶点3坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff, //材质颜色
  side: THREE.FrontSide, //默认只有正面可见
  // side: THREE.BackSide, //设置只有背面可见
  side: THREE.DoubleSide, //两面可见
});
// 网格模型本质：一个一个三角形(面)构成
const mesh = new THREE.Mesh(geometry, material);

// 创建射线对象Ray
const ray = new THREE.Ray();
// 设置射线起点
ray.origin = new THREE.Vector3(0, 0, 0);
// 设置射线方向射线方向沿着x轴
ray.direction = new THREE.Vector3(1, 0, 0).normalize();

// 三角形三个点坐标
const p1 = new THREE.Vector3(100, 25, 0);
const p2 = new THREE.Vector3(100, -25, 25);
const p3 = new THREE.Vector3(100, -25, -25);
const point = new THREE.Vector3(); //用来记录射线和三角形的交叉点
// `.intersectTriangle()`计算射线和三角形是否相交叉，相交返回交点，不相交返回null
// 参数4表示是否进行背面剔除
// p1,p2,p3理解为一个三角形，有正反两面，一面是正面，一面是反面，关于三角形正反面可以参考2.3节讲解。
//在一面观察p1,p2,p3是逆时针方向，表示正面，另一面p1,p2,p3就是顺时针方向，表示背面
const result = ray.intersectTriangle(p1, p2, p3, false, point);
console.log("交叉点坐标", point);
console.log("查看是否相交", result);

// 参数4设为true，进行背面剔除，返回值null，虽然交叉，但背面对着射线，视为无效
const r = ray.intersectTriangle(p1, p2, p3, true, point);
console.log("查看是否相交", r);

export default mesh;
