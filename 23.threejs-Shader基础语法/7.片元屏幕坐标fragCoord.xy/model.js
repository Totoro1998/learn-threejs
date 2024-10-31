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
void main() {
    //1. 所有片元都是同一种颜色 
    // gl_FragColor = vec4(0.0,1.0,1.0,1.0);

    // 2.根据片元的x坐标，来设置片元的像素值
    if(gl_FragCoord.x < 400.0){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else {
      gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    }

    // 3.片元沿着x方向渐变
    // gl_FragColor = vec4(gl_FragCoord.x/800.0*1.0,0.0,0.0,1.0);

    // discard舍弃部分片元
    // if(gl_FragCoord.x < 400.0){
    // // 符合条件片元保留，并设置颜色
    //   gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    // }else {
    //   discard;//不符合条件片元直接舍弃掉
    // }
} 
`;
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader, // 顶点着色器
  fragmentShader: fragmentShader, // 片元着色器
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
export default mesh;
