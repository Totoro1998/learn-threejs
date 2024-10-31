import * as THREE from "three";

const geometry = new THREE.BoxGeometry(40, 100, 40); //长方体
geometry.translate(0, 50, 0);
console.log("顶点位置", geometry.attributes.position);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});

material.onBeforeCompile = function (shader) {
  // console.log('vertexShader', shader.vertexShader);
  shader.vertexShader = shader.vertexShader.replace(
    "void main() {",
    `
    varying vec3 vPosition;
    void main(){
      // vPosition = vec3(modelMatrix * vec4( position, 1.0 ));// vPosition:世界坐标
      // 顶点位置坐标插值计算
      //不考虑模型旋转缩放平移变换(modelMatrix)
      vPosition = position;// vPosition:局部坐标
    `
  );
  // console.log('fragmentShader', shader.fragmentShader);
  shader.fragmentShader = shader.fragmentShader.replace(
    "void main() {",
    `
    varying vec3 vPosition;
    void main() {
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <dithering_fragment>",
    `
    #include <dithering_fragment>
    if(vPosition.y > 30.0 && vPosition.y < 31.0 ){
        gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    }
    `
  );
};
const mesh = new THREE.Mesh(geometry, material);

// 查看模型局部坐标系：判断几何体顶点坐标分布情况
const axesHelper = new THREE.AxesHelper(200);
mesh.add(axesHelper);

// mesh.position.y = 0;
mesh.position.y = 25;
// mesh.position.y = 50;
mesh.rotateZ(Math.PI / 6);
mesh.position.x = 100; //平移旋转mesh，局部坐标系相对mesh.geometry位置不变

export default mesh;
