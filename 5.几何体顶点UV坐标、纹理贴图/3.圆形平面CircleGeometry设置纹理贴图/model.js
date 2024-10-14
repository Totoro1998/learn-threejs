import * as THREE from "three";

const geometry = new THREE.CircleGeometry(60, 100); //创建一个几何体对象

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./earth.jpg");
texture.colorSpace = THREE.SRGBColorSpace; // !注意最新版本，webgl渲染器默认编码方式已经改变，为了避免色差，纹理对象编码方式要修改为THREE.SRGBColorSpace
const material = new THREE.MeshBasicMaterial({
  map: texture, //map表示材质的颜色贴图属性
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);

export default mesh;
