import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 50);
// 顶点着色器代码
const vertexShader = `
void main(){
  // 投影矩阵 * 模型视图矩阵 * 模型顶点坐标
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
}
`;
// 片元着色器代码
const fragmentShader = `
uniform float opacity;//uniform声明变量opacity表示透明度
uniform vec3 color;//声明一个颜色变量color
void main() {
    gl_FragColor = vec4(color,opacity);
}
`;
const material = new THREE.ShaderMaterial({
  uniforms: {
    // 给透明度uniform变量opacity传值
    opacity: { value: 0.3 },
    // 给uniform同名color变量传值
    color: { value: new THREE.Color(0x00ffff) },
  },
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
  side: THREE.DoubleSide,
  transparent: true, //允许透明
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
