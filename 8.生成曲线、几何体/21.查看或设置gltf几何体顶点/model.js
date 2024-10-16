// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group();

loader.load("../地形.glb", function (gltf) {
  model.add(gltf.scene);
  //mesh表示地形网格模型
  const mesh = gltf.scene.children[0];
  // 顶点位置数据
  const pos = mesh.geometry.attributes.position;
  const count = pos.count; //几何体顶点数量
  // 批量设置所有几何体顶点位置的y坐标
  for (let i = 0; i < count; i++) {
    const y = pos.getY(i); //获取第i+1个顶点y坐标
    pos.setY(i, y * 2); //设置第i+1个顶点y坐标为自身2倍
  }
});

export default model;
