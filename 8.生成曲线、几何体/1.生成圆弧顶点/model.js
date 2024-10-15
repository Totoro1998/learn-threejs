import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
// 线材质
const material = new THREE.LineBasicMaterial({
  color: 0xff0000, //线条颜色
});
const R = 100; //圆弧半径
const N = 50; //分段数量
// 批量生成圆弧上的顶点数据
const arr = [];
const sp = (2 * Math.PI) / N; //两个相邻点间隔弧度
// const sp = 1 * Math.PI / N;//半圆弧
for (let i = 0; i < N + 1; i++) {
  const angle = sp * i;
  // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
  const x = R * Math.cos(angle);
  const y = R * Math.sin(angle);
  arr.push(x, y, 0);
}
// // 设置圆心坐标
// const cx = 200;
// const cy = 100;
// for (let i = 0; i < N + 1; i++) {
//     const angle = sp * i;//当前点弧度
//     const x = cx + R * Math.sin(angle);
//     const y = cy + R * Math.cos(angle);
//     arr.push(x, y, 0);
// }
//类型数组创建顶点数据
const vertices = new Float32Array(arr);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.LineLoop(geometry, material);//线条模型对象
const line = new THREE.Line(geometry, material);

export default line;
