import * as THREE from "three";

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

material.onBeforeCompile = function (shader) {
  console.log("shader", shader);
  console.log("顶点着色器", shader.vertexShader);
  console.log("片元着色器", shader.fragmentShader);
};

export default mesh;
