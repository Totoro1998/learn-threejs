import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import {
  GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';
import createCanvas from './canvas.js'
const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);

  const img = new Image();
  img.src = "./标签箭头背景.png";
  img.onload = function () {
    const canvas = createCanvas(img,'设备A');//创建一个canvas画布
    // 图片加载完成后，读取canvas像素数据创建CanvasTexture
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    const y = 4;//精灵y方向尺寸
    // sprite宽高比和canvas画布保持一致
    const x = canvas.width/canvas.height*y;//精灵x方向尺寸
    sprite.scale.set(x, y, 1);// 控制精灵大小
    sprite.position.y = y / 2; //标签底部箭头和空对象标注点重合  
    const obj = gltf.scene.getObjectByName('设备A标注'); // obj是建模软件中创建的一个空对象
    obj.add(sprite); //tag会标注在空对象obj对应的位置
  }
})

export default model;