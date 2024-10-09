import * as THREE from "three";

// 创建场景
const scene = new THREE.Scene();

// 创建几何体
const geometry = new THREE.BoxGeometry(50, 50, 50);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: "red", // 设置材质颜色
});

// 创建网格模型
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // 设置网格模型在三维空间中的位置坐标，默认是坐标原点

// 将网格模型添加到场景中
scene.add(mesh);

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

// 创建虚拟相机
const camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 0.1, 2000);
camera.position.set(300, 0, 300); // 相机在Three.js三维坐标系中的位置
camera.lookAt(mesh.position); // 相机观察目标指向mesh

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight); // 设置three.js渲染区域的尺寸(像素px)
document.body.appendChild(renderer.domElement); // three.js执行渲染命令后会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中

renderer.render(scene, camera); // 执行渲染操作
