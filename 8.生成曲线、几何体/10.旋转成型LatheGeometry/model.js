import * as THREE from "three";

// Vector2表示的三个点坐标，三个点构成的轮廓相当于两端直线相连接
// const pointsArr = [new THREE.Vector2(50, 60), new THREE.Vector2(25, 0), new THREE.Vector2(50, -60)];
// LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
// pointsArr：旋转几何体的旋转轮廓形状
// 30：旋转圆周方向几何体细分精度

// 通过三个点定义一个二维样条曲线
const curve = new THREE.SplineCurve([new THREE.Vector2(50, 60), new THREE.Vector2(25, 0), new THREE.Vector2(50, -60)]);
//曲线上获取点,作为旋转几何体的旋转轮廓
const pointsArr = curve.getPoints(50);
// LatheGeometry：pointsArr轮廓绕y轴旋转生成几何体曲面
const geometry = new THREE.LatheGeometry(pointsArr, 30);

// 0, Math.PI：旋转的开始角度和结束角度
// const geometry = new THREE.LatheGeometry(pointsArr, 30,0, Math.PI);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide, //两面可见
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
