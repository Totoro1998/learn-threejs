import * as THREE from "three";

// 创建多段线条的顶点数据
const p1 = new THREE.Vector3(0, 0, 100);
const p2 = new THREE.Vector3(0, 0, 30);
const p3 = new THREE.Vector3(0, 0, 0);
const p4 = new THREE.Vector3(30, 0, 0);
const p5 = new THREE.Vector3(100, 0, 0);
// 1. 3D直线线段
const line1 = new THREE.LineCurve3(p1, p2);
// 2. 三维二次贝塞尔曲线
const curve = new THREE.QuadraticBezierCurve3(p2, p3, p4);
// 3. 3D直线线段
const line2 = new THREE.LineCurve3(p4, p5);

const CurvePath = new THREE.CurvePath();
// 三条线拼接为一条曲线
CurvePath.curves.push(line1, curve, line2);

// CurvePath:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
const geometry = new THREE.TubeGeometry(CurvePath, 50, 2, 25);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide, //双面显示看到管道内壁
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
