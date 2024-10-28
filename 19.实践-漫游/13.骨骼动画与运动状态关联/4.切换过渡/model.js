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

const clipArr = gltf.animations; //所有骨骼动画
const actionObj = {}; //包含所有动作action
for (let i = 0; i < clipArr.length; i++) {
  const clip = clipArr[i]; //休息、步行、跑步等动画的clip数据
  const action = mixer.clipAction(clip); //clip生成action
  action.name = clip.name; //action命名name
  // 批量设置所有动画动作的权重
  if (action.name === "Idle") {
    action.weight = 1.0; //这样默认播放Idle对应的休息动画
  } else {
    action.weight = 0.0;
  }
  action.play();
  // action动画动作名字作为actionObj的属性
  actionObj[action.name] = action;
}

let currentAction = actionObj["Idle"]; //记录当前播放的动作
// 切换不同动作
function changeAction(actionName) {
  currentAction.time = 0; // time归零，正在播放的动作回到初始状态
  const action = actionObj[actionName]; // 新的需要播放的动作
  action.enabled = true; // 允许新动作播放
  action.setEffectiveWeight(1); // 把新动作权重设置为1
  // 0.4秒完成从一个动作切换到另一个动作action
  currentAction.crossFadeTo(action, 0.4, true);
  currentAction = action; // 记录新的动作
}

export { model, mixer, player, changeAction, currentAction };
