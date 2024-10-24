import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

const p = mesh.geometry.attributes.position;
const n = mesh.geometry.attributes.normal;
const count = p.count; //顶点数量
for (let i = 0; i < count; i++) {
  // 顶点位置O
  const O = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i));
  // 顶点位置O对应的顶点法线
  const dir = new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i));
  // 箭头可视化顶点法线
  const arrowHelper = new THREE.ArrowHelper(dir, O, 20);
  mesh.add(arrowHelper);
}

export default mesh;
