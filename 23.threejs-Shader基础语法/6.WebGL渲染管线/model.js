import * as THREE from "three";

// const geometry = new THREE.PlaneGeometry(100, 50);
const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  // 三角形1顶点坐标
  -50,
  -25,
  0, //顶点1坐标
  50,
  -25,
  0, //顶点2坐标
  50,
  25,
  0, //顶点3坐标
  // 三角形2顶点坐标
  -50,
  -25,
  0, //顶点4坐标   和顶点1位置相同
  50,
  25,
  0, //顶点5坐标  和顶点3位置相同
  -50,
  25,
  0, //顶点6坐标
]);
const attribute = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体顶点位置.attributes.position
geometry.attributes.position = attribute;

// 顶点着色器代码
const vertexShader = `
void main(){
  // 投影矩阵 * 模型视图矩阵 * 模型顶点坐标
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
}
`;
// 片元着色器代码
const fragmentShader = `
void main() {
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
}
`;
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
export default mesh;
