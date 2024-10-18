import * as THREE from "three";
import createCanvas from "./canvas.js";
// 标注位置对应的模型对象obj
// name：标注文字
function createSprite(obj, name) {
  const canvas = createCanvas(name); //创建一个canvas画布
  // canvas画布作为CanvasTexture的参数创建一个纹理对象
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  const y = 4; //精灵y方向尺寸
  // sprite宽高比和canvas画布保持一致
  const x = (canvas.width / canvas.height) * y; //精灵x方向尺寸
  sprite.scale.set(x, y, 1); // 控制精灵大小
  sprite.position.y = y / 2; //标签底部箭头和空对象标注点重合
  obj.add(sprite); //tag会标注在空对象obj对应的位置
}

export default createSprite;
