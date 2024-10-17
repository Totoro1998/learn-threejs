// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group();

loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);
});

const texture = new THREE.TextureLoader().load("../雨滴.png");
texture.colorSpace = THREE.SRGBColorSpace;
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});
// 批量创建多个精灵模型，在一个长方体空间上随机分布
const group = new THREE.Group();
model.add(group);
for (let i = 0; i < 1000; i++) {
  // 精灵模型共享材质
  const sprite = new THREE.Sprite(spriteMaterial);
  group.add(sprite);
  sprite.scale.set(1, 1, 1);
  // 设置精灵模型位置，在长方体空间上上随机分布
  const x = 200 * (Math.random() - 0.5);
  const y = 100 * Math.random();
  const z = 200 * (Math.random() - 0.5);
  sprite.position.set(x, y, z);
}
export default model;
