import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

const geometry = new THREE.SphereGeometry(100);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./earth.jpg");
const material = new THREE.MeshLambertMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);

// 模型淡出
// new TWEEN.Tween(material)
new TWEEN.Tween({ opacity: material.opacity })
  .to({ opacity: 0.0 }, 3000)
  .onStart(function () {
    //动画开始：允许透明opacity属性才能生效
    material.transparent = true;
  })
  .onUpdate(function (obj) {
    material.opacity = obj.opacity;
  })
  .start();

export { mesh, TWEEN };
