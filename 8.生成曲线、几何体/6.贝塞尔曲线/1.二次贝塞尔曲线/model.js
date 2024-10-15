import * as THREE from "three";

// p1、p2、p3表示三个点坐标
// p1、p3是曲线起始点，p2是曲线的控制点
// const p1 = new THREE.Vector2(-80, 0);
// const p2 = new THREE.Vector2(20, 100);
// const p3 = new THREE.Vector2(80, 0);
// // 二维二次贝赛尔曲线
// const curve = new THREE.QuadraticBezierCurve(p1, p2, p3);

// p1、p2、p3表示三个点坐标
const p1 = new THREE.Vector3(-80, 0, 0);
const p2 = new THREE.Vector3(20, 100, 0);
const p3 = new THREE.Vector3(80, 0, 100);
// 三维二次贝赛尔曲线
const curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);

const pointsArr = curve.getPoints(100); //曲线上获取点
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr); //读取坐标数据赋值给几何体顶点

// 线材质
const material = new THREE.LineBasicMaterial({
  color: 0x00fffff,
});
// 线模型
const line = new THREE.Line(geometry, material);

// 可视化p1、p2、p3三个点的位置，并用直线相连接，便于观察贝塞尔曲线的绘制规律
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3]);
const material2 = new THREE.PointsMaterial({
  color: 0xff00ff,
  size: 10,
});
//点模型对象
const points = new THREE.Points(geometry2, material2);
// 三个点构成的线条
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());

const group = new THREE.Group();
group.add(line, points, line2);

export default group;
