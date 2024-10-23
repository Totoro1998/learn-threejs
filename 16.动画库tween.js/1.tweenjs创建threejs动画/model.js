import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

// 创建一段mesh平移的动画
const tween = new TWEEN.Tween(mesh.position);
tween.to({ x: 100, y: 100, z: 100 }, 2000); //经过2000毫秒，mesh.position对象的x、y、z属性分别从0变化为100
tween.start(); // tween动画开始执行

// 更简洁书写形式
// const tween = new TWEEN.Tween(mesh.position)
// .to({x: 100,y: 50}, 2000)
// .start();

// // 缩放动画
// new TWEEN.Tween(mesh.scale).to({
//     x: 100,
//     y: 50
// }, 2000).start();

export { mesh, TWEEN };
