import * as THREE from "three";
const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

// 已知条件：判断两个平行的向量方向是否相同
const a = new THREE.Vector3(10, 0, 0);
// const b = new THREE.Vector3(200, 0, 0); //与a平行且方向相同
const b = new THREE.Vector3(-50, 0, 0); //与a平行且方向相反

// a、b向量归一化后点乘
const cos = a.normalize().dot(b.normalize());

//注意判断的前提是，两个向量是平行的，余弦值要么1，要么-1
if (cos === 1) {
  console.log("方向相同");
} else if (cos === -1) {
  console.log("方向相反");
} else {
  console.log("不是平行");
}

export default mesh;
