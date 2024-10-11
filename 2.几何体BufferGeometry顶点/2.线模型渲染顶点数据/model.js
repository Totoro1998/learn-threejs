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

// 线条渲染模式，线模型对象也有自己的材质
const material = new THREE.LineBasicMaterial({
  color: 0xffff00, //线条颜色
}); //材质对象
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
const line = new THREE.Line(geometry, material); //线条模型对象

export default line;
