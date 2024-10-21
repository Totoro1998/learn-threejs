import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const loader = new GLTFLoader();

const model = new THREE.Group();
const textureCube = new THREE.CubeTextureLoader().setPath("./环境贴图/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
loader.load("../机械装配动画.glb", function (gltf) {
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
  const duration = clip.duration; //默认持续时间
  const clipAction = mixer.clipAction(clip); //创建动画clipAction对象
  clipAction.play(); //播放动画

  clipAction.paused = true; //暂停状态
  const gui = new GUI();
  // 拖动条查看动画任何时刻模型状态
  gui.add(clipAction, "time", 0, duration).step(0.1).name("拖动");

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
