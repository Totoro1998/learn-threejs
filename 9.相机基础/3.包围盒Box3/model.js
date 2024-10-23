import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(50, 0, 0);
// geometry.translate(25, 0, 0);

// 包围盒计算模型对象的大小和位置
const box3 = new THREE.Box3();
box3.expandByObject(mesh); // 计算模型包围盒
console.log("查看包围盒", box3);

const size = new THREE.Vector3();
box3.getSize(size); // 计算包围盒尺寸
console.log("模型包围盒尺寸", size); // (50,50,50)

const center = new THREE.Vector3();
box3.getCenter(center); // 计算包围盒中心坐标
console.log("模型中心坐标", center); // 0, 0, 0;

export default mesh;
