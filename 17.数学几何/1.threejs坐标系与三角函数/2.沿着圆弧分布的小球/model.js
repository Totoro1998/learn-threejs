import * as THREE from "three";

const geometry = new THREE.SphereGeometry(3);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});

const R = 100; // 圆弧半径
const N = 10; // 分段数量
const sp = Math.PI / N; //两个相邻点间隔弧度
const group = new THREE.Group();
for (let i = 0; i < N + 1; i++) {
  const angle = sp * i;
  // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
  const x = R * Math.cos(angle);
  const y = R * Math.sin(angle);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, 0);
  group.add(mesh);
}

// console.log('group.children',group.children);

export default group;
