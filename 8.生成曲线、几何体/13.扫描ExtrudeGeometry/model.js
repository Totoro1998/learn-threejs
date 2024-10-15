import * as THREE from "three";

// 1.扫描轮廓：Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
  // 按照特定顺序，依次书写多边形顶点坐标
  new THREE.Vector2(0, 0), //多边形起点
  new THREE.Vector2(0, 10),
  new THREE.Vector2(10, 10),
  new THREE.Vector2(10, 0),
]);

// 2.扫描轨迹：创建轮廓的扫描轨迹(3D样条曲线)
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10, -50, -50),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(8, 50, 50),
  new THREE.Vector3(-5, 0, 100),
]);

//3.扫描造型：扫描默认没有倒角
const geometry = new THREE.ExtrudeGeometry(
  shape, //扫描轮廓
  {
    extrudePath: curve, //扫描轨迹
    steps: 100, //沿着路径细分精度，越大越光滑
  }
);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  // wireframe:true,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
