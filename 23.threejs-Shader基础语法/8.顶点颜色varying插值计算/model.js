import * as THREE from "three";

const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
const vertices = new Float32Array([
  //类型数组创建顶点数据
  -25,
  0,
  0, //顶点1坐标
  25,
  0,
  0, //顶点2坐标
  0,
  40,
  0, //顶点3坐标
]);
// 设置几何体attributes属性的位置属性.position
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标

//类型数组创建顶点颜色color数据
const colors = new Float32Array([
  1,
  0,
  0, //顶点1颜色
  0,
  0,
  1, //顶点2颜色
  0,
  1,
  0, //顶点3颜色
]);
// 设置几何体attributes属性的颜色color属性
//3个为一组,表示一个顶点的颜色数据RGB
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

// 顶点着色器代码
const vertexShader = `
// attribute vec3 color;// 默认提供不用手写；ShaderMaterial还有一个内置变量color,表示顶点的颜色数据，数据来自你定义的几何体顶点颜色属性geometry.attributes.color
varying vec3 vColor; // varying关键字声明一个变量表示顶点颜色插值后的结果
void main(){
  vColor = color;// 顶点颜色数据进行插值计算
  // 投影矩阵 * 模型视图矩阵 * 模型顶点坐标
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
// 片元着色器代码
const fragmentShader = `
varying vec3 vColor;// 顶点片元化后有多少个片元,顶点颜色插值后就有多少个颜色数据
void main() {
    // gl_FragColor = vec4(0.0,1.0,1.0,1.0);
    gl_FragColor = vec4(vColor,1.0);
}
`;
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
  vertexColors: true, //允许设置使用顶点颜色渲染
});
const mesh = new THREE.Mesh(geometry, material);
export default mesh;
