import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

const geometry = new THREE.SphereGeometry(100);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./earth.jpg");
const material = new THREE.MeshLambertMaterial({
  map: texture,
});
const mesh = new THREE.Mesh(geometry, material);

// 模型淡入
material.transparent = true; //开启透明计算
material.opacity = 0.0; //完全透明

// new TWEEN.Tween(material)
new TWEEN.Tween({ opacity: material.opacity })
  .to({ opacity: 1.0 }, 3000)
  .onUpdate(function (obj) {
    material.opacity = obj.opacity;
  })
  .onComplete(function () {
    //动画结束：关闭允许透明，恢复到模型原来状态
    material.transparent = false;
  })
  .start();

export { mesh, TWEEN };
