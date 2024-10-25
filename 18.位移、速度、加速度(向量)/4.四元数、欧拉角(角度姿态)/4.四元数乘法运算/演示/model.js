// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader();

const model = new THREE.Group();

loader.load("../飞机.glb", function (gltf) {
    const fly = new THREE.Group()
    fly.add(gltf.scene);
    model.add(fly);
    fly.position.set(10, 10, 0);//相对世界坐标系坐标原点偏移
    const axesHelper = new THREE.AxesHelper(10);
    fly.add(axesHelper);//用一个坐标轴可视化模型的局部坐标系(本地坐标系)
    

})


export default model;
