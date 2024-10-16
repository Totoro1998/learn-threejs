import * as THREE from "three";

// 下面代码绘制了一个矩形+扇形的轮廓，圆心在(100, 0),半径50。
const shape = new THREE.Shape();
shape.lineTo(100, 0); //.currentPoint变为(100,0)
// 圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言，而不是坐标原点
shape.arc(0, 0, 50, 0, Math.PI / 2); //.currentPoint变为圆弧线结束点坐标
// 绘制直线，直线起点：圆弧绘制结束的点  直线结束点：(0, 0)
shape.lineTo(0, 50);

// shape:填充轮廓  shape有直线之外的曲线，如果默认渲染不光滑，可以设置参数2提升
const geometry = new THREE.ShapeGeometry(shape, 20);
// const geometry = new THREE.ExtrudeGeometry(shape, {
//   depth: 20, //拉伸长度
//   bevelEnabled: false, //禁止倒角
//   curveSegments: 20, //shape对应曲线细分数
// });
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
