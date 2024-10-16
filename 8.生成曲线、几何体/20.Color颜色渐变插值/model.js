// 引入three.js
import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
]);
const pointsArr = curve.getSpacedPoints(100); //曲线取点
geometry.setFromPoints(pointsArr); //pointsArr赋值给顶点位置属性

const pos = geometry.attributes.position;
const count = pos.count; //顶点数量
// 计算每个顶点的颜色值
const colorsArr = [];
// 根据顶点距离起点远近进行颜色插值计算
const c1 = new THREE.Color(0x00ffff); //曲线起点颜色 青色
const c2 = new THREE.Color(0xffff00); //曲线结束点颜色 黄色
for (let i = 0; i < count; i++) {
  const percent = i / count; //点索引值相对所有点数量的百分比
  //根据顶点位置顺序大小设置颜色渐变
  const c = c1.clone().lerp(c2, percent); //颜色插值计算
  colorsArr.push(c.r, c.g, c.b);
}

//类型数组创建顶点颜色color数据
const colors = new Float32Array(colorsArr);
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

const material = new THREE.LineBasicMaterial({
  vertexColors: true, //使用顶点颜色渲染
});
const line = new THREE.Line(geometry, material);

export default line;
