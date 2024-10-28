// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const model = new THREE.Group();

const gltf = await loader.loadAsync("../人.glb");
const player = gltf.scene; //玩家角色模型
model.add(player);

const mixer = new THREE.AnimationMixer(player);

const clipAction = mixer.clipAction(gltf.animations[13]);
clipAction.play(); //播放动画

export { model, mixer, player };
