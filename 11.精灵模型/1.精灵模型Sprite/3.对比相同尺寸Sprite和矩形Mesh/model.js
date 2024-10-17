import * as THREE from "three";

// 尺寸相同的Sprite和矩形平面Mesh

// 网格模型尺寸PlaneGeometry(50, 25)
const geometry = new THREE.PlaneGeometry(50, 25);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

const spriteMaterial = new THREE.SpriteMaterial({
  color: 0x00ffff,
});
const sprite = new THREE.Sprite(spriteMaterial);
sprite.position.set(0, 30, 0);
// 精灵模型尺寸.scale.set(50, 25
sprite.scale.set(50, 25, 1);

const group = new THREE.Group();
group.add(mesh, sprite);

export default group;
