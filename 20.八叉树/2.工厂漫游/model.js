// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //三维场景模型

const gltf = await loader.loadAsync("./model/工厂.glb");
// console.log('model',model);
const ground = gltf.scene; //地形
model.add(ground);

// console.log('',model.getObjectByName('平面010'));

ground.traverse(function (obj) {
  if (obj.isMesh) {
    // 模型正反面影响，碰撞检测，这一点很重要，要不然无法区分正反面
    //   obj.material.side = THREE.FrontSide
  }
});

const gltfCollision = await loader.loadAsync("./model/工厂碰撞.glb");

const collisionModel = gltfCollision.scene;

// const gltf2 = await loader.loadAsync("../../人前方z.glb");
const gltf2 = await loader.loadAsync("./model/机器人.glb");
const person = gltf2.scene; //玩家角色模型
model.add(person);

//包含关键帧动画的模型作为参数创建一个播放器
const mixer = new THREE.AnimationMixer(person);

const aniArr = gltf2.animations; //所有骨骼动画

const actionObj = {}; //包含所有动作action
for (let i = 0; i < aniArr.length; i++) {
  // gltf.animations[0] Idle  休息
  // gltf.animations[1] Run   跑步
  // gltf.animations[2] TPose T形静止展开
  // gltf.animations[3] Walk  走路
  const clip = aniArr[i]; //休息、步行、跑步等动作
  const action = mixer.clipAction(clip);
  if (clip.name === "Idle") {
    action.weight = 1.0;
  } else {
    action.weight = 0.0;
  }
  action.play();

  action.name = clip.name;

  actionObj[clip.name] = action;

  if (action.name == "Idle" || action.name == "Walk" || action.name == "Run") {
    // 设置走路、跑步等动作的执行方式
  } else {
    // threejs默认循环播放动画，有些动作不用循环播放，比如跳跃动作
    // 如果跳跃时间段，没有超出一次循环，也可以不设置
    // action.loop = THREE.LoopOnce;
    // 播放完成动画默认回到开头，让动画停留在播放结束状态，比如跳跃动作
    // 这带来一个问题Jump无法完全播放，为什么，都在播放  time以谁为准是个问题
    // 调的非常高，动作变为T的形状，其实没必要， 跳跃动作一般和落地时间相近，就不用T行还是不行
    // action.clampWhenFinished = true;
  }
}
// console.log('actionObj', actionObj);
let currentAction = actionObj["Idle"];
console.log("currentActionmodel", currentAction);
// 切换不同动作
function changeAction(actionName) {
  currentAction.time = 0; //time归零，正在播放的动作回到初始状态
  const action = actionObj[actionName]; //新的需要播放的动作
  action.enabled = true; //允许新动作播放
  action.setEffectiveWeight(1); //把新动作权重设置为1
  // 0.2秒完成从动作切换到动作action
  currentAction.crossFadeTo(action, 0.2, true);
  currentAction = action; //把当前播放动作指定为新的action
  // console.log(' action.name', action.name);
}

// const clock = new THREE.Clock();
// function loop() {
//     requestAnimationFrame(loop);
//     //clock.getDelta()方法获得loop()两次执行时间间隔
//     const frameT = clock.getDelta();
//     // 更新播放器相关的时间
//     mixer.update(frameT);
// }
// loop();

export { collisionModel, model, ground, person, changeAction, mixer, currentAction };
