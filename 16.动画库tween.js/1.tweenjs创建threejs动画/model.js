import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

//创建一段mesh平移的动画
const tween = new TWEEN.Tween(mesh.position);
//经过2000毫秒，pos对象的x和y属性分别从零变化为100、50
tween.to({ x: 100, y: 50 }, 2000);
//tween动画开始执行
tween.start();

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
