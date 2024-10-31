// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../外部模型.glb", function (gltf) {
  model.add(gltf.scene);
  const mesh = model.getObjectByName("长方体");

  // 查看模型局部坐标系：判断几何体顶点坐标分布情况
  const axesHelper = new THREE.AxesHelper(200);
  mesh.add(axesHelper);

  mesh.material.onBeforeCompile = function (shader) {
    console.log("vertexShader", shader.vertexShader);
    shader.vertexShader = shader.vertexShader.replace(
      "void main() {",
      `
      varying vec3 vPosition;
      void main(){
      // 顶点位置坐标模型矩阵变换后，进行插值计算
      // vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
      vPosition = position;//不考虑模型矩阵影响
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
      if(vPosition.y > 30.0 && vPosition.y < 31.0 ){
        gl_FragColor = vec4(1.0,1.0,0.0,1.0);
      }
    `
    );
  };
});

export default model;
