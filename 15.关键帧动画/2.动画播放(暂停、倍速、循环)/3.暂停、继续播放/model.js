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
const animationAction = mixer.clipAction(clip);
//.play()控制动画播放，默认循环播放
animationAction.play();

const bu = document.getElementById("bu");

bu.addEventListener("click", function () {
  // AnimationAction.paused默认值false，设置为true，可以临时暂停动画
  if (animationAction.paused) {
    //暂停状态
    animationAction.paused = false; //切换为播放状态
    bu.innerHTML = "暂停"; // 如果改变为播放状态，按钮文字设置为“暂停”
  } else {
    //播放状态
    animationAction.paused = true; //切换为暂停状态
    bu.innerHTML = "继续"; // 如果改变为暂停状态，按钮文字设置为“继续”
  }
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
