// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./地形.glb", function (gltf) {
  //gltf加载成功后返回一个对象

  model.add(gltf.scene); //三维场景添加到model组对象中
  //mesh表示地形网格模型
  const mesh = gltf.scene.children[0];
  const pos = mesh.geometry.attributes.position;
  const count = pos.count; //几何体顶点数量

  // 1. 计算模型y坐标高度差
  const yArr = []; //顶点所有y坐标，也就是地形高度
  for (let i = 0; i < count; i++) {
    yArr.push(pos.getY(i)); //获取顶点y坐标，也就是地形高度
  }
  yArr.sort(); //数组元素排序，从小到大
  const miny = yArr[0]; //y最小值
  const maxy = yArr[yArr.length - 1]; //y最大值

  const height = maxy - miny; //山脉整体高度

  // 2. 计算每个顶点的颜色值
  const colorsArr = [];
  const color1 = new THREE.Color(0x0000ff); // 山底颜色，蓝色
  const color2 = new THREE.Color(0x00ff00); // 山腰颜色 ,绿色
  const color3 = new THREE.Color(0xff0000); // 山顶颜色，红色
  for (let i = 0; i < count; i++) {
    //当前高度和整体高度比值
    const percent = (pos.getY(i) - miny) / height;
    // 颜色插值计算
    let c = null;

    if (percent <= 0.5) {
      // 说明是山底到山腰
      //0.5作为颜色插值分界点
      // color1到color2之间插值
      c = color1.clone().lerp(color2, percent * 2);
    } else {
      // color2到color3之间插值
      c = color2.clone().lerp(color3, (percent - 0.5) * 2);
    }
    colorsArr.push(c.r, c.g, c.b);
  }
  const colors = new Float32Array(colorsArr);
  // 设置几何体attributes属性的颜色color属性
  mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
  // 3. 设置材质，使用顶点颜色渲染
  mesh.material = new THREE.MeshLambertMaterial({
    vertexColors: true,
  });
});

export default model;
