import * as THREE from "three";

// const geometry = new THREE.PlaneGeometry(100, 50);
// const geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
// const geometry = new THREE.SphereGeometry(60, 25, 25); //球体

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  25,
  0,
  0, //顶点2坐标
  50,
  0,
  0, //顶点3坐标
  75,
  0,
  0, //顶点4坐标
  100,
  0,
  0, //顶点5坐标
]);
// 设置几何体attributes属性的位置属性
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标

// 顶点着色器代码
const vertexShader = `
void main(){
  gl_PointSize = 20.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
// 片元着色器代码
const fragmentShader = `
void main() {
  // vec2(0.5, 0.5)是方形点的圆心
  float r = distance(gl_PointCoord, vec2(0.5, 0.5));
  if(r < 0.5){
    // 方形区域片元距离几何中心半径小于0.5，像素颜色设置红色
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
  }else {
    // 方形区域距离几何中心半径不小于0.5的片元剪裁舍弃掉：
    discard;
  }
}
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
});

// const mesh = new THREE.Mesh(geometry, material);
const mesh = new THREE.Points(geometry, material);

export default mesh;
