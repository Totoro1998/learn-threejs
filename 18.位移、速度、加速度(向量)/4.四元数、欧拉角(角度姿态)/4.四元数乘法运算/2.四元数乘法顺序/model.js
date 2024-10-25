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


    // // 在物体原来姿态基础上，进行旋转
    // const q1 = new THREE.Quaternion();
    // q1.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // fly.quaternion.multiply(q1);
    // // 在物体上次旋转基础上，进行旋转
    // const q2 = new THREE.Quaternion();
    // q2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    // fly.quaternion.multiply(q2);


    // 先变换q1,后变换q2，和上面代码效果一样，
    // const q1 = new THREE.Quaternion();
    // q1.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // const q2 = new THREE.Quaternion();
    // q2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    // const newQ= q1.clone().multiply(q2);
    // fly.quaternion.multiply(newQ);


    // 先变换q2,后变换q1，和上面代码效果不一样，
    // q2.clone().multiply(q1)与表示q1.clone().multiply(q2)的旋转过程顺序不同
    const q1 = new THREE.Quaternion();
    q1.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    const q2 = new THREE.Quaternion();
    q2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    const newQ= q2.clone().multiply(q1);
    fly.quaternion.multiply(newQ);

})


export default model;
