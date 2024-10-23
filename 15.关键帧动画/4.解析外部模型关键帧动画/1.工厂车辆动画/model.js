import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../工厂.glb", function (gltf) {
  model.add(gltf.scene);
  console.log("控制台查看gltf对象结构", gltf);
  console.log("动画数据", gltf.animations);

  // 包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  //  获取gltf.animations[0]的第一个clip动画对象
  const animationAction = mixer.clipAction(gltf.animations[0]);

  animationAction.play(); // 播放动画

  // 如果想播放动画,需要周期性执行`mixer.update()`更新AnimationMixer时间数据
  const clock = new THREE.Clock();
  function loop() {
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
  }
  loop();
});

export default model;
