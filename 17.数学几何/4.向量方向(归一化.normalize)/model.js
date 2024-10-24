import * as THREE from "three";

const geometry = new THREE.BoxGeometry(10, 10, 10);
geometry.translate(0, 5, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-50, 0, -50);

// // 单位向量v
// const v = new THREE.Vector3(1,0,0);
// console.log('向量长度',v.length());
// // 非单位向量dir
// const dir = new THREE.Vector3(1,1,0);
// dir.normalize(); //向量归一化
// console.log('dir',dir);//Vector3(√2/2, √2/2, 0)

//直线上两点坐标A和B
const A = new THREE.Vector3(-50, 0, -50);
const B = new THREE.Vector3(100, 0, 100);
const AB = B.clone().sub(A); //AB向量
AB.normalize(); //AB归一化表示直线AB的方向

// 单位向量AB的xyz每个分量分别乘以100
const T = AB.clone().multiplyScalar(100);
//验证：单位向量每个分量乘以100，得到的向量长度就是100，相当于得到一个沿着AB方向移动100的向量，这就是单位向量的意义
console.log("向量T长度", T.length()); // 100

//沿着AB方向平移平移物体mesh距离100
// 把mesh.position的xyz三个分量分别加上向量T的xyz分量
mesh.position.add(T);

// //沿着AB方向平移100
// mesh.translateOnAxis(AB, 100);

export default mesh;
