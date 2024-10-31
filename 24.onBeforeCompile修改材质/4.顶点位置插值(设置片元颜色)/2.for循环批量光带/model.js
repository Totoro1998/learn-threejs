import * as THREE from "three";

const geometry = new THREE.BoxGeometry(40, 100, 40); //长方体 y方向高度100

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});

material.onBeforeCompile = function (shader) {
  console.log("vertexShader", shader.vertexShader);
  shader.vertexShader = shader.vertexShader.replace(
    "void main() {",
    `
    varying vec3 vPosition;
    void main(){
      // 顶点位置坐标模型矩阵变换后，进行插值计算
      vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
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
    float y0 = 0.0;
    for (int i = 0; i < 4; i++) {
      y0 += 20.0;
      if(vPosition.y > y0 && vPosition.y < y0+1.0 ){
        gl_FragColor = vec4(1.0,1.0,0.0,1.0);
      }
    }
    `
  );
};
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 50;
export default mesh;
