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



    fly.rotation.x = Math.PI / 2;

    // 四元数表示姿态角度
    const quaternion = new THREE.Quaternion();
    // 旋转轴new THREE.Vector3(0,0,1)
    // 旋转角度Math.PI/2
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);

    //quaternion表示旋转角度复制给物体.quaternion
    // fly.quaternion.copy(quaternion);

    fly.quaternion.multiply(quaternion);

})


export default model;
