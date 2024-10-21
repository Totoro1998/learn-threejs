import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../士兵.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);
  // 骨骼辅助显示
  const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
  model.add(skeletonHelper);

  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  // gltf.animations[0]休息
  // gltf.animations[1]跑步
  // gltf.animations[2]静止展开
  // gltf.animations[3]走路
  const clipAction = mixer.clipAction(gltf.animations[1]);
  clipAction.play(); //播放动画

  // 如果想播放动画,需要周期性执行`mixer.update()`更新AnimationMixer时间数据

  const clock = new THREE.Clock();

  function loop() {
    requestAnimationFrame(loop);
    //clock.getDelta()方法获得loop()两次执行时间间隔
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
  }
  loop();
});

export default model;
