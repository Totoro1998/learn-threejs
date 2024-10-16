import * as THREE from "three";

// const geometry = new THREE.BoxGeometry(50, 50, 50);
const geometry = new THREE.CylinderGeometry(60, 60, 100, 30);

const material = new THREE.MeshLambertMaterial({
  color: 0x004444,
  transparent: true,
  opacity: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);

// // 长方体作为EdgesGeometry参数创建一个新的几何体
// const edges = new THREE.EdgesGeometry(geometry);
// 相邻面法线夹角大于13度，才会显示线条
const edges = new THREE.EdgesGeometry(geometry, 13); // 因为被分成了30份，所以法线角度为12度，小于13度
const edgesMaterial = new THREE.LineBasicMaterial({
  color: 0x00ffff,
});
const line = new THREE.LineSegments(edges, edgesMaterial); // 构造线模型，它和Line几乎是相同的，唯一的区别是它在渲染时使用的是gl.LINES， 而不是gl.LINE_STRIP
mesh.add(line);

export default mesh;
