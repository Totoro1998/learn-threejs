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

// 播放器AnimationMixer播放动画AnimationClip
const mixer = new THREE.AnimationMixer(mesh);
//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const clipAction = mixer.clipAction(clip);
// clipAction.loop = THREE.LoopOnce;
// clipAction.clampWhenFinished=true;
//.play()控制动画播放，默认循环播放
clipAction.play();

document.getElementById("stop").addEventListener("click", function () {
  clipAction.stop(); //动画停止结束，回到开始状态
});
document.getElementById("play").addEventListener("click", function () {
  clipAction.play(); //播放动画
});

const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const frameT = clock.getDelta();
  // 更新播放器时间
  mixer.update(frameT);
}
loop();

export default mesh;
