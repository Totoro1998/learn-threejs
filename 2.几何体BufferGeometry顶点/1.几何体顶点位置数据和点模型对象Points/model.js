// 引入three.js
import * as THREE from "three";

// 创建一个几何体对象
const geometry = new THREE.BufferGeometry();

// 类型数组创建顶点数据
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
const position = new THREE.BufferAttribute(vertices, 3);

// 设置几何体attributes属性的位置属性
geometry.attributes.position = position;

// 点模型Points有自己对应的点材质PointsMaterial
const material = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 10.0, //点对象像素尺寸
});

// 点模型Points (opens new window)和网格模型Mesh一样，都是threejs的一种模型对象，只是大部分情况下都是用Mesh表示物体
const points = new THREE.Points(geometry, material);

export default points;
