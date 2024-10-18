import * as THREE from "three";

const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
const model = new THREE.Group();
model.add(mesh);

// 精灵模型1
const texture = new THREE.TextureLoader().load("./光点.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture, //设置精灵纹理贴图
});
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(10, 10, 1);
sprite.position.set(0, 100 + 10 / 2, -15);
model.add(sprite);
// 精灵模型2
const sprite2 = sprite.clone();
sprite2.material = sprite2.material.clone();
sprite2.material.color.set(0xffff00);
sprite2.position.z = 15;
// 功能按钮：精灵模型sprite，sprite2
model.add(sprite, sprite2);

sprite.change = function () {
  mesh.material.color.set(0xffffff);
};
sprite2.change = function () {
  mesh.material.color.set(0xffff00);
};

export { model, sprite, sprite2 };
