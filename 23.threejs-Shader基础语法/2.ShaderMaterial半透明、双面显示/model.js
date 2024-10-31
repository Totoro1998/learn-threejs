import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 50);
// 顶点着色器代码
const vertexShader = `
void main(){
  // 投影矩阵 * 模型视图矩阵 * 模型顶点坐标
  gl_Position = projectionMatrix * modelViewMatrix*vec4( position, 1.0 );
}
`;
// 片元着色器代码
const fragmentShader = `
void main() {
    gl_FragColor = vec4(0.0,1.0,1.0,0.1);
}
`;
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
  side: THREE.DoubleSide, //双面显示
  transparent: true, //允许透明
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
