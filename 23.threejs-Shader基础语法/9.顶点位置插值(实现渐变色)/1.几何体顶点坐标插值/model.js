import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(100, 50);
// 顶点着色器代码
const vertexShader = `
varying vec3 vPosition;
void main(){
  vPosition = position;// 顶点位置坐标插值计算
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
// 片元着色器代码
const fragmentShader = `
varying vec3 vPosition;
void main() {
    float per = (vPosition.y + 25.0)/50.0;
    // 几何体顶点y坐标25，颜色值：1  0  0(红色)
    // 几何体顶点y坐标-25，颜色值：0  1  0(绿色)
    gl_FragColor = vec4(per,1.0-per,0.0,1.0);
}
`;

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
