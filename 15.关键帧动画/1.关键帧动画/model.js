import * as THREE from "three";

const geometry = new THREE.BoxGeometry(15, 15, 15);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);

// 1. 第1步创建一个关键动画AnimationClip

// 1.1 给需要设置关键帧动画的模型命名
mesh.name = "Box";

// 1.2 给名为Box的模型对象的设置关键帧数据KeyframeTrack
const times = [0, 3, 6]; // 时间轴上，设置三个时刻0、3、6秒
// times中三个不同时间点，物体分别对应values中的三个xyz坐标
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];
// 创建关键帧，把模型位置和时间对应起来
// 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
// const posKF = new THREE.KeyframeTrack("Box.position", times, values);

const posKF = new THREE.KeyframeTrack("Box.position", times, values);

// 时间轴上选择两个时刻2秒、5秒，分别对应物体两个颜色值(1, 0, 0)、(0, 0, 1)
// 从2秒到5秒，物体从红色逐渐变化为蓝色
const colorKF = new THREE.KeyframeTrack("Box.material.color", [2, 5], [1, 0, 0, 0, 0, 1]);

// 上面是在时间轴上，随机编辑了两个关键帧posKF、colorKF，你可以根据需要随意改变场景中物体位置、颜色、角度等属性

// 1.3 AnimationClip表示一个关键帧动画，可以基于关键帧数据产生动画效果
// 创建一个clip关键帧动画对象，命名"test"，动画持续时间6s
// AnimationClip包含的所有关键帧数据都放到参数3数组中即可
const clip = new THREE.AnimationClip("TEST ANIMATION", times.at(-1), [posKF, colorKF]);

// 2. 第2步播放关键帧动画AnimationClip

//2.1 动画播放器AnimationMixer播放关键帧动画AnimationClip
//包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
const mixer = new THREE.AnimationMixer(mesh);
//AnimationMixer的`.clipAction()`返回一个AnimationAction对象
const animationAction = mixer.clipAction(clip);
//.play()控制动画播放，默认循环播放
animationAction.play();

// 2.2 如果想播放动画开始变化,需要周期性执行`mixer.update()`更新AnimationMixer时间数据
// 你可以通过requestAnimationFrame提供一个周期性执行的函数
const clock = new THREE.Clock(); //辅助获取时间数据
function loop() {
  requestAnimationFrame(loop);
  //clock.getDelta()方法获得loop()两次执行时间间隔
  const frameT = clock.getDelta();
  // 更新播放器相关的时间
  mixer.update(frameT);
}
loop();

// 如果你不想用requestAnimationFrame重新创建一个循环执行函数，也可以在index.js文件渲染循环中引入`mixer.update()`的代码
export default mesh;
