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
for (let i = 0; i < count; i++) {
  const percent = i / count; //点索引值相对所有点数量的百分比
  //根据顶点位置顺序大小设置颜色渐变
  // 红色分量从0到1变化，蓝色分量从1到0变化
  colorsArr.push(percent, 0, 1 - percent); //蓝色到红色渐变色
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
