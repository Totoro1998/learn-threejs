// 引入three.js
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  50,
  0,
  0, //顶点2坐标
  0,
  25,
  0, //顶点3坐标
]);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

//类型数组创建顶点颜色color数据
const colors = new Float32Array([
  1,
  0,
  0, //顶点1颜色
  0,
  0,
  1, //顶点2颜色
  0,
  1,
  0, //顶点3颜色
]);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB

// // 点渲染模式
// const material = new THREE.PointsMaterial({
//   // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
//   vertexColors: true, //默认false，设置为true表示使用顶点颜色渲染
//   size: 20.0, //点对象像素尺寸
// });
// const model = new THREE.Points(geometry, material); //点模型对象

// // 线模型渲染几何体顶点颜色，可以看到直线颜色渐变效果
// const material = new THREE.LineBasicMaterial({
//   vertexColors: true, //默认false，设置为true表示使用顶点颜色渲染
// });
// const model = new THREE.LineSegments(geometry, material);
// model.position.y = 2;

// 定义好几何体顶点颜色，使用Mesh渲染，Mesh产生颜色渐变效果
const material = new THREE.MeshBasicMaterial({
  // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
  vertexColors: true, //默认false，设置为true表示使用顶点颜色渲染
  side: THREE.DoubleSide, //两面可见
});
const model = new THREE.Mesh(geometry, material);

export default model;
