import * as THREE from 'three';

import { model, mixer } from './model.js';
import { playerUpdate, camera } from './player.js';
//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);
// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(60, 50, 0x004444, 0x004444);
scene.add(gridHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


const width = window.innerWidth;
const height = window.innerHeight;
// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 渲染循环
const clock = new THREE.Clock();
function render() {
    const deltaTime = clock.getDelta();
    playerUpdate(deltaTime);//更新玩家角色的速度、位置状态
    mixer.update(deltaTime);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();


// const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};