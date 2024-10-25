import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

const a = new THREE.Vector3(10, 10, 0);
const b = new THREE.Vector3(20, 0, 0);

// dot几何含义：向量a长度 * 向量b长度 * cos(ab夹角)
const dot = a.dot(b);
console.log("点乘结果", dot);
// a、b向量归一化后点乘
const cos = a.normalize().dot(b.normalize());
console.log("向量夹角余弦值", cos);
const rad = Math.acos(cos); //反余弦计算向量夹角弧度
console.log("向量夹角弧度", rad);
// 弧度转角度
const angle = THREE.MathUtils.radToDeg(rad);
console.log("向量夹角角度值", angle);
export default mesh;
