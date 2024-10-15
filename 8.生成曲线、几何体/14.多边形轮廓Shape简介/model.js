import * as THREE from "three";

const shape = new THREE.Shape();
// console.log('currentPoint',shape.currentPoint);
shape.moveTo(10, 0); //.currentPoint变为(10,0)
// 绘制直线线段，起点(10,0)，结束点(100,0)
shape.lineTo(100, 0); //.currentPoint变为(100, 0)
shape.lineTo(100, 100); //.currentPoint变为(100, 100)
shape.lineTo(10, 100); //.currentPoint变为(10, 100)

// ShapeGeometry填充Shape获得一个平面几何体
// const geometry = new THREE.ShapeGeometry(shape);
// ExtrudeGeometry拉伸Shape获得一个长方体几何体
const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: 20, //拉伸长度
  bevelEnabled: false, //禁止倒角
});
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
