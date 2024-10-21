import * as THREE from "three";

const geometry = new THREE.BoxGeometry(15, 15, 15);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);

// 给名为Box的模型对象设置关键帧动画AnimationClip
mesh.name = "Box";
const times = [0, 3, 6];
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
const posKF = new THREE.KeyframeTrack("Box.position", times, values);
const colorKF = new THREE.KeyframeTrack("Box.material.color", [2, 5], [1, 0, 0, 0, 0, 1]);
const clip = new THREE.AnimationClip("test", 6, [posKF, colorKF]);
// console.log('clip.duration',clip.duration);
// 播放器AnimationMixer播放动画AnimationClip
const mixer = new THREE.AnimationMixer(mesh);
//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const clipAction = mixer.clipAction(clip);
//.play()控制动画播放，默认循环播放
clipAction.play();

// AnimationAction对象用来控制播放规则
clipAction.loop = THREE.LoopOnce; //不循环播放
// 物体状态停留在动画结束的时候
clipAction.clampWhenFinished = true;

// 从时间轴上选择时间段播放动画，开始时刻`clipAction.time`，结束时刻`clip.duration`。
clipAction.time = 1; // AnimationAction设置开始播放时间：从1秒时刻对应动画开始播放
clip.duration = 5; // AnimationClip设置播放结束时间：到5秒时刻对应的动画状态停止

const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  // 更新播放器时间
  mixer.update(frameT);
}
loop();

export default mesh;
