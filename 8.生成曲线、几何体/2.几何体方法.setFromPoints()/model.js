import * as THREE from "three";

const geometry = new THREE.BufferGeometry();
// 点材质
const material = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 10.0, //点对象像素尺寸
});
// const arr = [0, 0, 0, 0, 100, 0, 0, 100, 100, 0, 0, 100];
// const vertices = new Float32Array(arr);
// const attribute = new THREE.BufferAttribute(vertices, 3);
// geometry.attributes.position = attribute;
// const pointsArr = [
//   // 三维向量Vector3表示的坐标值
//   new THREE.Vector3(0, 0, 0),
//   new THREE.Vector3(0, 100, 0),
//   new THREE.Vector3(0, 100, 100),
//   new THREE.Vector3(0, 0, 100),
// ];

const pointsArr = [
  // 三维向量Vector2表示的坐标值
  new THREE.Vector2(0, 0),
  new THREE.Vector2(100, 0),
  new THREE.Vector2(100, 100),
  new THREE.Vector2(0, 100),
];
// 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
geometry.setFromPoints(pointsArr);

// 点模型
const points = new THREE.Points(geometry, material);

export default points;
