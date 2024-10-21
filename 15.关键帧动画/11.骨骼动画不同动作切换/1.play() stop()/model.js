import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("../士兵.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);

  const mixer = new THREE.AnimationMixer(gltf.scene);
  // gltf.animations[0] Idle  休息
  // gltf.animations[1] Run   跑步
  // gltf.animations[2] TPose T形静止展开
  // gltf.animations[3] Walk  走路
  const IdleAction = mixer.clipAction(gltf.animations[0]);
  const RunAction = mixer.clipAction(gltf.animations[1]);
  const WalkAction = mixer.clipAction(gltf.animations[3]);

  IdleAction.play();
  let ActionState = IdleAction; //当前处于播放状态的动画动作对象

  // 通过UI按钮控制，切换动画运动状态
  document.getElementById("Idle").addEventListener("click", function () {
    ActionState.stop(); //播放状态动画终止
    IdleAction.play();
    ActionState = IdleAction;
  });
  document.getElementById("Run").addEventListener("click", function () {
    ActionState.stop(); //播放状态动画终止
    RunAction.play();
    ActionState = RunAction;
  });

  document.getElementById("Walk").addEventListener("click", function () {
    ActionState.stop(); //播放状态动画终止
    WalkAction.play();
    ActionState = WalkAction;
  });

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
