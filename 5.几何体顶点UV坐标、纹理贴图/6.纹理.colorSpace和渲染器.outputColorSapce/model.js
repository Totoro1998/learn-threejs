// 引入Three.js
import * as THREE from "three";
const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

const geometry = new THREE.SphereGeometry(20);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./earth.jpg");
//设置纹理对象.encoding和webgl渲染器renderer.outputColorSpace一致
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshLambertMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y += 20;
model.add(mesh);

export default model;
