import * as THREE from "three";

//长方体 y方向高度100
const geometry = new THREE.BoxGeometry(40, 100, 40);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 50;

material.onBeforeCompile = function (shader) {
  console.log("shader", shader);
  shader.vertexShader = shader.vertexShader.replace(
    "void main() {",
    `
    varying vec3 vPosition;
    void main(){
      vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
    `
  );
  // console.log('fragmentShader', shader.fragmentShader);
  shader.fragmentShader = shader.fragmentShader.replace(
    "void main() {",
    `
    uniform float y; //变化的y控制光带高度
    varying vec3 vPosition;
    void main() {
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <dithering_fragment>",
    `
    #include <dithering_fragment>
    // y随着时间改变光带位置也会改变
    if(vPosition.y > y && vPosition.y < y + 1.0 ){
        gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    }
    `
  );
  // shader.uniforms.y = { value: 30 };
  shader.uniforms.y = { value: 0 };
  mesh.shader = shader; //这样在index.js文件中通过mesh访问shader
};

export default mesh;
