import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
const model = new THREE.Group();
loader.load("./鸟.glb", function (gltf) {
  console.log("控制台查看gltf对象结构", gltf);
  model.add(gltf.scene);

  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  //  获取gltf.animations[0]的第一个clip动画对象
  const clipAction = mixer.clipAction(gltf.animations[0]);
  clipAction.play();

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
