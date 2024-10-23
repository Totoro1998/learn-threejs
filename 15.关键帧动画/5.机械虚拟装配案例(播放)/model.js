// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader();

const model = new THREE.Group();
const textureCube = new THREE.CubeTextureLoader().setPath("./环境贴图/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.encoding = THREE.sRGBEncoding;

loader.load("./机械装配动画.glb", function (gltf) {
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.metalness = 1.0;
      obj.material.roughness = 0.35;
      obj.material.envMap = textureCube;
      obj.material.envMapIntensity = 0.5;
    }
  });
  model.add(gltf.scene);

  //包含关键帧动画的模型作为参数创建一个播放器
  const mixer = new THREE.AnimationMixer(gltf.scene);
  //  获取gltf.animations[0]的第一个clip动画对象
  const clip = gltf.animations[0];
  const animationAction = mixer.clipAction(clip); //创建动画clipAction对象
  animationAction.play(); //播放动画
  animationAction.paused = true; //暂停状态

  animationAction.loop = THREE.LoopOnce; //不循环播放

  const bu = document.getElementById("bu");
  bu.addEventListener("click", function () {
    // AnimationAction.paused默认值false，设置为true，可以临时暂停动画
    if (animationAction.paused) {
      //暂停状态
      animationAction.paused = false; // 切换为播放状态
      bu.innerHTML = "暂停"; // 如果改变为播放状态，按钮文字设置为“暂停”
    } else {
      //播放状态
      animationAction.paused = true; // 切换为暂停状态
      bu.innerHTML = "播放"; // 如果改变为暂停状态，按钮文字设置为“播放”
    }
  });

  mixer.addEventListener("finished", function () {
    animationAction.reset(); // 播放动画
    animationAction.paused = true; // 切换为暂停状态
    bu.innerHTML = "播放"; // 按钮样式恢复到“播放”状态
  });
  const gui = new GUI(); //创建GUI对象
  // 0~2倍速之间调节
  gui.add(animationAction, "timeScale", 0, 2).step(0.1).name("倍速");

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
