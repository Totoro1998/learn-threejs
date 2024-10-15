import * as THREE from "three";

// Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
  // 按照特定顺序，依次书写多边形顶点坐标
  new THREE.Vector2(-50, -50), //多边形起点
  new THREE.Vector2(-50, 50),
  new THREE.Vector2(50, 50),
  new THREE.Vector2(50, -50),
]);

//拉伸造型
const geometry = new THREE.ExtrudeGeometry(
  shape, //二维轮廓
  {
    depth: 20, //拉伸长度
    // bevelThickness: 5, //倒角尺寸:拉伸方向
    // bevelSize: 5, //倒角尺寸:垂直拉伸方向
    // bevelSegments: 20, //倒圆角：倒角细分精度，默认3
    // bevelSegments: 1, //倒直角
    bevelEnabled: false, //禁止倒角,默认true
  }
);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  // wireframe:true,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
