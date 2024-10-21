import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

//几何体两组顶点一一对应，位置不同，然后通过权重系数，可以控制模型形状在两组顶点之间变化
const geometry = new THREE.BoxGeometry(50, 50, 50);
// 为geometry提供变形目标的顶点数据(注意和原始geometry顶点数量一致)
const target1 = new THREE.BoxGeometry(50, 200, 50).attributes.position; //变高
const target2 = new THREE.BoxGeometry(10, 50, 10).attributes.position; //变细
// 几何体顶点变形目标数据，可以设置1组或多组
geometry.morphAttributes.position = [target1, target2];
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

// GUI拖动条可视化改变变形目标权重系数
const obj = {
  t1: 0,
  t2: 0,
};
const gui = new GUI();
gui
  .add(obj, "t1", 0, 1)
  .name("变形目标1")
  .onChange(function (v) {
    // 变形目标1对物体形状影响权重
    mesh.morphTargetInfluences[0] = v;
  });
gui
  .add(obj, "t2", 0, 1)
  .name("变形目标2")
  .onChange(function (v) {
    // 变形目标2对物体形状影响权重
    mesh.morphTargetInfluences[1] = v;
  });

export default mesh;
