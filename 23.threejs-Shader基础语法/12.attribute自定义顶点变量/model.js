import * as THREE from 'three';


const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    25, 0, 0, //顶点2坐标
    50, 0, 0, //顶点3坐标
    75, 0, 0, //顶点4坐标
    100, 0, 0, //顶点5坐标
]);
//3个为一组，表示一个顶点的xyz坐标
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
const sizes = new Float32Array([
    1.0, //顶点1对应方形点尺寸缩放倍数
    0.8, //顶点2
    0.6, //顶点3
    0.4, //顶点4
    0.2, //顶点5
]);
// 1个数为一组表示对应顶点gl_PointSize的缩放倍数
geometry.attributes.size = new THREE.BufferAttribute(sizes, 1);

// 顶点着色器代码
const vertexShader = `
attribute float size;
void main(){
  gl_PointSize = 20.0 * size;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
// 片元着色器代码
const fragmentShader = `
void main() {
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
}
`

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,// 顶点着色器
    fragmentShader: fragmentShader,// 片元着色器
});


const points = new THREE.Points(geometry, material);

export default points;