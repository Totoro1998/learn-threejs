// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();

const gltf = await loader.loadAsync("../../人.glb");
const player = gltf.scene; //玩家角色模型
model.add(player);

//包含关键帧动画的模型作为参数创建一个播放器
const mixer = new THREE.AnimationMixer(player);
console.log("所有骨骼动画数据", gltf.animations);
// 骨骼动画动画名字和对应含义，名字是可以在bledner中随意命名的
//Idle  休息
//Run   跑步
//Walk  走路
// const clipAction = mixer.clipAction(gltf.animations[13]);
// clipAction.play(); //播放动画

const IdleAction = mixer.clipAction(gltf.animations[5]);
const WalkAction = mixer.clipAction(gltf.animations[13]);
const RunAction = mixer.clipAction(gltf.animations[0]);
IdleAction.play();
WalkAction.play();
RunAction.play();
IdleAction.weight = 1.0; //默认休息状态
WalkAction.weight = 0.0;
RunAction.weight = 0.0;

function changeAction(name) {
  if (name == "Idle") {
    IdleAction.weight = 1.0;
    WalkAction.weight = 0.0;
    RunAction.weight = 0.0;
  } else if (name == "Walk") {
    IdleAction.weight = 0.0;
    WalkAction.weight = 1.0;
    RunAction.weight = 0.0;
  } else if (name == "Run") {
    IdleAction.weight = 0.0;
    WalkAction.weight = 0.0;
    RunAction.weight = 1.0;
  }
}

export { model, mixer, player, changeAction };
