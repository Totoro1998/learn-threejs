import * as THREE from "three";

// 三维向量Vector3创建一组顶点坐标
const arr = [
  new THREE.Vector3(-50, 20, 90),
  new THREE.Vector3(-10, 40, 40),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(60, -60, 0),
  new THREE.Vector3(70, 0, 80),
];
// 三维样条曲线
const curve = new THREE.CatmullRomCurve3(arr);

// // 二维向量Vector2创建一组顶点坐标
// const arr = [
//     new THREE.Vector2(-100, 0),
//     new THREE.Vector2(0, 30),
//     new THREE.Vector2(100, 0),
// ];
// // 二维样条曲线
// const curve = new THREE.SplineCurve(arr);

const pointsArr = curve.getPoints(100); //曲线上获取点
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr); //读取坐标数据赋值给几何体顶点

// 线材质
const material = new THREE.LineBasicMaterial({
  color: 0x00fffff,
});
// 线模型
const line = new THREE.Line(geometry, material);

// 用点模型可视化样条曲线经过的顶点位置
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(arr);
const material2 = new THREE.PointsMaterial({
  color: 0xff00ff,
  size: 10,
});
//点模型对象
const points = new THREE.Points(geometry2, material2);

const group = new THREE.Group();
group.add(line, points);

export default group;
