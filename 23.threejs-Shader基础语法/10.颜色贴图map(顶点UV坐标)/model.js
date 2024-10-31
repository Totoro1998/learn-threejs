import * as THREE from 'three';


// const geometry = new THREE.PlaneGeometry(100, 50);
// const geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
const geometry = new THREE.SphereGeometry(60, 25, 25); //球体
// 顶点着色器代码
const vertexShader = `
// attribute vec2 uv;//默认提供,不用自己写
varying vec2 vUv;
void main(){
  vUv = uv;// UV坐标插值计算
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
// 片元着色器代码
const fragmentShader = `
uniform sampler2D map;//颜色贴图变量
varying vec2 vUv;
void main() {
    // gl_FragColor = vec4(0.0,1.0,1.0,1.0);
    // 通过几何体的UV坐标从颜色贴图获取像素值
    gl_FragColor = texture2D( map, vUv );
}
`
const texture = new THREE.TextureLoader().load('./Earth.png');
const material = new THREE.ShaderMaterial({
  uniforms: {
    // 给着色器中同名uniform变量map传值
    map: { value: texture },
  },
  vertexShader: vertexShader,// 顶点着色器
  fragmentShader: fragmentShader,// 片元着色器
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;