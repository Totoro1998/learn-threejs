import * as THREE from "three";

const A = new THREE.Vector3(0, 30, 0); // A点
const B = new THREE.Vector3(80, 0, 0); // B点

// 绿色小球可视化A点位置
const AMesh = createSphereMesh(0x00ff00, 2);
AMesh.position.copy(A);
// 红色小球可视化B点位置
const BMesh = createSphereMesh(0xff0000, 2);
BMesh.position.copy(B);
const group = new THREE.Group();
group.add(AMesh, BMesh);

// 绘制一个从A指向B的箭头
const AB = B.clone().sub(A);
const L = AB.length(); //AB长度
const dir = AB.clone().normalize(); //单位向量表示AB方向

// 生成箭头从A指向B
const arrowHelper = new THREE.ArrowHelper(dir, A, L);
group.add(arrowHelper);

function createSphereMesh(color, R) {
  const geometry = new THREE.SphereGeometry(R);
  const material = new THREE.MeshLambertMaterial({
    color: color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export default group;
