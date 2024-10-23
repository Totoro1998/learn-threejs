import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

//几何体两组顶点一一对应，位置不同，然后通过权重系数，可以控制模型形状在两组顶点之间变化
const geometry = new THREE.BoxGeometry(50, 50, 50);
// 为geometry提供变形目标的顶点数据(注意和原始geometry顶点数量一致)
const target1 = new THREE.BoxGeometry(50, 200, 50).attributes.position; //变高
const target2 = new THREE.BoxGeometry(10, 50, 10).attributes.position; //变细
// 几何体顶点变形目标数据，可以设置1组或多组
geometry.morphAttributes.position = [target1, target2];
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);

// 创建变形动画权重系数的关键帧数据
mesh.name = "Box"; //关键帧动画控制的模型对象命名
// 设置变形目标1对应权重随着时间的变化
const KF1 = new THREE.KeyframeTrack("Box.morphTargetInfluences[0]", [0, 5], [0, 1]);
// 设置变形目标2对应权重随着时间的变化
const KF2 = new THREE.KeyframeTrack("Box.morphTargetInfluences[1]", [5, 10], [0, 1]);
// 创建一个剪辑clip对象
const clip = new THREE.AnimationClip("t", 10, [KF1, KF2]);

// 播放变形动画
const mixer = new THREE.AnimationMixer(mesh);
const animationAction = mixer.clipAction(clip);
animationAction.play();
animationAction.loop = THREE.LoopOnce; //不循环播放
animationAction.clampWhenFinished = true; // 物体状态停留在动画结束的时候

const clock = new THREE.Clock();

function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  // 更新播放器时间
  mixer.update(frameT);
}
loop();

export default mesh;
