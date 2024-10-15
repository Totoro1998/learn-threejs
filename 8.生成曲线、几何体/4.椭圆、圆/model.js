import * as THREE from "three";

// 参数1和2表示椭圆中心坐标  参数3和4表示x和y方向半径
// const arc = new THREE.EllipseCurve(0, 0, 120, 50);
// const arc = new THREE.EllipseCurve(0, 0, 50, 50);//x和y方向半径相同就是圆形效果
// 圆弧，参数3表示半径
// const arc = new THREE.ArcCurve(0, 0, 60);

// 逆时针绘制圆弧，参数5默认false，就是逆时针
const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI / 2, false);
// 顺时针绘制圆弧
// const arc = new THREE.ArcCurve(0, 0, 100, 0, Math.PI / 2, true);

//曲线上取点，参数表示取点细分精度
const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点
// const pointsArr = arc.getPoints(10);//取点数比较少，圆弧线不那么光滑

const geometry = new THREE.BufferGeometry();
// 把数组pointsArr里面的坐标数据提取出来，赋值给`geometry.attributes.position`属性
geometry.setFromPoints(pointsArr);

// 线材质
const material = new THREE.LineBasicMaterial({
  color: 0x00fffff,
});
// 线模型
const line = new THREE.Line(geometry, material);

export default line;
