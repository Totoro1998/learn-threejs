import * as THREE from "three";

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

//1. 设置变形目标影响权重，范围一般0~1
// mesh在geometry原始形状和变形目标1顶点对应形状之Z间变化
mesh.morphTargetInfluences[0] = 0.0; //权重0：物体形状对应geometry.attributes.position表示形状
mesh.morphTargetInfluences[0] = 1.0; //权重1：物体形状对应target1表示形状
mesh.morphTargetInfluences[0] = 0.5; //权重0.5：物体形状对应geometry和target1变形中间状态

// 2. mesh在geometry原始形状和变形目标2顶点对应形状之间变化
mesh.morphTargetInfluences[1] = 0.5;

// 3. 两个变形目标同时影响模型形状
mesh.morphTargetInfluences[1] = 0.5;
mesh.morphTargetInfluences[0] = 0.5;

export default mesh;
