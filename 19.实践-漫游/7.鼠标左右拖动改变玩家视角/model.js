// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();

const gltf = await loader.loadAsync("../人.glb");
const player = gltf.scene; //玩家角色模型
model.add(player);

//包含关键帧动画的模型作为参数创建一个播放器
const mixer = new THREE.AnimationMixer(player);
// console.log('gltf.animations', gltf.animations);
// gltf.animations包含做个动作，选择其中的步行动作
const clipAction = mixer.clipAction(gltf.animations[13]);
clipAction.play(); //播放动画

export { model, mixer, player };
