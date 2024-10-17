import * as THREE from "three";

const texture = new THREE.TextureLoader().load("../光点.png");
texture.colorSpace = THREE.SRGBColorSpace;
const spriteMaterial = new THREE.SpriteMaterial({
  // color:0x00ffff,//设置颜色
  map: texture, //设置精灵纹理贴图
  // transparent:true,//SpriteMaterial默认是true
});
const sprite = new THREE.Sprite(spriteMaterial);
// 控制精灵大小
sprite.scale.set(10, 10, 1);

export default sprite;
