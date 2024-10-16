// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

loader.load("./建筑模型.gltf", function (gltf) {
  // 递归遍历
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      // 模型材质重新设置
      obj.material = new THREE.MeshLambertMaterial({
        color: 0x004444,
        transparent: true,
        opacity: 0.5,
      });
      // //  !这样就不行，还不知为什么
      // obj.material = {
      //   ...obj.material,
      //   color: 0x004444,
      //   transparent: true,
      //   opacity: 0.5,
      // };
      // 模型边线设置
      const edges = new THREE.EdgesGeometry(obj.geometry);
      const edgesMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
      });
      const line = new THREE.LineSegments(edges, edgesMaterial);
      obj.add(line);
    }
  });
  model.add(gltf.scene);
});

export default model;
