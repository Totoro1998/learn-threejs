// 引入Three.js
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
// 加载环境贴图
// 加载周围环境6个方向贴图
// 上下左右前后6张贴图构成一个立方体空间
//  p:正positive  n:负negative
// 'px.jpg', 'nx.jpg'：x轴正方向、负方向贴图
// 'py.jpg', 'ny.jpg'：y轴贴图
// 'pz.jpg', 'nz.jpg'：z轴贴图
// CubeTexture表示立方体纹理对象，父类是纹理对象Texture
const textureCubeLoader = new THREE.CubeTextureLoader();
const textureCube = textureCubeLoader.setPath("../环境贴图/环境贴图1/").load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);
textureCube.colorSpace = THREE.SRGBColorSpace; //设置纹理贴图编码方式和WebGL渲染器一致

loader.load("../金属.glb", (gltf) => {
  model.add(gltf.scene);
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.material.metalness = 1.0;
      obj.material.roughness = 0.0;
      obj.material.envMap = textureCube; //设置环境贴图
      obj.material.envMapIntensity = 1.0; // 默认值1, 设置为0.0,相当于没有环境贴图
    }
  });
});

export default model;
