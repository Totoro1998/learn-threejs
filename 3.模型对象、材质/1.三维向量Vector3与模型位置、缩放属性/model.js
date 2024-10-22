import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});
geometry.translate(0, 0, 50); // 并不会改变mesh.position
geometry.rotateY(Math.PI / 3);
const mesh = new THREE.Mesh(geometry, material);

// 位置属性.position使用threejs三维向量对象Vector3表示的
console.log("模型位置属性.position的值", mesh.position); // 0, 0, 0

// .position的值是Vector3，意味着你想改变.position,可以查询文档Vector3类
// 直接设置网格模型的位置
mesh.position.set(0, 0, 0);
// mesh.position.x = 100; // 设置模型的x坐标

//沿着axis轴表示方向平移100
// mesh.translateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 100);

// // 网格模型沿着x轴方向平移100
// mesh.translateX(100);

// mesh.scale.y = 3; //y方向放大3倍
// // 网格模型xyz方向分别缩放0.5,1.5,2倍
// mesh.scale.set(0.5, 1.5, 2);

export default mesh;
