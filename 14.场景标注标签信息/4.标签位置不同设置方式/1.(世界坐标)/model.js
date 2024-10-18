import * as THREE from "three";
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

const geometry = new THREE.BoxGeometry(40, 40, 40);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(50, 0, 50);
// mesh设置一个父对象meshGroup
const meshGroup = new THREE.Group();
meshGroup.add(mesh);
// mesh位置受到父对象局部坐标.positionn影响
meshGroup.position.x = -100;

const div = document.getElementById("tag");
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);

const worldPosition = new THREE.Vector3();
// 获取mesh的世界坐标(meshGroup.position和mesh.position累加结果)
mesh.getWorldPosition(worldPosition);
// mesh世界坐标复制给tag
tag.position.copy(worldPosition);

const group = new THREE.Group();
// 最后meshGroup和tag放在同一个父对象中即可
group.add(meshGroup, tag);

export default group;
