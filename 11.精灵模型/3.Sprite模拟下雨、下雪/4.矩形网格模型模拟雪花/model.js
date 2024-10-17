// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group();

loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);
});

const texture = new THREE.TextureLoader().load("../雪花.png");
texture.colorSpace = THREE.SRGBColorSpace;

const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});

// 批量创建多个精灵模型，在一个长方体空间上随机分布
const group = new THREE.Group();
model.add(group);
const MAX_Y_POSITION = 600;

for (let i = 0; i < 16000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);
  sprite.scale.set(1, 1, 1);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 1000 * (Math.random() - 0.5);
  const y = MAX_Y_POSITION * Math.random();
  const z = 1000 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}

const clock = new THREE.Clock();
function loop() {
  // loop()两次执行时间间隔
  const t = clock.getDelta();
  // loop()每次执行都会更新Sprite的位置，进而产生动画效果
  group.children.forEach((sprite) => {
    // Sprite的y坐标每次减t*30
    sprite.position.y -= t * 30;
    if (sprite.position.y < 0) {
      // 如果Sprite落到地面，重置y，从新下落
      sprite.position.y = MAX_Y_POSITION;
    }
  });
  requestAnimationFrame(loop);
}
loop();

export default model;
