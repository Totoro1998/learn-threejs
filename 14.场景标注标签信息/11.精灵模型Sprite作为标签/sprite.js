import * as THREE from "three";
// 标注位置对应的模型对象obj
function createSprite(obj, state) {
  const texLoader = new THREE.TextureLoader();
  let texture = null;
  if (state == "警告") {
    texture = texLoader.load("./警告.png");
  } else {
    texture = texLoader.load("./故障.png");
  }
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  // 控制精灵大小
  sprite.scale.set(5, 5, 1);
  sprite.position.y = 5 / 2; //标签底部箭头和空对象标注点重合
  obj.add(sprite); //tag会标注在空对象obj对应的位置
}

export default createSprite;
