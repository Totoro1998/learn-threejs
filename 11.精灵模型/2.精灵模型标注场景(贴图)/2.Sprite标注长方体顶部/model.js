import * as THREE from "three";

// mesh顶部中心添加标注，顶部中心坐标是(0,100,0)
const geometry = new THREE.BoxGeometry(25, 100, 50);
geometry.translate(0, 50, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
group.add(mesh);

const texture = new THREE.TextureLoader().load("../光点.png");
texture.colorSpace = THREE.SRGBColorSpace;
const spriteMaterial = new THREE.SpriteMaterial({
  // color:0x00ffff,//设置颜色
  map: texture, //设置精灵纹理贴图
  // transparent:true,//默认是true，不用设置
});
const sprite = new THREE.Sprite(spriteMaterial);

// 控制精灵大小
sprite.scale.set(10, 10, 1); //标注大小，根据标注对象的尺寸数量级设置

// 设置精灵模型在三维空间中的位置坐标
sprite.position.set(0, 100 + 10 / 2, 0); //根据标注位置设置，要考虑sprite的大小
group.add(sprite);

export default group;
